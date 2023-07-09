import { Autocomplete, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { IOption } from 'features/common/form/models/option';
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form';

interface ISelectProps<TFormValues extends FieldValues, TOption extends number | string> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  options: IOption<TOption>[];
  disabled?: boolean;
}

export const ESelect = <
  TFormValues extends FieldValues,
  TOption extends number | string,
>({
  name,
  control,
  disabled = false,
  options,
}: ISelectProps<TFormValues, TOption>) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <div>
      <Autocomplete
        autoComplete={false}
        id={name}
        options={options}
        placeholder={name}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disabled={disabled}
        onChange={(e, value) =>
          field.onChange(value as PathValue<TFormValues, Path<TFormValues>>)
        }
        value={field.value}
        onBlur={field.onBlur}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      {fieldState.error && (
        <p className="text-accent-light">{fieldState.error?.message}</p>
      )}
    </div>
  );
};
