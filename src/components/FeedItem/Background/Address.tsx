import LocationIcon from '@/components/common/icons/LocationIcon';
import { StyledText } from '@/components/CommonStyled/StyledText';

export default function Address({ address }: { address: string }) {
  return (
    <>
      <LocationIcon />
      <StyledText $size="s">{address}</StyledText>
    </>
  );
}
