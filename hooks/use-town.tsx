import { useState } from 'react';
import { TownModel } from '@/types/Town';

export type DirectionProps = 'to-airport' | 'from-airport';

const useTown = () => {
  const [towns, setTowns] = useState<TownModel[]>();

  const getTowns = async (): Promise<TownModel[]> => {
    const dbData = await fetch(
      `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL}/api/towns?pagination[pageSize]=1000&sort=name`,
    )
      .then((response) => response.json())
      .then((data) => {
        const towns = (data?.data ?? [])
          .map((town: any) => {
            const townData = town.attributes ?? town;

            return { id: town.id, name: townData.name };
          })
          .filter((town: TownModel) => town.name);

        setTowns(towns);
        return towns;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });

    return dbData;
  };

  return {
    towns,
    getTowns,
  };
};

export default useTown;
