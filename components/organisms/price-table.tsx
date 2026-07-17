import { PriceItemType } from '@/types/PriceItem';
import { LifeBuoy } from 'lucide-react';
import Typography from '@/components/ui/typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Spacer from '@/components/ui/spacer';

export type PriceTableContent = {
  subline: string;
  headline: string;
  content: string;
};

export type PriceTableProps = {
  content: PriceTableContent;
  prices: { attributes: PriceItemType }[];
};

export function PriceTable({ content, prices }: PriceTableProps) {
  return (
    <div>
      {!!content && (
        <div>
          <div className="flex flex-col gap-4 md:max-w-[40%] mx-auto text-center">
            <Typography size={'h4'} weight={'bold'} className="text-secondary">
              {content.subline}
            </Typography>
            <Typography size={'h3'} weight={'bold'}>
              {content.headline}
            </Typography>
          </div>
          <Typography
            size={'h4'}
            textColor={'gray'}
            className="mt-6 md:max-w-[60%] mx-auto text-center"
          >
            {content.content}
          </Typography>
        </div>
      )}

      <Typography size={'h4'} weight={'bold'} className="my-6">
        Preis pro Stunde*
      </Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fahrzeug</TableHead>
            <TableHead>Personen</TableHead>
            <TableHead className="text-right">Preis pro Stunde</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price.attributes.vehicle}>
              <TableCell className="font-medium">
                {price.attributes.vehicle}
              </TableCell>
              <TableCell>Max. {price.attributes.travelers} Personen</TableCell>
              <TableCell className="text-right">
                EUR {price.attributes.pricePerHour.toString().replace('.', ',')}
                ,-
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-2 rounded-lg bg-gray-100 items-center py-4 mt-16 px-4">
        <LifeBuoy className="text-indigo-700" />
        <div className="flex justify-between items-center w-full">
          <Typography size={'sm'}>
            *Der Stundenpreis kommt zum Einsatz, wenn die Dauer der Nutzung
            entscheidend ist, beispielsweise bei Stadtrundfahrten mit wenig
            Kilometern, aber mehreren Wartezeiten an jeweiligen Stops. Alle
            Preisangaben netto, ohne Mehrwertsteuer.
          </Typography>
        </div>
      </div>
      <Spacer />
      <Typography size={'h4'} weight={'bold'} className="my-6">
        Preis pro Kilometer*
      </Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fahrzeug</TableHead>
            <TableHead>Personen</TableHead>
            <TableHead className="text-right">Preis pro km</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price.attributes.vehicle}>
              <TableCell className="font-medium">
                {price.attributes.vehicle}
              </TableCell>
              <TableCell>Max. {price.attributes.travelers} Personen</TableCell>
              <TableCell className="text-right">
                EUR {price.attributes.pricePerKm.toString().replace('.', ',')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-2 rounded-lg bg-gray-100 items-center py-4 mt-16 px-4">
        <LifeBuoy className="text-indigo-700" />
        <div className="flex justify-between items-center w-full">
          <Typography size={'sm'}>
            *Der Kilometerpreis wird angewendet, wenn die Fahrtstrecke mehr als
            100 km in eine Richtung ist und es sich nicht um eine Rundfahrt mit
            langen Wartezeiten handelt. Alle Preisangaben netto, ohne
            Mehrwertsteuer.
          </Typography>
        </div>
      </div>
    </div>
  );
}
