'use client';

import Button from '@/components/Button/Button';
import { StyledText, StyledTitle } from '@/components/CommonStyled/StyledTypography';
import StyledError from '@/containers/error/StyledError';

export default function Error() {
  return (
    <StyledError>
      <StyledTitle $size="s">페이지가 작동하지 않습니다</StyledTitle>
      <StyledText $size="m" as="p" style={{ marginBottom: 'var(--space-150)' }}>
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </StyledText>
      <Button>새로고침</Button>
    </StyledError>
  );
}
