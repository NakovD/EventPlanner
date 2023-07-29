import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface IButtonProps {
  label: string;
  className?: string;
  to?: string;
  isSubmit?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({
  label,
  to,
  className,
  isSubmit = false,
  disabled,
  onClick,
}: IButtonProps) => {
  const buttonStyles = classNames(
    'py-2 px-4  text-text-dark focus:outline-none hover',
    className,
    { ['cursor-not-allowed bg-primary-dark']: disabled },
    { ['bg-primary-light']: !disabled },
  );

  if (to) {
    return (
      <Link className={'inline-block ' + buttonStyles} to={to}>
        {label}
      </Link>
    );
  }
  return (
    <button
      className={buttonStyles}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
