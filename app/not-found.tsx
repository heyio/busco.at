import { Navigation } from '@/components/organisms/navigation';
import Spacer from '@/components/ui/spacer';
import Typography from '@/components/ui/typography';
import Link from 'next/link';

function Page() {
  return (
    <>
      <header className="min-h-24">
        <Navigation />
      </header>
      <main className="pt-32 container mx-auto max-w-3xl px-4">
        <Typography
          type="h1"
          size="h3"
          weight="bold"
          className="text-center"
        >
          404 - Seite nicht gefunden.
        </Typography>
        <Spacer />
        <Typography className="text-center">
          Die angeforderte Website wurde nicht gefunden oder existiert nicht.
          Bitte kehren Sie zur Startseite zurück.
        </Typography>
        <Spacer />
        <div className="flex">
          <Link
            href="/"
            className="px-8 py-4 rounded-xl text-white bg-black font-semibold mx-auto"
          >
            Zur Startseite
          </Link>
        </div>
        <Spacer />
      </main>
    </>
  );
}

export default Page;
