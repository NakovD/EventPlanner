import { TextField as MUITextFIeld } from '@mui/material';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface ITextAreaProps<TFormValues extends FieldValues> {
  label: string;
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  disabled?: boolean;
  placeholder?: string;
  info?: string;
}

export const TextArea = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  info,
}: ITextAreaProps<TFormValues>) => {
  const { field, fieldState } = useController({ control, name });

  const helperText = fieldState.error ? fieldState.error.message : info;

  return (
    <MUITextFIeld
      multiline
      className="w-full"
      autoComplete="off"
      error={!!fieldState.error}
      helperText={helperText}
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
