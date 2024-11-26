import classNames from 'classnames';
import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

type Textarea<TFormValues extends FieldValues> = Omit<
  ComponentProps<'textarea'>,
  'value'
> & {
  label: string;
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
};

export const Textarea = <TFormValues extends FieldValues>({
  label,
  control,
  name,
  className,
  onChange,
  onBlur,
  ...rest
}: Textarea<TFormValues>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <label>
      <p>{label}</p>
      <textarea
        value={field.value}
        onChange={(e) => {
          field.onChange(e);
          onChange?.(e);
        }}
        onBlur={(e) => {
          field.onBlur();
          onBlur?.(e);
        }}
        className={classNames(className, { ['accent-light']: fieldState.invalid })}
        {...rest}
      />
    </label>
  );
};
