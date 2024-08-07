import StyledEmotionImg from '@/components/common/Imgs/EmotionImg/StyledEmotionImg';
import { imgDir } from '@/constants/assets';
import designToken from '@/constants/designToken';

import EmotionImgProps from '@/components/common/Imgs/EmotionImg/model';

export default function EmotionImg({ emotion, size = 'xl', style }: EmotionImgProps) {
  const sizeValue = designToken.scale[size];

  return (
    <StyledEmotionImg
      $size={sizeValue}
      width={sizeValue}
      height={sizeValue}
      // src={`${imgDir}/${emotion}-${size}.svg`}
      src={`${imgDir}/${emotion}.svg`}
      alt={emotion}
      style={style}
    />
  );
}
