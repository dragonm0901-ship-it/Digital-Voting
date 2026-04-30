"use server";

import { db } from '@/lib/db';
import { ApiResponse, VoterVerificationResponse, OtpVerificationResponse } from '@/types';
import { sha256Sync, secureRandomHex } from '@/lib/crypto/sha256';

/**
 * Validates a voter by their National Voter ID, checks eligibility,
 * and generates an OTP session for them.
 */
export async function verifyVoterIdAction(voterId: string): Promise<ApiResponse<VoterVerificationResponse>> {
  try {
    // 1. Force artificial delay to prevent rapid timing attacks (and simulate network)
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

    // 2. Query voter from DB
    const voter = await db.voter.findUnique({
      where: { voterId },
    });

    if (!voter) {
      return { success: false, error: 'voterNotFound' };
    }

    if (!voter.isActive) {
      return { success: false, error: 'blocked' };
    }

    if (voter.hasVoted) {
      return { success: false, error: 'already_voted' };
    }

    // 3. Mask phone number for response (e.g. 9841234567 -> +977-98XXXXX567)
    const phone = voter.registeredPhone;
    const maskedPhone = `+977-${phone.substring(0, 2)}XXXXX${phone.substring(phone.length - 3)}`;

    // 4. Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = sha256Sync(otp); // Hash OTP immediately, never store raw

    // 5. In a real system, send SMS using an API provider here.
    // console.log(`[SMS MOCK] Sending OTP ${otp} to ${phone}`);

    // Create session (valid for 5 mins)
    await db.otpSession.create({
      data: {
        voterId: voter.id,
        otpHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
        maxAttempts: 5,
        attempts: 0,
      },
    });

    return {
      success: true,
      data: {
        voter: {
          id: voter.voterId,
          fullNameEn: voter.fullName,
          fullNameNe: voter.fullName,
          district: voter.district,
          province: `Province ${voter.province}`,
          registeredPhone: maskedPhone,
          status: 'verified',
        },
        otpSent: true,
        maskedPhone,
      },
    };
  } catch (error) {
    console.error('Verify Voter Error:', error);
    return { success: false, error: 'system_error' };
  }
}

/**
 * Validates the OTP for a given voter ID
 */
export async function verifyOtpAction(voterId: string, otpCode: string): Promise<ApiResponse<OtpVerificationResponse>> {
  try {
    // 1. Force artificial delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

    // 2. Fetch voter
    const voter = await db.voter.findUnique({
      where: { voterId },
      include: {
        otpSessions: {
          where: {
            isUsed: false,
            expiresAt: { gt: new Date() }, // Not expired
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!voter || voter.otpSessions.length === 0) {
      return { success: false, error: 'invalidOtp' }; // Don't leak "session expired" to avoid harvesting
    }

    const session = voter.otpSessions[0];

    // Check attempts
    if (session.attempts >= session.maxAttempts) {
      return { success: false, error: 'blocked' }; // Too many attempts
    }

    // Hash user input and compare
    const inputHash = sha256Sync(otpCode);

    if (inputHash !== session.otpHash) {
      // Increment attempt counter
      await db.otpSession.update({
        where: { id: session.id },
        data: { attempts: { increment: 1 } },
      });
      return { success: false, error: 'invalidOtp' };
    }

    // Success! Mark session as used and generate an auth token
    await db.otpSession.update({
      where: { id: session.id },
      data: { isUsed: true },
    });

    // In a real system, you'd set an HTTP-only secure cookie here.
    // For this prototype, we return a mock session token string.
    const sessionToken = `session_${voterId}_${secureRandomHex(16)}`;

    // Optional: Log success
    await db.auditLog.create({
      data: {
        action: 'VOTER_VERIFIED',
        category: 'auth',
        actorType: 'voter',
        actorId: voter.voterId,
      }
    });

    return {
      success: true,
      data: {
        verified: true,
        sessionToken,
      },
    };
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return { success: false, error: 'system_error' };
  }
}
