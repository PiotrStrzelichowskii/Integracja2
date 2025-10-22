"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
      errors.name = 'Imię jest wymagane';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Imię musi mieć co najmniej 2 znaki';
    }

    // Walidacja email
    if (!formData.email.trim()) {
      errors.email = 'Email jest wymagany';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Nieprawidłowy format adresu email';
      }
    }

    // Walidacja wiadomości
    if (!formData.message.trim()) {
      errors.message = 'Wiadomość jest wymagana';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Wiadomość musi mieć co najmniej 10 znaków';
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
        title: "Błąd walidacji",
        description: "Proszę poprawić błędy w formularzu.",
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Wystąpił błąd podczas wysyłania');
      }

      // Sukces
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isSuccess: true 
      }));

      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.",
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

      toast({
        title: "Błąd wysyłania",
        description: error instanceof Error ? error.message : "Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.",
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
            <span className="text-accent">KONTAKT</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-roboto-slab leading-relaxed">
            Skontaktuj się z nami, aby umówić szkolenie lub dowiedzieć się więcej o naszej ofercie
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
                  Wyślij wiadomość
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-roboto-slab font-medium text-sm">
                      Imię *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Twoje imię"
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
                      Email *
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
                      Temat
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Temat wiadomości"
                      className="bg-input border-border font-roboto-slab text-sm focus:border-accent transition-colors duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-roboto-slab font-medium text-sm">
                      Wiadomość *
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
                      {formData.message.length}/10 znaków minimum
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
                        Wysyłanie...
                      </div>
                    ) : formState.isSuccess ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Wysłano!
                      </div>
                    ) : (
                      "Wyślij wiadomość"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground font-roboto-slab text-center">
                    * - pola wymagane. Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
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
                  Telefon
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
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground font-roboto-slab text-sm">
                  info@integracja4x4.pl
                </p>
                <p className="text-xs text-muted-foreground font-roboto-slab mt-1">
                  Odpowiadamy w ciągu 24h
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft sm:col-span-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="font-staatliches text-sm text-card-foreground flex items-center tracking-[0.02em]">
                  <MapPin className="mr-2 h-4 w-4 text-accent" />
                  Główna siedziba firmy
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
                  Miejsce eventu dopasowujemy do potrzeb klienta
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft sm:col-span-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="font-staatliches text-sm text-card-foreground flex items-center tracking-[0.02em]">
                  <CreditCard className="mr-2 h-4 w-4 text-accent" />
                  Płatności
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground font-roboto-slab font-mono text-xs break-all">
                  76 2490 0005 0000 4000 1600 9299
                </p>
                <p className="text-xs text-muted-foreground font-roboto-slab mt-1">
                  Nr konta bankowego
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
                  Telefon
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
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-roboto-slab text-md">
                  info@integracja4x4.pl
                </p>
                <p className="text-sm text-muted-foreground font-roboto-slab mt-1">
                  Odpowiadamy w ciągu 24h
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="font-staatliches text-xl text-card-foreground flex items-center tracking-[0.02em]">
                  <MapPin className="mr-3 h-6 w-6 text-accent" />
                  Główna siedziba firmy
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
                  Miejsce eventu dopasowujemy do potrzeb klienta
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="font-staatliches text-xl text-card-foreground flex items-center tracking-[0.02em]">
                  <CreditCard className="mr-3 h-6 w-6 text-accent" />
                  Płatności
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-roboto-slab font-mono text-md">
                  76 2490 0005 0000 4000 1600 9299
                </p>
                <p className="text-sm text-muted-foreground font-roboto-slab mt-1">
                  Nr konta bankowego
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
                  Wyślij wiadomość
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-roboto-slab font-medium">
                          Imię *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Twoje imię"
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
                          Email *
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
                        Temat
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Temat wiadomości"
                        className="bg-input border-border font-roboto-slab focus:border-accent transition-colors duration-200"
                      />
                    </div>

                    <div className="space-y-2 flex-1">
                      <Label htmlFor="message" className="font-roboto-slab font-medium">
                        Wiadomość *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Opisz czego potrzebujesz..."
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
                        {formData.message.length}/10 znaków minimum
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
                          Wysyłanie...
                        </div>
                      ) : formState.isSuccess ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Wysłano!
                        </div>
                      ) : (
                        "Wyślij wiadomość"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground font-roboto-slab text-center">
                      * - pola wymagane. Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
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

