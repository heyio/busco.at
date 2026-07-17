'use client';

import { FaqType } from '@/types/FaqItem';
import Link from 'next/link';
import { LifeBuoy, ArrowRightCircle } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import Typography from '../ui/typography';

export type FaqProps = {
  items: FaqType[];
};

export function Faq({ items }: FaqProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Typography size={'h3'} weight={'bold'} className="text-center">
        FAQ
      </Typography>
      <Typography size={'h5'} className="mt-2 mb-8 text-center">
        Antworten auf die häufig gestellten Fragen unserer Kunden.
      </Typography>
      <Accordion type="single" collapsible defaultValue={`item-0`}>
        {items.map((faq: FaqType, index: number) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>
              <Typography
                type="span"
                size={'h5'}
                weight={'bold'}
                className="text-left"
              >
                {faq.question}
              </Typography>
            </AccordionTrigger>
            <AccordionContent>
              <Typography className="text-[16px]">{faq.answer}</Typography>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex gap-2 rounded-lg bg-white items-center py-4 mt-16 px-4">
        <LifeBuoy className="text-indigo-700" />
        <div className="flex justify-between items-center w-full">
          <Typography weight={'semibold'}>
            Ihre Frage nicht dabei? Unser Team hilft gerne weiter.
          </Typography>
          <div className="flex flex-row gap-4 items-center text-indigo-700">
            <Link href="/anfrage" className="font-semibold">
              Kontakt
            </Link>
            <ArrowRightCircle />
          </div>
        </div>
      </div>
    </div>
  );
}
