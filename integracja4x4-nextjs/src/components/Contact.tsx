"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, CreditCard } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Błąd",
        description: "Proszę wypełnić wszystkie wymagane pola.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Błąd",
        description: "Proszę podać prawidłowy adres email.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Wiadomość wysłana!",
        description: "Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Błąd wysyłania",
        description: "Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.",
        variant: "destructive"
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-40 bg-muted/30">
      <div id="contact" className="container mx-auto px-4 scroll-mt-[100px]">
        <div className="text-center mb-20">
          <h2 className="font-staatliches text-3xl md:text-5xl text-foreground mb-8">
            <span className="text-accent">KONTAKT</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-roboto-slab leading-relaxed">
            Skontaktuj się z nami, aby umówić szkolenie lub dowiedzieć się więcej o naszej ofercie
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-card border-border shadow-soft">
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

            <Card className="bg-card border-border shadow-soft">
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

            <Card className="bg-card border-border shadow-soft">
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

            <Card className="bg-card border-border shadow-soft">
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
          <div className="lg:col-span-2 flex">
            <Card className="bg-card border-border shadow-soft w-full flex flex-col">
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
                          Imię i nazwisko *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Twoje imię i nazwisko"
                          required
                          className="bg-input border-border font-roboto-slab"
                        />
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
                          className="bg-input border-border font-roboto-slab"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-roboto-slab font-medium">
                          Telefon
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+48 123 456 789"
                          className="bg-input border-border font-roboto-slab"
                        />
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
                          className="bg-input border-border font-roboto-slab"
                        />
                      </div>
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
                        className="bg-input border-border font-roboto-slab resize-none h-full min-h-[250px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-roboto-slab font-semibold"
                    >
                      {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
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

