import classNames from 'classnames';
import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Select from 'react-select';

import { IOption } from '../models/option';

type SingleSelectProps<
  TFormValues extends FieldValues,
  TOption extends number | string,
> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  options: IOption<TOption>[];
  label: string;
  disabled?: boolean;
} & Omit<
  ComponentProps<typeof Select>,
  'value' | 'options' | 'isMulti' | 'ref' | 'onBlur' | 'onChange' | 'isDisabled'
>;

export const SingleSelect = <
  TFormValues extends FieldValues,
  TOption extends number | string,
>({
  control,
  name,
  options,
  label,
  disabled,
  id,
  ...rest
}: SingleSelectProps<TFormValues, TOption>) => {
  const {
    field: { ref, onBlur, onChange, value },
    fieldState: { invalid, isDirty },
  } = useController<TFormValues, typeof name>({
    control,
    name,
  });

  return (
    <label className={classNames({ ['accent-light']: invalid })} htmlFor={id}>
      <p>{label}</p>
      <Select
        isMulti={false}
        options={options}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        id={id}
        isDisabled={disabled}
        {...rest}
      />
    </label>
  );
};
