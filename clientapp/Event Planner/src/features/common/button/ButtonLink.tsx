import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ButtonLinkWithLabelProps extends Omit<LinkProps, 'children'> {
  label: string;
}

interface ButtonLinkWithChildrenProps extends Omit<LinkProps, 'children'> {
  children: ReactNode;
}

type ButtonProps = ButtonLinkWithLabelProps | ButtonLinkWithChildrenProps;

export const ButtonLink = ({ className, ...rest }: ButtonProps) => {
  const buttonStyles = classNames(
    'py-2 px-4 text-text-dark focus:outline-none hover bg-primary-light',
    className,
  );

  if ('label' in rest) {
    return (
      <Link className={buttonStyles} {...rest}>
        {rest.label}
      </Link>
    );
  }

  if ('children' in rest) {
    return (
      <Link className={buttonStyles} {...rest}>
        {rest.children}
      </Link>
    );
  }
};
