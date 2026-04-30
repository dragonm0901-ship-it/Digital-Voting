import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-extrabold text-border">404</div>
        <h1 className="text-2xl font-bold text-text-primary">Page Not Found</h1>
        <p className="text-sm text-text-secondary">
          The page you are looking for does not exist or has been moved.
          Please return to the main portal.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-bold text-sm rounded-[3px] no-underline hover:bg-navy-dark transition-colors"
        >
          <ArrowLeft size={16} />
          Return to Portal
        </Link>
      </div>
    </div>
  );
}
