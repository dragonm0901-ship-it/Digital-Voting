import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const BallotBoxIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="8" width="18" height="14" rx="1" />
    <path d="M3 12h18" />
    <path d="M9 8V6a3 3 0 1 1 6 0v2" />
    <rect x="9" y="12" width="6" height="2" />
    <line x1="12" y1="16" x2="12" y2="19" />
  </svg>
);

export const OfficialStampIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="6" />
    <path d="M12 6v1" />
    <path d="M12 17v1" />
    <path d="M6 12h1" />
    <path d="M17 12h1" />
    <path d="M12 9l1.5 2.5H14l-2 3-2-3h.5L12 9z" />
  </svg>
);

export const CitizenshipCardIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <rect x="4" y="7" width="6" height="7" rx="1" />
    <circle cx="7" cy="9.5" r="1.5" />
    <path d="M5 13c0-1 .9-2 2-2s2 1 2 2" />
    <line x1="13" y1="8" x2="19" y2="8" />
    <line x1="13" y1="11" x2="19" y2="11" />
    <line x1="13" y1="14" x2="17" y2="14" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const FingerprintIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M2 12a10 10 0 0 1 18-6" />
    <path d="M2 16h.01" />
    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
    <path d="M8.65 22c.21-.66.45-1.32.57-2" />
    <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
  </svg>
);

export const EncryptedLockIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    <circle cx="12" cy="16" r="1.5" />
    <line x1="12" y1="17.5" x2="12" y2="19" />
  </svg>
);

export const NepalMapIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 14l3-4 2 1 3-3 2 2 3-1 4-3 3 2v6l-2 3-3 1-4-1-3 2-3-1-2 1-3-2z" />
    <circle cx="12" cy="12" r="1" fill={color} />
  </svg>
);

export const ShieldVerifiedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const NepalEmblemIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg height={size} viewBox="0 0 85 100" className={className}>
    {/* Blue border */}
    <path d="M0 0 L0 100 L5 100 L5 83 L80 83 L30 50 L75 50 L0 0" fill="#003893"/>
    {/* Crimson background */}
    <path d="M5 11 L5 78 L64 78 L26 50 L56 50 L5 11" fill="#DC143C"/>
    {/* Moon */}
    <path d="M28 29 C34 29 39 33 40 38 C38 35 34 33 30 33 C26 33 22 35 20 38 C21 33 26 29 28 29 Z" fill="#FFFFFF"/>
    <path d="M30 38 L32 35 L33 38 L36 37 L34 39 L37 41 L34 41 L35 44 L32 42 L29 44 L30 41 L27 41 L30 39 L28 37 L30 38 Z" fill="#FFFFFF"/>
    {/* Sun */}
    <circle cx="30" cy="62" r="5" fill="#FFFFFF"/>
    <path d="M30 54 L31 58 L36 56 L33 59 L38 60 L34 62 L38 64 L34 64 L36 67 L32 66 L30 70 L28 66 L24 67 L26 64 L22 64 L26 62 L22 60 L27 59 L24 56 L29 58 L30 54 Z" fill="#FFFFFF"/>
  </svg>
);
import {
  Bell,
  Trees,
  Sun,
  Star,
  Shovel,
  Anchor,
  Droplets,
  Umbrella,
  Bike,
  Smartphone,
  Bird,
  Cylinder,
  GlassWater,
  Lightbulb,
  Scale,
  Milestone,
  Flower2,
  User,
  Radio,
  Shield,
} from 'lucide-react';

export const SwostikIcon: React.FC<IconProps> = ({ size = 24, color = '#DC143C', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 4v16" />
    <path d="M4 12h16" />
    <path d="M12 4h8" />
    <path d="M12 20h-8" />
    <path d="M4 12V4" />
    <path d="M20 12v8" />
    <circle cx="8" cy="8" r="1" fill={color} stroke="none" />
    <circle cx="16" cy="8" r="1" fill={color} stroke="none" />
    <circle cx="8" cy="16" r="1" fill={color} stroke="none" />
    <circle cx="16" cy="16" r="1" fill={color} stroke="none" />
  </svg>
);

export const ElectionSymbol: React.FC<{ symbol: string; size?: number; color?: string; className?: string }> = ({ symbol, size = 24, color = 'currentColor', className }) => {
  const props = { size, color, className };
  switch (symbol) {
    case 'bell': return <Bell {...props} />;
    case 'tree': return <Trees {...props} />;
    case 'sun': return <Sun {...props} />;
    case 'star': return <Star {...props} />;
    case 'soil': return <Shovel {...props} />;
    case 'plow': return <Anchor {...props} />;
    case 'tap': return <Droplets {...props} />;
    case 'umbrella': return <Umbrella {...props} />;
    case 'bicycle': return <Bike {...props} />;
    case 'mobile': return <Smartphone {...props} />;
    case 'rooster': return <Bird {...props} />;
    case 'madal': return <Cylinder {...props} />;
    case 'glass': return <GlassWater {...props} />;
    case 'bulb': return <Lightbulb {...props} />;
    case 'scale': return <Scale {...props} />;
    case 'stick': return <Milestone {...props} />;
    case 'rose': return <Flower2 {...props} />;
    case 'man': return <User {...props} />;
    case 'radio': return <Radio {...props} />;
    default: return <Shield {...props} />;
  }
};
