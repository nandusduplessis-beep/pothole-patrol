import * as React from 'react';

/**
 * Traffic-light verdict pill — the product's heartbeat. Green/Amber/Red.
 */
export interface VerdictBadgeProps {
  verdict: 'green' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
  /** Override default word ("GREEN" / "AMBER" / "RED") with custom text. */
  label?: React.ReactNode;
}

export function VerdictBadge(props: VerdictBadgeProps): JSX.Element;
