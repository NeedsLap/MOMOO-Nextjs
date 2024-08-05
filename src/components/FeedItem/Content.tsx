import { StyledText } from '@/components/CommonStyled/StyledTypography';

export default function Content({ text }: { text: string }) {
  return (
    <StyledText $size="m" as="p" style={{ marginBottom: '10px' }}>
      {text.split('\n').map((v, i) =>
        i === 0 ? (
          v
        ) : (
          <>
            <br />
            {v}
          </>
        )
      )}
    </StyledText>
  );
}
