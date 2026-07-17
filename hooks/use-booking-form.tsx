'use client';

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect, useState } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';
import { format } from 'date-fns';
import { PriceItemType } from '@/types/PriceItem';
import { RouteType } from '@/types/RouteType';
import { BookingFormValues } from '@/lib/booking-form-schema';
import steps from '@/lib/booking-form-steps';

export const bookingFormAtom = atomWithStorage<FieldValues>('form', {});

export type PriceInfoType = {
  prices: { attributes: PriceItemType }[];
  routeInfo: RouteType;
};
type FieldName = keyof BookingFormValues;

const getDestinationName = (destination?: RouteType['from']) => {
  return (
    destination?.data?.attributes?.name ||
    destination?.attributes?.name ||
    destination?.name ||
    ''
  );
};

const getPriceAttributes = (
  price: { attributes?: PriceItemType } | PriceItemType,
) => {
  return (
    (price as { attributes?: PriceItemType })?.attributes ??
    (price as PriceItemType)
  );
};

const useBookingForm = (form: FieldValues) => {
  const [bookingForm, setBokingForm] = useAtom(bookingFormAtom);
  const [price, setPrice] = useState<number>(0);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { control } = form;

  const watchedValues = useWatch({
    control,
  });

  useEffect(() => {
    setBokingForm(watchedValues);
  }, [watchedValues]);

  const handleDate = (payload: { date: Date; field: string }) => {
    const formattedDate = format(payload.date, 'dd.MM.yyyy');
    form.setValue(payload.field, formattedDate);
    form.trigger(payload.field);
  };

  const handleTime = (payload: { time: string; field: string }) => {
    form.setValue(payload.field, payload.time);
    form.trigger(payload.field);
  };

  const handlePrice = (priceInfo: PriceInfoType) => {
    const routeFrom = getDestinationName(priceInfo.routeInfo?.from);
    const routeTo = getDestinationName(priceInfo.routeInfo?.to);

    setFrom(routeFrom);
    setTo(routeTo);

    const selectedVehicle = form.getValues('vehicle');
    const vehiclePrice = priceInfo.prices.find(
      (price: { attributes: PriceItemType }) =>
        selectedVehicle === getPriceAttributes(price)?.vehicle,
    );
    const total =
      getPriceAttributes(vehiclePrice ?? { attributes: undefined })
        ?.pricePerKm || 0;

    const formFrom = form.getValues('from')?.toLowerCase();
    const formTo = form.getValues('to')?.toLowerCase();
    const routeFromLower = routeFrom?.toLowerCase();
    const routeToLower = routeTo?.toLowerCase();

    if (formFrom === routeFromLower && formTo === routeToLower) {
      setPrice(
        Math.round(
          total * priceInfo?.routeInfo?.distanceInKm +
            (priceInfo?.routeInfo?.additionalCosts || 0),
        ),
      );
    } else {
      setPrice(0);
    }
  };

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  return {
    bookingForm,
    handleDate,
    handleTime,
    handlePrice,
    nextStep,
    price,
    from,
    to,
    currentStep,
  };
};

export default useBookingForm;
