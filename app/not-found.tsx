import { UI } from '@/components/index';
import Link from 'next/link';

function Page() {
  return (
    <>
      <header className="min-h-24">
        <UI.Navigation />
      </header>
      <main className="pt-32 container mx-auto max-w-3xl px-4">
        <UI.Typography
          type="h1"
          size="h3"
          weight="bold"
          className="text-center"
        >
          404 - Seite nicht gefunden.
        </UI.Typography>
        <UI.Spacer />
        <UI.Typography className="text-center">
          Die angeforderte Website wurde nicht gefunden oder existiert nicht.
          Bitte kehren Sie zur Startseite zurück.
        </UI.Typography>
        <UI.Spacer />
        <div className="flex">
          <Link
            href="/"
            className="px-8 py-4 rounded-xl text-white bg-black font-semibold mx-auto"
          >
            Zur Startseite
          </Link>
        </div>
        <UI.Spacer />
      </main>
    </>
  );
}

export default Page;
