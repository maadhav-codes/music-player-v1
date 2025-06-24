import type { LucideProps } from 'lucide-react';
import type React from 'react';

export type NetworkStatus = 'offline' | 'online';

export type Tabs = {
  id: 'home' | 'playlist' | 'browse' | 'settings';
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}[];

export interface HeaderProps {
  networkStatus: NetworkStatus;
  currentTime: string;
}
