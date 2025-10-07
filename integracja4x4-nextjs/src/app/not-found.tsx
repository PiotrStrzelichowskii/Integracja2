import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-mud-dark flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-staatliches text-rust-orange">404</h1>
          <h2 className="text-2xl font-staatliches text-sand-light">
            Strona nie została znaleziona
          </h2>
          <p className="text-muted-foreground max-w-md">
            Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.
          </p>
        </div>
        
        <div className="space-x-4">
          <Button asChild className="btn-offroad-primary">
            <Link href="/">
              Wróć do strony głównej
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="btn-offroad-outline">
            <Link href="/contact">
              Skontaktuj się z nami
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
