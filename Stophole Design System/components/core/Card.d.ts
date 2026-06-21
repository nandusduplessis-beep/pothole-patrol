import * as React from 'react';

/**
 * Generic rounded container — the base block for grouped content.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sunken' | 'dark' | 'yellow';
  padding?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
