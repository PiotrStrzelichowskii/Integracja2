import { Card, CardContent } from '@/components/ui/card';
import { Award, Shield, Users, MapPin } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: "30+ Lat Doświadczenia",
      description: "Ponad trzy dekady w organizacji wypraw i szkoleń terenowych"
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo",
      description: "Najwyższe standardy bezpieczeństwa i profesjonalne wyposażenie"
    },
    {
      icon: Users,
      title: "Doświadczeni Instruktorzy",
      description: "Zespół wykwalifikowanych instruktorów z certyfikatami"
    },
    {
      icon: MapPin,
      title: "Różnorodne Tereny",
      description: "Dostęp do najlepszych tras offroad w całej Polsce"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-staatliches text-3xl md:text-5xl text-foreground mb-6">
              O <span className="text-accent">INTEGRACJA4X4</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-roboto-slab leading-relaxed">
              <p className="text-lg">
                Jesteśmy pionierami w organizacji profesjonalnych szkoleń offroad w Polsce. 
                Od ponad 30 lat pomagamy ludziom odkrywać fascynujący świat jazdy terenowej.
              </p>
              
              <p>
                Nasza pasja do motoryzacji i przyrody zaowocowała stworzeniem unikalnych 
                programów szkoleniowych, które łączą naukę z niezapomnianą przygodą. 
                Każdy kurs prowadzony jest przez doświadczonych instruktorów w bezpiecznym 
                i kontrolowanym środowisku.
              </p>
              
              <p>
                Specjalizujemy się w szkoleniach indywidualnych oraz eventach firmowych, 
                oferując kompleksową obsługę od podstaw jazdy terenowej po zaawansowane 
                techniki pokonywania najtrudniejszych przeszkód.
              </p>
            </div>

            <div className="mt-8 p-6 bg-accent/10 rounded-lg border border-accent/20">
              <h3 className="font-staatliches text-xl text-accent mb-3">Nasze Motto</h3>
              <p className="text-muted-foreground font-roboto-slab italic">
                "Bezpieczeństwo, profesjonalizm i niezapomniane doświadczenia - 
                to podstawy naszej pracy z każdym klientem."
              </p>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-card border-border shadow-soft hover:shadow-strong transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-staatliches text-lg text-card-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-roboto-slab leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">500+</div>
            <div className="text-muted-foreground font-roboto-slab">Ukończonych kursów</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">50+</div>
            <div className="text-muted-foreground font-roboto-slab">Eventów firmowych</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">30+</div>
            <div className="text-muted-foreground font-roboto-slab">Lat doświadczenia</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">100%</div>
            <div className="text-muted-foreground font-roboto-slab">Zadowolenia</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

