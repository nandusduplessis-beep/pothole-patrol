import * as React from 'react';

/**
 * Dot-grid score — N of total dots filled in the verdict color (FeeGoo pattern).
 * Used for the Pothole Test sub-signals: "7 / 10 proven fixes".
 */
export interface DotScoreProps {
  score: number;
  total?: number;
  verdict?: 'green' | 'amber' | 'red';
  /** Dot diameter in px. */
  size?: number;
  /** Gap between dots in px. */
  gap?: number;
}

export function DotScore(props: DotScoreProps): JSX.Element;
