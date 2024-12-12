import ClearIcon from '@mui/icons-material/Clear';
import classNames from 'classnames';
import { IOption } from 'features/common/form/models/option';
import { useId, useState } from 'react';
import Select from 'react-select';

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
  const [value, setValue] = useState<IOption<TOptionValue> | undefined>(undefined);

  const handleChange = (value: IOption<TOptionValue>) => {
    setValue({ label: value.label, value: value.value });
    onChange(value);
  };

  const onClear = () => {
    setValue(undefined);
    onChange(undefined);
  };

  const id = useId();

  return (
    <div className={classNames('flex gap-3', className)}>
      <fieldset className="w-full">
        <label htmlFor={id}>
          {label}
          <Select
            id={id}
            options={options}
            value={value}
            onChange={(newValue) => newValue && handleChange(newValue)}
            isMulti={false}
          />
        </label>
      </fieldset>
      <button onClick={onClear}>
        <ClearIcon />
      </button>
    </div>
  );
};
