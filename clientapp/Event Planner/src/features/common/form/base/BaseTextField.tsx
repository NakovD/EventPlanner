import ClearIcon from '@mui/icons-material/Clear';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

interface IBaseTextFieldProps {
  label: string;
  className?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const BaseTextField = ({
  label,
  className,
  defaultValue,
  onChange,
}: IBaseTextFieldProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClear = () => setValue('');

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={classNames('flex gap-3', className)}>
      <label>
        {label}
        <input
          className="w-full"
          autoComplete="off"
          color="warning"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </label>
      <button onClick={onClear}>
        <ClearIcon />
      </button>
    </div>
  );
};
