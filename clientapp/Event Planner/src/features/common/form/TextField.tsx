import { TextField as MUITextFIeld } from '@mui/material';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface ITextFieldProps<TFormValues extends FieldValues> {
  label: string;
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  disabled?: boolean;
  placeholder?: string;
  info?: string;
}

export const TextField = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  info,
}: ITextFieldProps<TFormValues>) => {
  const { field, fieldState } = useController({ control, name });

  const helperText = fieldState.error ? fieldState.error.message : info;

  return (
    <MUITextFIeld
      autoComplete="off"
      error={!!fieldState.error}
      helperText={helperText}
      onChange={field.onChange}
      onBlur={field.onBlur}
      className="w-full"
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
