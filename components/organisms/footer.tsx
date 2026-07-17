import Link from 'next/link';
import Logo from '../ui/logo';
import Typography from '../ui/typography';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import CookieBanner from './cookie-banner';
import CtaCookies from '../molecules/cta-cookies';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 px-4">
      <CookieBanner />
      <div className="grid md:grid-cols-2 gap-8 container mx-auto bg-white rounded-xl p-4 md:p-8">
        <div>
          <div className="h-[32px]">
            <Logo />
          </div>
          <ul className="flex flex-col gap-2 text-lg mt-4">
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/anfrage"
              >
                Kontakt
              </Link>
            </li>
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/impressum"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/datenschutz"
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/agb"
              >
                AGB
              </Link>
            </li>
            <li>
              <CtaCookies />
            </li>
          </ul>
        </div>
        <div>
          <Typography size={'h4'} weight={'bold'}>
            Wien
          </Typography>
          <ul className="flex flex-col gap-2 text-lg mt-4">
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/service/bus-mieten-wien"
              >
                Bus mieten in Wien
              </Link>
            </li>
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/service/bus-mieten-schulklasse"
              >
                Bus mieten Schulklasse
              </Link>
            </li>
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/service/bus-mieten-betriebsfahrten-wien"
              >
                Bus für Betriebsfahrten mieten in Wien
              </Link>
            </li>
            <li>
              <Link
                className="hover:md:underline hover:md:text-gray-500"
                href="/service/shuttle-bus-mieten-wien"
              >
                Shuttle Bus mieten in Wien
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 mt-8">
        <div className="order-2 md:order-1">
          © 2024 Busco - alle Rechte vorbehalten
        </div>
        <div className="flex gap-4 order-1 md:order-2">
          <Link
            href="https://www.linkedin.com/company/busco-vienna/about/"
            target="blank"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link href="https://www.instagram.com/busco_vienna/" target="blank">
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/people/Busco-Vienna/61565109265240/"
            target="blank"
          >
            <FaFacebook size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
