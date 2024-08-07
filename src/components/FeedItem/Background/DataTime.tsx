import CalendarIcon from '@/components/common/icons/CalendarIcon';
import { StyledText } from '@/components/CommonStyled/StyledTypography';

export default function DateTime({ dateTime }: { dateTime: string }) {
  return (
    <>
      <CalendarIcon alt="업로드 일자" />
      <StyledText $size="s" as="time" dateTime={dateTime}>
        {dateTime.replace(/-/gi, '.')}
      </StyledText>
    </>
  );
}
