import classNames from 'classnames';

interface ITextFieldProps {
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

export const TextField = ({ label, placeholder, disabled }: ITextFieldProps) => {
  const isFilled = false;
  const filledStyles = isFilled ? '-left-3 bottom-8 scale-90' : '';
  const labelStyles = classNames(
    filledStyles,
    'absolute bottom-2 left-2 leading-normal w-full bg-transparent peer-focus:bottom-8 peer-focus:-left-3 peer-focus:scale-90 transition-all',
  );
  return (
    <label className="flex flex-col relative bg-transparent">
      <input
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        className="px-3 py-2 border-b-2 border-primary-dark focus:outline-none bg-transparent peer"
      />
      <span className={labelStyles}>{label}</span>
    </label>
  );
};
