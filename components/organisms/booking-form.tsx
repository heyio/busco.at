'use client';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookingFormValues, formSchema } from '@/lib/booking-form-schema';
import defaultValues from '@/lib/default-booking-form-values';
import Typography from '@/components/ui/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useBookingForm from '@/hooks/use-booking-form';
import Dots from '@/public/elements/dots.svg';
import Image from 'next/image';
import { TimePicker } from '../ui/time-picker';
import { DatePicker } from '../ui/date-picker';
import vehicles from '@/constants/vehicles';
import { PriceItemType } from '@/types/PriceItem';
import ScrollTo from '../molecules/scroll-to';
import { RouteType } from '@/types/RouteType';
import { Textarea } from '../ui/textarea';
import steps from '@/lib/booking-form-steps';
import Autocomplete from '../molecules/autocomplete';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';

const getDestinationName = (destination: any) => {
  return (
    destination?.data?.attributes?.name ||
    destination?.attributes?.name ||
    destination?.name ||
    ''
  );
};

export type BookingFormProps = {
  priceInfo?: { prices: { attributes: PriceItemType }[]; routeInfo: RouteType };
};

function BookingForm({ priceInfo }: BookingFormProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    bookingForm,
    handlePrice,
    price,
    from,
    to,
    currentStep,
    nextStep,
    handleDate,
    handleTime,
  } = useBookingForm(form);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: BookingFormValues) => {
    try {
      setLoading(true);
      const response = await fetch('/api/send-service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response) {
        nextStep();
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (priceInfo) {
      handlePrice(priceInfo);
    }
  }, [form.getValues('vehicle'), form.getValues('from'), form.getValues('to')]);

  useEffect(() => {
    if (from) {
      form.setValue('from', from);
    }

    if (to) {
      form.setValue('to', to);
    }
  }, [from, to]);

  useEffect(() => {
    if (currentStep === 1) {
      // rendering fix to clear all errors
      setTimeout(() => {
        form.clearErrors(['name', 'email', 'message', 'terms']);
      }, 0);
    }
  }, [currentStep, form]);

  return (
    <div className="text-foreground w-full">
      <>
        <div className="bg-white rounded-t-2xl pb-4 py-6 px-6 md:px-10">
          <Typography size="h4" weight={'bold'} className="text-center">
            {steps[currentStep].title}
          </Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            {currentStep === 0 && (
              <div className="flex flex-col gap-4 bg-white rounded-b-lg pb-6 px-6 md:px-10">
                <div className="grid grid-cols-2 gap-4">
                  <Autocomplete
                    form={form}
                    label="Von"
                    fieldName="from"
                    placeholder="Start"
                  />
                  <Autocomplete
                    form={form}
                    label="Nach"
                    fieldName="to"
                    placeholder="Ziel"
                  />
                </div>
                <div className="grid md:grid-cols-8 gap-4">
                  <div className="md:col-span-4 lg:col-span-5 xl:col-span-4">
                    <FormField
                      control={form.control}
                      name="vehicle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fahrzeug</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl className="relative">
                                <SelectTrigger>
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Fahrzeug"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vehicles?.length &&
                                  vehicles.map((vehicle) => (
                                    <SelectItem
                                      key={vehicle.name}
                                      value={vehicle.name}
                                      className="relative min-h-10"
                                    >
                                      <div className="absolute top-0 flex gap-4 md:gap-8 items-center justify-between min-h-10">
                                        <div className="text-left leading-4">
                                          {vehicle.name}
                                          <small className="block text-gray-500 w-auto">
                                            {vehicle.description}
                                          </small>
                                        </div>
                                        <Image
                                          src={vehicle.image}
                                          className="block text-gray-500 h-7 w-auto"
                                          alt={vehicle.name}
                                        />
                                      </div>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-4 lg:col-span-3 xl:col-span-4">
                    <FormField
                      control={form.control}
                      name="customers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personen</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Personen"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormLabel>Datum</FormLabel>
                        <FormControl>
                          <DatePicker field="date" onSelect={handleDate} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={() => (
                      <FormItem>
                        <FormLabel>Uhrzeit</FormLabel>
                        <FormControl>
                          <TimePicker field="time" onChange={handleTime} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="returnJourney"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-0.5">
                          <FormLabel className="cursor-pointer">
                            Rückfahrt
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            className="mt-1!"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Retunr Journey START */}
                {bookingForm.returnJourney && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="returnDate"
                      render={() => (
                        <FormItem>
                          <FormLabel>Datum</FormLabel>
                          <FormControl>
                            <DatePicker
                              field="returnDate"
                              onSelect={handleDate}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="returnTime"
                      render={() => (
                        <FormItem>
                          <FormLabel>Uhrzeit</FormLabel>
                          <FormControl>
                            <TimePicker
                              field="returnTime"
                              onChange={handleTime}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 bg-white rounded-b-lg pb-6 px-6 md:px-10">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Name"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="E-Mail"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anmerkungen</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ''}
                          disabled={loading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 w-full mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0! cursor-pointer">
                        Ich habe die{' '}
                        <Link
                          href="/datenschutz"
                          className="underline"
                          target="blank"
                        >
                          Datenschutzerklärung
                        </Link>{' '}
                        und die{' '}
                        <Link href="/agb" className="underline" target="blank">
                          AGBs
                        </Link>{' '}
                        gelesen und stimme diesen zu.
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex flex-col gap-4 bg-white rounded-b-lg pb-6 px-6 md:px-10">
                <Typography className="text-center">
                  Wir möchten Ihnen versichern, dass wir Ihr Anliegen ernst
                  nehmen und uns bemühen, Ihnen schnellstmöglich zu antworten.
                  Sie können mit einer Rückmeldung von uns innerhalb von 48
                  Stunden rechnen.
                </Typography>
              </div>
            )}
            {/* Retunr Journey END */}
            {currentStep < 2 && (
              <div className="bg-white rounded-b-2xl rounded-t-lg py-4 px-6 md:px-10 relative">
                <div className="flex justify-between">
                  <Image
                    src={Dots.src}
                    className="absolute w-full -top-px left-0 px-2 h-1"
                    width={100}
                    height={3}
                    alt="dots"
                  />
                  <div className="flex flex-col md:flex-row justify-between gap-2 w-full">
                    <div>
                      {price > 0 ? (
                        <Typography
                          type="h4"
                          size={'h4'}
                          weight={'bold'}
                          className="whitespace-nowrap"
                        >
                          Fixpreis: <var className="not-italic">€{price},-</var>
                        </Typography>
                      ) : (
                        <Typography
                          type="h4"
                          size={'h4'}
                          weight={'bold'}
                          className="whitespace-nowrap"
                        >
                          Preis auf Anfrage
                        </Typography>
                      )}
                    </div>
                    <div className={`flex md:justify-end w-full`}>
                      {currentStep === 0 ? (
                        <Button disabled={loading} size="lg" onClick={nextStep}>
                          Weiter
                        </Button>
                      ) : (
                        <Button disabled={loading} size="lg" type="submit">
                          Anfrage senden
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {price > 0 && (
                  <small className="text-gray-400">
                    Inklusive aller Gebühren und Nebenkosten.
                  </small>
                )}
              </div>
            )}
          </form>
        </Form>
      </>
      {price > 0 && (
        <ScrollTo
          title={`${getDestinationName(priceInfo?.routeInfo?.from)} - ${getDestinationName(priceInfo?.routeInfo?.to)}`}
          price={price}
        />
      )}
    </div>
  );
}

export default BookingForm;
