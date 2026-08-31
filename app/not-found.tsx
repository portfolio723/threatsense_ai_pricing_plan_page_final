import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Page Not Found</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange-dark">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
