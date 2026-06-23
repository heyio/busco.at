'use client';
import { TimerIcon } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';

export type TimePickerProps = {
  field: string;
  onChange: (payload: { time: string; field: string }) => void;
};

export function TimePicker({ field, onChange }: TimePickerProps) {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [time, setTime] = useState<string>('');

  const handleHours = (increase: boolean) => {
    const newHours = increase ? (hours + 1) % 24 : (hours + 23) % 24;
    setHours(newHours);
  };

  const handleMinutes = (increase: boolean) => {
    const newMinutes = increase ? (minutes + 5) % 60 : (minutes + 60 - 5) % 60;
    setMinutes(newMinutes);
  };

  const handleTime = () => {
    const newTime =
      (hours < 10 ? '0' + hours.toString() : hours.toString()) +
      ':' +
      (minutes < 10 ? '0' + minutes.toString() : minutes.toString());
    setTime(newTime);
  };

  useEffect(() => {
    if (hours) {
      handleTime();
    }

    if (minutes) {
      handleTime();
    }
  }, [hours, minutes]);

  useEffect(() => {
    if (time) {
      onChange({ time, field });
    }
  }, [time]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal px-3 mt-1! hover:bg-gray-50',
            time === '' && 'text-muted-foreground'
          )}
        >
          <TimerIcon className="mr-2 h-4 w-4" />
          <span>{time === '' ? 'Uhrzeit' : time}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full px-4 py-2 flex items-center gap-4"
        align="start"
      >
        <div className="overflow-y-auto cursor-pointer text-2xl flex flex-col items-center">
          <Button size="sm" variant="link" onClick={() => handleHours(true)}>
            <Plus />
          </Button>
          <div className="my-1 px-2 py-1 hover:bg-gray-100 rounded">
            {hours < 10 ? '0' + hours.toString() : hours.toString()}
          </div>
          <Button size="sm" variant="link" onClick={() => handleHours(false)}>
            <Minus />
          </Button>
        </div>
        <div className="text-2xl -mt-1">:</div>
        <div className="overflow-y-auto cursor-pointer text-2xl flex flex-col items-center">
          <Button size="sm" variant="link" onClick={() => handleMinutes(true)}>
            <Plus />
          </Button>
          <div className="my-1 px-2 py-1 hover:bg-gray-100 rounded">
            {minutes < 10 ? '0' + minutes.toString() : minutes.toString()}
          </div>
          <Button size="sm" variant="link" onClick={() => handleMinutes(false)}>
            <Minus />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
