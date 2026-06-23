'use client';
import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

export type DatePickerProps = {
  field: string;
  onSelect: (payload: { date: Date; field: string }) => void;
};

export function DatePicker({ field, onSelect }: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() + 2);

  const handleSelect = (date: Date) => {
    setDate(date);
    onSelect({ date: date, field: field });
    setIsCalendarOpen(false);
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal px-3 mt-1! hover:bg-gray-50',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd.MM.yyyy') : <span>Datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          startMonth={fromDate}
          disabled={{ before: fromDate }}
          selected={date}
          onDayClick={handleSelect}
          locale={de}
        />
      </PopoverContent>
    </Popover>
  );
}
