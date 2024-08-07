import StyledWeatherImg from '@/components/common/Imgs/WeatherImg/StyledWeatherImg';
import { imgDir } from '@/constants/assets';
import designToken from '@/constants/designToken';

import WeatherImgProps from '@/components/common/Imgs/WeatherImg/model';

export default function WeatherImg({ weather, size = 'xl', style }: WeatherImgProps) {
  const sizeValue = designToken.scale[size];

  return (
    <StyledWeatherImg
      $size={sizeValue}
      width={sizeValue}
      height={sizeValue}
      // src={`${imgDir}/${weather}-${size}.svg`}
      src={`${imgDir}/${weather}.svg`}
      alt={weather}
      style={style}
    />
  );
}
