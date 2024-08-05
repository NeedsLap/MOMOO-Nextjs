import { StyledText } from '@/components/CommonStyled/StyledText';

export default function Title({ title }: { title: string }) {
  return (
    <StyledText
      $size="l"
      $weight="priminent"
      as="strong"
      style={{ display: 'block', marginBottom: 'var(--space-050)' }}
    >
      {title}
    </StyledText>
  );
}
