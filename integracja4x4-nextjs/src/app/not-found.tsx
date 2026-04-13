'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';

export default function NotFound() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-mud-dark flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-staatliches text-rust-orange">404</h1>
          <h2 className="text-2xl font-staatliches text-sand-light">
            {t('notFoundTitle')}
          </h2>
          <p className="text-muted-foreground max-w-md">
            {t('notFoundDescription')}
          </p>
        </div>
        
        <div className="space-x-4">
          <Button asChild className="btn-offroad-primary">
            <Link href="/">
              {t('notFoundBackHome')}
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="btn-offroad-outline">
            <Link href="/#kontakt">
              {t('notFoundContact')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
