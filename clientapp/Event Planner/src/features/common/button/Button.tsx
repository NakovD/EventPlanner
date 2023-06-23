import classNames from 'classnames';

interface IButtonProps {
  label: string;
  isSubmit?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ label, isSubmit = false, disabled, onClick }: IButtonProps) => {
  const buttonStyles = classNames(
    'py-2 px-4 bg-primary-light text-text-dark focus:outline-none',
    { ['cursor-not-allower']: disabled },
  );
  return (
    <button
      className={buttonStyles}
      type={isSubmit ? 'button' : 'submit'}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
