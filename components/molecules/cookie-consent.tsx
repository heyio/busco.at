'use client';
import useCookieConsent from '@/hooks/use-cookie-consent';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Typography from '@/components/ui/typography';
import Link from 'next/link';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const {
    //handleAnalyticsCookies,
    //handleAceptAll,
    handleCloseSettings,
    //consent,
  } = useCookieConsent();

  return (
    <div className="fixed z-50 w-full p-8 bottom-0 left-0">
      <div className="container mx-auto px-4 border border-foreground bg-white py-8 relative rounded-xl">
        <Button
          onClick={handleCloseSettings}
          type="button"
          size="icon"
          variant={'link'}
          className="absolute right-4 top-4"
        >
          <X />
        </Button>

        <Typography weight={'bold'} className="tracking-normal" size={'h4'}>
          Datenschutz Einstellungen
        </Typography>
        <Typography className="mt-2 tracking-normal">
          Wir verwenden Cookies um die Webseite Ihren Bedürfnissen anzupassen
          und aus Statistikzwecken. Der Gebrauch von Cookies erlaubt es uns,
          Ihnen die optimale Nutzung dieser Website anzubieten.
        </Typography>
        <div className="flex flex-col gap-8 mt-8">
          <div>
            <Typography weight={'bold'} className="tracking-normal">
              Notwendig
            </Typography>
            <Typography className="tracking-normal">
              Diese Cookies sind für die grundlegenden Funktionen der Website
              dringend erforderlich.
            </Typography>
            <Switch checked={true} disabled className="mt-4" />
          </div>
          {/*<div>
            <Typography weight={'bold'} className="tracking-normal">
              Analyse
            </Typography>
            <Typography className="tracking-normal">
              Wir verwenden Funktionen des Webanalysedienstes Hotjar.
            </Typography>
            <Switch
              checked={consent.isAnalyticsEnabled}
              onClick={handleAnalyticsCookies}
              className="mt-4"
            />
          </div>*/}
          <div>
            <Typography className="tracking-normal">
              Mehr Informationen zum Datenschutz finden Sie{' '}
              <Link href="/agb" className="underline" target="blank">
                hier
              </Link>
              .
            </Typography>
          </div>
          <div className="flex gap-8">
            {/*<Button onClick={handleAceptAll}>Alle aktivieren</Button>*/}
            <Button onClick={handleCloseSettings}>Schließen</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
