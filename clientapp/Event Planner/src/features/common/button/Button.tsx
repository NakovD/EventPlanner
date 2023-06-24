import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface IButtonProps {
  label: string;
  to?: string;
  isSubmit?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({
  label,
  to,
  isSubmit = false,
  disabled,
  onClick,
}: IButtonProps) => {
  const buttonStyles = classNames(
    'py-2 px-4 bg-primary-light text-text-dark focus:outline-none hover',
    { ['cursor-not-allower']: disabled },
  );

  if (to) {
    return (
      <Link className={buttonStyles} to={to}>
        {label}
      </Link>
    );
  }
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
