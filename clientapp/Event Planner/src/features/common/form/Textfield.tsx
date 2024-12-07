import { useId } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface ITextFieldProps<TFormValues extends FieldValues> {
  label: string;
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  disabled?: boolean;
  placeholder?: string;
  info?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const Textfield = <TFormValues extends FieldValues>({
  label,
  name,
  control,
  disabled,
  placeholder,
  info,
}: ITextFieldProps<TFormValues>) => {
  const { field, fieldState } = useController({ control, name });

  const helperText = fieldState.error ? fieldState.error.message : info;

  const id = useId();

  return (
    <div>
      <div className="after:content-[''] after:w-full after:h-px after:left-0 after:absolute after:bottom-0 after:bg-fade-color relative hover:after:h-0.5 [&:has(input:focus)]:after:bg-primary-light [&:has(input:focus)]:after:h-0.5">
        <input
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          className="peer w-full outline-none py-1"
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          data-value={field.value.length > 0}
        />
        <label
          className="absolute left-0 bottom-1 text-fade-color transition-all w-full peer-data-[value=true]:bottom-7 peer-focus:bottom-7 peer-focus:text-xs peer-data-[value=true]:text-xs peer-focus:text-primary-light"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {helperText && <p className="mt-1 text-sm text-fade-color">{helperText}</p>}
    </div>
  );
};
