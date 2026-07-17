import { Navigation } from '@/components/organisms/navigation';
import Typography from '@/components/ui/typography';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Service',
    description:
      'Erfahren Sie mehr über die unkomplizierten und transparenten Services von Busco. Jetzt mehr erfahren.',
  };
}

export default async function Page() {
  return (
    <>
      <header className="min-h-24">
        <Navigation />
        <div className="relative py-8 px-4 lg:min-h-64 lg:max-h-[800px] pt-24">
          <Image
            src="/images/busco-hero.jpg"
            alt="Bus finden mit Busco"
            fill
            className="absolute top-0 left-0 z-0 object-cover object-bottom object-left"
          />
          <div className="lg:grid lg:grid-cols-2 justify-between text-white relative z-20 container mx-auto h-full md:pt-16 md:mb-32">
            <div className="flex flex-col gap-12 lg:gap-24">
              <div>
                <Typography textColor="white" size="h4">
                  Services von Busco
                </Typography>
                <Typography
                  type="h1"
                  textColor="white"
                  size="h2"
                  weight={'semibold'}
                >
                  Services von Busco
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-16">
        <Typography size={'h4'}>
          Busco ist eine Plattform, die sich auf die Vermittlung von Busfahrten
          zwischen Kunden und Busunternehmen spezialisiert hat. Wir arbeiten
          ausschließlich mit erfahrenen lokalen Unternehmern aus Wien zusammen,
          die seit Jahren in dieser Branche tätig sind.
        </Typography>
        <Typography size={'h4'} className="pt-8">
          Unser Ziel ist es, den oft unübersichtlichen Prozess der Busbuchung zu
          vereinfachen. Mit transparenten Fixpreisen, die unabhängig von der
          Jahreszeit oder aktueller Nachfrage sind, bieten wir Ihnen eine klare
          und verlässliche Kalkulation. Sie geben einfach Ihre Reisedetails ein
          – wie Personenanzahl, Datum, Uhrzeit und Strecke – und erhalten
          innerhalb von maximal 24 Stunden ein übersichtliches, individuell
          gestaltetes Angebot - schnell, einfach und unkompliziert.
        </Typography>

        <div className="pt-12">
          <Typography size={'h3'}>
            <Link href="/service/bus-mieten-wien">
              Allgemeine Busvermittlung
            </Link>
          </Typography>
          <Typography size={'h5'} className="pt-4">
            Wir bieten Ihnen eine unkomplizierte Busvermittlung für jede Art von
            Reise. Unsere Plattform ermöglicht Ihnen, in wenigen Schritten den
            passenden Bus inklusive professionellen Chauffeuren für Ihre
            Anforderungen zu finden. Egal, ob Kurzstrecke oder Langstrecke, bei
            uns ist alles klar und vorab kalkuliert.
          </Typography>
        </div>
        <div className="pt-12">
          <Typography size={'h3'}>
            <Link href="/service/bus-mieten-schulklasse">
              Angebote für Schulen und Kindergärten
            </Link>
          </Typography>
          <Typography size={'h5'} className="pt-4">
            Sicherheit und Zuverlässigkeit stehen bei uns an erster Stelle, wenn
            es um Schul- und Kindergartenausflüge geht. Unsere erfahrenen Fahrer
            sorgen dafür, dass Ihre Gruppe sicher und komfortabel an ihr Ziel
            kommt – natürlich zu einem festen, kalkulierbaren Preis.
          </Typography>
        </div>
        <div className="pt-12">
          <Typography size={'h3'}>
            <Link href="/service/shuttle-bus-mieten-wien">
              Bus Shuttle-Service
            </Link>
          </Typography>
          <Typography size={'h5'} className="pt-4">
            Unser Shuttle Service bietet Ihnen eine flexible und komfortable
            Lösung für die Personenbeförderung. Egal, ob für Flughafentransfers
            oder Veranstaltungen, wir stellen Ihnen den passenden Bus inklusive
            professionellem Fahrer zur Verfügung.
          </Typography>
        </div>
        <div className="pt-12">
          <Typography size={'h3'}>
            <Link href="/service/bus-mieten-betriebsfahrten-wien">
              Betriebsfahrten
            </Link>
          </Typography>
          <Typography size={'h5'} className="pt-4">
            Für betriebliche Fahrten, sei es für Firmenveranstaltungen,
            Team-Events oder Betriebsausflüge, bieten wir Ihnen maßgeschneiderte
            Transportlösungen. Unsere modernen Busse und erfahrenen Fahrer
            sorgen für einen reibungslosen Ablauf.
          </Typography>
        </div>
        <div className="pt-12">
          <Typography size={'h3'}>
            <Link href="/service/bus-mieten-hochzeit-wien">
              Shuttle für Hochzeitsgäste
            </Link>
          </Typography>
          <Typography size={'h5'} className="pt-4">
            Machen Sie den schönsten Tag Ihres Lebens für Ihre Gäste noch
            angenehmer. Mit unserem Hochzeits-Shuttle-Service stellen wir
            sicher, dass Ihre Gäste sicher und bequem zur Location und zurück
            gelangen.
          </Typography>
        </div>
      </main>
    </>
  );
}
