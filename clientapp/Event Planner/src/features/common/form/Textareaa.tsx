import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

type Textarea<TFormValues extends FieldValues> = Omit<
  ComponentProps<'textarea'>,
  'value'
> & {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
};

export const Textarea = <TFormValues extends FieldValues>({
  control,
  name,
  onChange,
  onBlur,
  ...rest
}: Textarea<TFormValues>) => {
  const { field, fieldState } = useController({ control, name });

  return (
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
      {...rest}
    />
  );
};
