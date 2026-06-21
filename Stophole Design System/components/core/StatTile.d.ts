import * as React from 'react';

/**
 * Big oversized stat tile — mono label + display-weight number. The "2 weeks" / "$68.300" pattern.
 */
export interface StatTileProps {
  /** Mono caps label above the number. */
  label?: React.ReactNode;
  /** The number itself. */
  value: React.ReactNode;
  /** Optional small unit suffix (e.g. "days", "ha"). */
  unit?: React.ReactNode;
  tone?: 'default' | 'yellow' | 'dark' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function StatTile(props: StatTileProps): JSX.Element;
