import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { BookingFormValues } from '@/lib/booking-form-schema';
import { Input } from '../ui/input';
import InputList from './input-list';
import { useEffect, useRef, useState } from 'react';
import { TownModel } from '@/types/Town';
import useTown from '@/hooks/use-town';

type BookingFormField = keyof BookingFormValues;

export type InputListProps = {
  form: any;
  label: string;
  fieldName: BookingFormField;
  placeholder: string;
};

const Autocomplete = ({
  form,
  label,
  fieldName,
  placeholder,
}: InputListProps) => {
  const townListRef = useRef<HTMLDivElement>(null);
  const { getTowns } = useTown();

  const [towns, setTowns] = useState<TownModel[]>();
  const [townList, setTownList] = useState<TownModel[]>();
  const [townInputFocus, setTownInputFocus] = useState<boolean>(false);
  const [selectedTown, setSelectedTown] = useState<TownModel>({
    name: '',
  });

  const handleSelectTown = (payload: TownModel) => {
    setSelectedTown(payload);
    setTownInputFocus(false);
  };

  const handleFocusTown = () => {
    setTownInputFocus(true);
  };

  const autoCompleteTowns = (value: string) => {
    if (!towns) return [];
    setTownList(
      towns.filter((town: TownModel) =>
        town.name?.toLowerCase().startsWith(value?.toLowerCase())
      )
    );
  };

  const handleBlurTown = (field: BookingFormField) => {
    if (townListRef.current) {
      setTimeout(() => {
        setTownInputFocus(false);
        form.trigger(field);
      }, 350);
    }
  };

  useEffect(() => {
    autoCompleteTowns(selectedTown.name);
  }, [selectedTown]);

  useEffect(() => {
    if (selectedTown) {
      form.setValue(fieldName, selectedTown.name);
    }

    if (selectedTown?.name !== '') {
      form.trigger(fieldName);
    }
  }, [selectedTown]);

  const getFrom = form.getValues(fieldName);

  useEffect(() => {
    const from = getFrom;
    autoCompleteTowns(from);
  }, [getFrom]);

  useEffect(() => {
    const listItems = async () => {
      const items = await getTowns();
      setTowns(items);
    };
    listItems();
  }, []);

  return (
    <FormField
      defaultValue={selectedTown.name}
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              onFocus={handleFocusTown}
              onBlur={() =>
                handleBlurTown(field.toString() as BookingFormField)
              }
            />
          </FormControl>
          {townInputFocus && townList?.length && townList?.length > 0 ? (
            <div ref={townListRef} className="relative">
              <InputList
                onSelect={handleSelectTown}
                items={townList}
                selectedItem={selectedTown}
              />
            </div>
          ) : (
            <div className="m-1"></div>
          )}
        </FormItem>
      )}
    />
  );
};

export default Autocomplete;
