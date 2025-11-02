'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { event } from '@/lib/analytics';

const CookieBanner = () => {
  const { t } = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już wyraził zgodę
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('analytics-consent', 'true');
    setIsVisible(false);
    
    // Track consent given
    event({
      action: 'cookie_consent',
      category: 'Privacy',
      label: 'Accept All'
    });
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('analytics-consent', 'false');
    setIsVisible(false);
    
    // Track consent rejected
    event({
      action: 'cookie_consent',
      category: 'Privacy',
      label: 'Reject All'
    });
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('analytics-consent', analyticsConsent.toString());
    setIsVisible(false);
    setShowSettings(false);
    
    // Track custom preferences
    event({
      action: 'cookie_consent',
      category: 'Privacy',
      label: `Custom - Analytics: ${analyticsConsent ? 'Yes' : 'No'}`
    });
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000] p-4 bg-black/50 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto border-accent/20 bg-mud-dark/95 backdrop-blur-sm">
        <CardContent className="p-6">
          {!showSettings ? (
            // Main banner
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Cookie className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-staatliches text-lg text-foreground mb-2">
                        {t('cookieTitle')}
                      </h3>
                      <p className="text-muted-foreground font-montserrat text-sm leading-relaxed">
                        {t('cookieDescription')}
                      </p>
                    </div>
                    <Button
                      onClick={handleClose}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground p-1 h-auto flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-accent hover:bg-accent/90 text-white font-montserrat w-full"
                  size="sm"
                >
                  {t('acceptAll')}
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="border-accent/30 text-foreground hover:bg-accent/10 font-montserrat flex-1"
                    size="sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t('settings')}
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground font-montserrat flex-1"
                    size="sm"
                  >
                    {t('rejectAll')}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Settings panel
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-staatliches text-lg text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Ustawienia cookies
                </h3>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-accent/10">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-accent" />
                    <div>
                      <h4 className="font-montserrat font-medium text-foreground">
                        Cookies analityczne
                      </h4>
                      <p className="text-sm text-muted-foreground font-montserrat">
                        Google Analytics - pomagają nam zrozumieć, jak użytkownicy korzystają ze strony
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  onClick={handleSavePreferences}
                  className="bg-accent hover:bg-accent/90 text-white font-montserrat w-full"
                  size="sm"
                >
                  Zapisz preferencje
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAcceptAll}
                    variant="outline"
                    className="border-accent/30 text-foreground hover:bg-accent/10 font-montserrat flex-1"
                    size="sm"
                  >
                    {t('acceptAll')}
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground font-montserrat flex-1"
                    size="sm"
                  >
                    {t('rejectAll')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;
