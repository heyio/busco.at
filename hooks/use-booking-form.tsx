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
    setFrom(priceInfo.routeInfo?.from.data.attributes.name);
    setTo(priceInfo.routeInfo?.to.data.attributes.name);

    const selectedVehicle = form.getValues('vehicle');
    const vehiclePrice = priceInfo.prices.find(
      (price: { attributes: PriceItemType }) =>
        selectedVehicle === price.attributes.vehicle
    );
    const total = vehiclePrice?.attributes?.pricePerKm || 0;
    if (
      form.getValues('from')?.toLowerCase() === from?.toLowerCase() &&
      form.getValues('to')?.toLowerCase() === to?.toLowerCase()
    ) {
      setPrice(
        Math.round(
          total * priceInfo?.routeInfo?.distanceInKm +
            priceInfo?.routeInfo?.additionalCosts
        )
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
