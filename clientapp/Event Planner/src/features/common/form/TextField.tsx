import { TextField as MUITextFIeld } from '@mui/material';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface ITextFieldProps<TFormValues extends FieldValues> {
  label: string;
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  disabled?: boolean;
  placeholder?: string;
}

export const TextField = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
}: ITextFieldProps<TFormValues>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <MUITextFIeld
      autoComplete="off"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      onChange={field.onChange}
      onBlur={field.onBlur}
      ref={field.ref}
      name={field.name}
      color="warning"
      value={field.value}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      variant="standard"
    />
  );
};
