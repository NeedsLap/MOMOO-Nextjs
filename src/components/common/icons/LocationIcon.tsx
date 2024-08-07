import StyledIcon from '@/components/common/icons/StyledIcon';
import { iconDir } from '@/constants/assets';

import IconProps from '@/components/common/icons/model';

export default function LocationIcon({ alt, style }: IconProps) {
  return (
    <StyledIcon
      $size={16}
      width={16}
      height={16}
      src={`${iconDir}/location.svg`}
      alt={alt || '위치'}
      style={style}
    />
  );
}
