import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import classNames from 'classnames';
import { IOption } from 'features/common/form/models/option';
import { useState } from 'react';

interface IBaseSelectProps<TOptionValue extends number | string> {
  className?: string;
  label: string;
  onChange: (newValue?: IOption<TOptionValue>) => void;
  options: IOption<TOptionValue>[];
}

export const BaseSelect = <TOptionValue extends number | string>({
  className,
  label,
  onChange,
  options,
}: IBaseSelectProps<TOptionValue>) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue(value);
    const option = options.find((o) => o.value === value) as IOption<TOptionValue>;
    onChange(option);
  };

  const onClear = () => {
    setValue('');
    onChange(undefined);
  };

  return (
    <div className={classNames('flex gap-3', className)}>
      <FormControl className="w-full">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          className="w-full"
          onChange={handleChange}
        >
          {options.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button onClick={onClear}>
        <ClearIcon />
      </button>
    </div>
  );
};
