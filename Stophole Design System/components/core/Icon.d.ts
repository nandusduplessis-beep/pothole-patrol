import * as React from 'react';

/**
 * Lucide-style stroke icon. `currentColor` inherits text color and theme.
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name:
    | 'camera' | 'map-pin' | 'search' | 'chevron-right' | 'chevron-left'
    | 'arrow-right' | 'arrow-up-right' | 'x' | 'circle-check' | 'circle-x'
    | 'triangle-alert' | 'user' | 'vote' | 'calendar' | 'banknote' | 'flag'
    | 'phone' | 'bell' | 'plus' | 'sun' | 'moon' | 'layers' | 'share'
    | 'home' | 'list' | 'message-square' | 'settings';
  size?: number;
  strokeWidth?: number;
}

export function Icon(props: IconProps): JSX.Element;
