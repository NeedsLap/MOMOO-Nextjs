import { CSSProperties } from 'react';

import { Scale } from '@/types/designToken';

export default interface EmotionImgProps {
  emotion: string;
  size?: Scale;
  style?: CSSProperties;
}
