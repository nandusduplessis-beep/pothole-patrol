import * as React from 'react';

/**
 * Primary action button — pill-shaped, brand-typed.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = yellow pill (loudest CTA); `dark` = charcoal pill (default action); `secondary` = white pill; `ghost` = transparent. */
  variant?: 'primary' | 'dark' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Wrap leadingIcon in a small yellow rounded chip (only meaningful with `variant="dark"`). Hecta-pattern. */
  iconChip?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
