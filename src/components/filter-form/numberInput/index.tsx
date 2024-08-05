import { NumberInput } from '@mantine/core';
import { FC } from 'react';
import classes from './numberInput.module.css';

type StyledNumberInputProps = {
  formValue: number | '';
  onChangeHandler: (value: number | string | null, type: string) => void;
  name: string;
  placeholder: string;
};

export const StyledNumberInput: FC<StyledNumberInputProps> = ({
  formValue,
  onChangeHandler,
  name,
  placeholder,
}) => {
  return (
    <NumberInput
      value={formValue}
      onChange={(e) => onChangeHandler(e, name)}
      name={name}
      w="100%"
      h={42}
      min={0}
      placeholder={placeholder}
      classNames={{
        control: classes.control,
        input: classes.input,
        rightSection: classes.rightSection,
      }}
    />
  );
};
