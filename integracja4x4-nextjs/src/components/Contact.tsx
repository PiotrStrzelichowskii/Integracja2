"use client";

import { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { trackEvent } from '@/lib/analytics';

// Typy dla walidacji
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errors: FormErrors;
}

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errors: {}
  });

  const [isVisible, setIsVisible] = useState(false);

  // Animacja fade-in przy załadowaniu
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Funkcja walidacji
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Walidacja imienia
    if (!formData.name.trim()) {
      errors.name = t('nameRequired');
    } else if (formData.name.trim().length < 2) {
      errors.name = t('nameMinLength');
    }

    // Walidacja email
    if (!formData.email.trim()) {
      errors.email = t('emailRequired');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t('emailInvalid');
      }
    }

    // Walidacja wiadomości
    if (!formData.message.trim()) {
      errors.message = t('messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('messageMinLength');
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Czyszczenie błędów przy wpisywaniu
    if (formState.errors[name as keyof FormErrors]) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: undefined
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Walidacja formularza
    if (!validateForm()) {
      toast({
        title: t('error'),
        description: t('validationError'),
        variant: "destructive"
      });
      return;
    }

    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      isError: false, 
      isSuccess: false 
    }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Sprawdź czy odpowiedź ma zawartość przed parsowaniem JSON
      const responseText = await response.text();
      let result;
      
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          throw new Error('Nieprawidłowa odpowiedź serwera');
        }
      } else {
        throw new Error('Pusta odpowiedź serwera');
      }

      if (!response.ok) {
        // Sprawdź czy to błąd konfiguracji API
        if (result.code === 'MISSING_API_KEY') {
          throw new Error('Formularz kontaktowy nie jest jeszcze skonfigurowany. Skontaktuj się z administratorem.');
        }
        throw new Error(result.error || 'Wystąpił błąd podczas wysyłania');
      }

      // Sukces
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isSuccess: true 
      }));

      // Track successful form submission
      trackEvent.contactFormSubmit();

      toast({
        title: t('messageSent'),
        description: t('messageSentDescription'),
      });

      // Reset formularza po 3 sekundach
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: false,
          errors: {}
        });
      }, 3000);

    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isError: true 
      }));

      // Track form error
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      trackEvent.contactFormError(errorMessage);

      toast({
        title: t('sendError'),
        description: error instanceof Error ? error.message : t('sendErrorDescription'),
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-20 sm:py-32 md:py-40 bg-muted/30">
      <div id="contact" className="container mx-auto px-4 scroll-mt-[100px]">
        <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
                  <h2 className="font-staatliches text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 sm:mb-6 md:mb-8">
                    <span className="text-accent">{t('contactTitle')}</span>
                  </h2>
                  
                  {/* SEO H2 - ukryty wizualnie ale widoczny dla robotów */}
                  <h2 className="sr-only">
                    Kontakt - Szkoła jazdy terenowej 4x4 w Krakowie | Event firmowy off-road | Team building 4x4
                  </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-roboto-slab leading-relaxed">
            {t('contactDescription')}
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Contact Form - First on Mobile */}
          <div className={`mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="font-staatliches text-lg sm:text-xl text-card-foreground tracking-[0.02em]">
                  {t('sendMessage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-roboto-slab font-medium text-sm">
                      {t('name')} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('name')}
                      required
                      className={`bg-input border-border font-roboto-slab text-sm transition-colors duration-200 ${
                        formState.errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'
                      }`}
                    />
                    {formState.errors.name && (
                      <p className="text-red-500 text-xs font-roboto-slab flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formState.errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-roboto-slab font-medium text-sm">
                      {t('email')} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="twoj@email.com"
                      required
                      className={`bg-input border-border font-roboto-slab text-sm transition-colors duration-200 ${
                        formState.errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'
                      }`}
                    />
                    {formState.errors.email && (
                      <p className="text-red-500 text-xs font-roboto-slab flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formState.errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-roboto-slab font-medium text-sm">
                      {t('subject')}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t('subject')}
                      className="bg-input border-border font-roboto-slab text-sm focus:border-accent transition-colors duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-roboto-slab font-medium text-sm">
                      {t('message')} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Opisz czego potrzebujesz..."
                      rows={4}
                      required
                      className={`bg-input border-border font-roboto-slab resize-none text-sm transition-colors duration-200 ${
                        formState.errors.message ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'
                      }`}
                    />
                    {formState.errors.message && (
                      <p className="text-red-500 text-xs font-roboto-slab flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formState.errors.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground font-roboto-slab">
                      {formData.message.length}/10 {t('characterCount')}
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={formState.isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-roboto-slab font-semibold text-sm py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('sending')}
                      </div>
                    ) : formState.isSuccess ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {t('sent')}
                      </div>
                    ) : (
                      t('sendButton')
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground font-roboto-slab text-center">
                    {t('requiredFields')}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information - Compact Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="font-staatliches text-sm text-card-foreground flex items-center tracking-[0.02em]">
                  <Phone className="mr-2 h-4 w-4 text-accent" />
                  {t('phone')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground font-roboto-slab text-sm">
                  +48 501 318 521
                </p>
                <p className="text-xs text-muted-foreground font-roboto-slab mt-1">
                  PS Bikes Mariusz Strzelichowski
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="font-staatliches text-sm text-card-foreground flex items-center tracking-[0.02em]">
                  <Mail className="mr-2 h-4 w-4 text-accent" />
                  {t('email')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground font-roboto-slab text-sm">
                  info@integracja4x4.pl
                </p>
                <p className="text-xs text-muted-foreground font-roboto-slab mt-1">
                  {t('responseTime')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft sm:col-span-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="font-staatliches text-sm text-card-foreground flex items-center tracking-[0.02em]">
                  <MapPin className="mr-2 h-4 w-4 text-accent" />
                  {t('address')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground font-roboto-slab text-sm">
                  ul. Powstania Styczniowego 12a
                </p>
                <p className="text-muted-foreground font-roboto-slab text-sm">
                  30-298 Kraków
                </p>
                <p className="text-xs text-muted-foreground font-roboto-slab mt-1">
                  {t('eventLocation')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft sm:col-span-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="font-staatliches text-sm text-card-foreground flex items-center tracking-[0.02em]">
                  <CreditCard className="mr-2 h-4 w-4 text-accent" />
                  {t('payments')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground font-roboto-slab font-mono text-xs break-all">
                  76 2490 0005 0000 4000 1600 9299
                </p>
                <p className="text-xs text-muted-foreground font-roboto-slab mt-1">
                  {t('bankAccount')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-16">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="font-staatliches text-xl text-card-foreground flex items-center tracking-[0.02em]">
                  <Phone className="mr-3 h-6 w-6 text-accent" />
                  {t('phone')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-roboto-slab">
                  +48 501 318 521
                </p>
                <p className="text-sm text-muted-foreground font-roboto-slab mt-1">
                  PS Bikes Mariusz Strzelichowski
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="font-staatliches text-xl text-card-foreground flex items-center tracking-[0.02em]">
                  <Mail className="mr-3 h-6 w-6 text-accent" />
                  {t('emailLabel')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-roboto-slab text-md">
                  info@integracja4x4.pl
                </p>
                <p className="text-sm text-muted-foreground font-roboto-slab mt-1">
                  {t('responseTimeDescription')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="font-staatliches text-xl text-card-foreground flex items-center tracking-[0.02em]">
                  <MapPin className="mr-3 h-6 w-6 text-accent" />
                  {t('mainOffice')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-roboto-slab">
                  ul. Powstania Styczniowego 12a
                </p>
                <p className="text-muted-foreground font-roboto-slab">
                  30-298 Kraków
                </p>
                <p className="text-sm text-muted-foreground font-roboto-slab mt-2">
                  {t('eventLocationDescription')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="font-staatliches text-xl text-card-foreground flex items-center tracking-[0.02em]">
                  <CreditCard className="mr-3 h-6 w-6 text-accent" />
                  {t('paymentsLabel')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-roboto-slab font-mono text-md">
                  76 2490 0005 0000 4000 1600 9299
                </p>
                <p className="text-sm text-muted-foreground font-roboto-slab mt-1">
                  {t('bankAccountLabel')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 flex transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <Card className="bg-card border-border shadow-soft w-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-staatliches text-2xl text-card-foreground tracking-[0.02em]">
                  {t('sendMessageTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-roboto-slab font-medium">
                          {t('nameLabel')} *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('name')}
                          required
                          className={`bg-input border-border font-roboto-slab transition-colors duration-200 ${
                            formState.errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'
                          }`}
                        />
                        {formState.errors.name && (
                          <p className="text-red-500 text-xs font-roboto-slab flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {formState.errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-roboto-slab font-medium">
                          {t('emailLabel')} *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="twoj@email.com"
                          required
                          className={`bg-input border-border font-roboto-slab transition-colors duration-200 ${
                            formState.errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'
                          }`}
                        />
                        {formState.errors.email && (
                          <p className="text-red-500 text-xs font-roboto-slab flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {formState.errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-roboto-slab font-medium">
                        {t('subjectLabel')}
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t('subject')}
                        className="bg-input border-border font-roboto-slab focus:border-accent transition-colors duration-200"
                      />
                    </div>

                    <div className="space-y-2 flex-1">
                      <Label htmlFor="message" className="font-roboto-slab font-medium">
                        {t('messageLabel')} *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('describeNeeds')}
                        rows={6}
                        required
                        className={`bg-input border-border font-roboto-slab resize-none h-full min-h-[250px] transition-colors duration-200 ${
                          formState.errors.message ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'
                        }`}
                      />
                      {formState.errors.message && (
                        <p className="text-red-500 text-xs font-roboto-slab flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {formState.errors.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground font-roboto-slab">
                        {formData.message.length}/10 {t('characterCountDescription')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <Button 
                      type="submit" 
                      disabled={formState.isSubmitting}
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-roboto-slab font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formState.isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t('sending')}
                        </div>
                      ) : formState.isSuccess ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          {t('sent')}
                        </div>
                      ) : (
                        t('sendMessage')
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground font-roboto-slab text-center">
                      {t('requiredFields')}
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

