import { Film } from "lucide-react";
import { Link } from '@/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Film className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-primary">MQM CRYPTO</span>
    </Link>
  );
}
