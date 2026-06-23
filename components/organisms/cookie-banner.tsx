'use client';
import { useAtom } from 'jotai';
import { consentAtom } from '@/hooks/use-cookie-consent';
import CookieConsent from '../molecules/cookie-consent';
import { useEffect, useState } from 'react';

const CookieBanner = () => {
  const [consent] = useAtom(consentAtom);
  const [isSettingsOpen, setIseSettingsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIseSettingsOpen(consent.isSettigsOpen);
  }, [consent]);

  return <div>{isSettingsOpen && <CookieConsent />}</div>;
};

export default CookieBanner;
