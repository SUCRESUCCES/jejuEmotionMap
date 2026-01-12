export interface RegionData {
  name: string;
  ssi: number;
  level: 'safe' | 'stable' | 'caution' | 'warning' | 'danger';
  change: number;
  keywords: string[];
  summary: string;
}

export interface Position {
  left: number;
  top: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ChartData {
  date: string;
  value: number;
}


