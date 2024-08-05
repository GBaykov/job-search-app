import { Select } from '@mantine/core';

import { FC } from 'react';
import classes from './selectInput.module.css';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { SelectedData } from '@/types';

type SelectInputProps = {
  formValue: string;
  onChangeHandler: (value: number | string | null, type: string) => void;
  data: SelectedData;
};

export const SelectInput: FC<SelectInputProps> = ({ formValue, onChangeHandler, data }) => {
  return (
    <Select
      clearable
      value={formValue}
      name="catalogues"
      onChange={(e) => onChangeHandler(e, 'catalogues')}
      rightSection={<ArrowIcon />}
      classNames={{
        input: classes.input,
        rightSection: classes.rightSection,
        wrapper: classes.wrapper,
        root: classes.root,
      }}
      placeholder="Выберете отрасль"
      data={data}
    />
  );
};
