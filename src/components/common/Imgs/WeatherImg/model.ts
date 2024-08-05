import { CSSProperties } from 'react';

import { Scale } from '@/types/designToken';

export default interface WeatherImgProps {
  weather: string;
  size?: Scale;
  style?: CSSProperties;
}
