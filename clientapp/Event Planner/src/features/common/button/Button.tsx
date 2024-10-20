import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonWithLabelProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
}

interface ButtonWithChildrenProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
}

type ButtonProps = ButtonWithLabelProps | ButtonWithChildrenProps;

export const Button = ({
  disabled,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const buttonStyles = classNames(
    'py-2 px-4 text-text-dark focus:outline-none hover',
    className,
    { ['cursor-not-allowed bg-primary-dark']: disabled },
    { ['bg-primary-light']: !disabled },
  );

  if ('label' in rest) {
    return (
      <button className={buttonStyles} disabled={disabled} type={type} {...rest}>
        {rest.label}
      </button>
    );
  }

  if ('children' in rest) {
    return (
      <button className={buttonStyles} disabled={disabled} type={type} {...rest}>
        {rest.children}
      </button>
    );
  }
};
