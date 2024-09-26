import Address from '@/components/Feed/Background/Address';
import DateTime from '@/components/Feed/Background/DataTime';
import StyledBackground from '@/components/Feed/Background/StyledBackground';
import convertMillisToDatetime from '@/utils/date';

export default function Background({ millis, address }: { millis: number; address: string }) {
  const dateTime = convertMillisToDatetime(millis);

  return (
    <StyledBackground>
      <DateTime dateTime={dateTime} />
      {address && <Address address={address} />}
    </StyledBackground>
  );
}
