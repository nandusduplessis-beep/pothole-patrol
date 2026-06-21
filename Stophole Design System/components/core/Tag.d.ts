import * as React from 'react';

/**
 * Pill eyebrow tag — soft rounded section label (mono caps).
 * Used above section headlines and inline as metadata.
 */
export interface TagProps {
  tone?: 'neutral' | 'yellow' | 'dark' | 'success' | 'danger';
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
