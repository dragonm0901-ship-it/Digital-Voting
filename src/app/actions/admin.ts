"use server";

import { db } from '@/lib/db';
import { ApiResponse } from '@/types';
import { signAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function loginAdminAction(username: string, passwordPlain: string): Promise<ApiResponse<{ redirectUrl: string }>> {
  try {
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const admin = await db.adminUser.findUnique({
      where: { username }
    });

    if (!admin || !admin.isActive) {
      return { success: false, error: 'invalidCredentials', message: 'Invalid username or password' };
    }

    const isValid = await bcrypt.compare(passwordPlain, admin.passwordHash);
    
    if (!isValid) {
      // Optional: Incremental backoff / audit logging for failed tries could be added here
      return { success: false, error: 'invalidCredentials', message: 'Invalid username or password' };
    }

    // Success - Sign JWT
    const token = await signAdminToken({
      id: admin.id,
      username: admin.username,
      role: admin.role,
      province: admin.province,
    });

    // Set HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    // Update last login
    await db.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'ADMIN_LOGIN',
        category: 'admin',
        actorType: 'admin',
        actorId: admin.id,
      }
    });

    return { 
      success: true, 
      data: { redirectUrl: '/admin/dashboard' } 
    };

  } catch (error) {
    console.error('Admin Login Error:', error);
    return { success: false, error: 'system_error', message: 'An internal error occurred.' };
  }
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}
