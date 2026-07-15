'use client';
import Image from 'next/image';
import Busco from '@/public/logo.svg';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="relative w-[100px] h-full">
      <Image src={Busco} alt="Logo" className="w-full h-full" priority />
    </Link>
  );
};

export default Logo;
