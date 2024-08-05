import LocationIcon from '@/components/common/icons/LocationIcon';
import { StyledText } from '@/components/CommonStyled/StyledTypography';

export default function Address({ address }: { address: string }) {
  return (
    <>
      <LocationIcon />
      <StyledText $size="s">{address}</StyledText>
    </>
  );
}
