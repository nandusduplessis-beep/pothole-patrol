import * as React from 'react';

/**
 * The app's signature entry: an irregular recessed asphalt hole that doubles as
 * an input. Tap to snap a photo, or type an address. Used on the home screen.
 */
export interface PotholeInputProps {
  placeholder?: string;
  subtext?: string;
  width?: number;
  height?: number;
  value?: string;
  onSnap?: () => void;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

export function PotholeInput(props: PotholeInputProps): JSX.Element;
