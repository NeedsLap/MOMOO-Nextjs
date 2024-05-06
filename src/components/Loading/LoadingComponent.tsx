'use client';

import { StyledLoadingComponent } from '@/components/Loading/StyledLodingImg';

export default function LoadingComponent() {
  return (
    <StyledLoadingComponent
      width={36}
      height={36}
      src="/icons/loading.svg"
      alt="로딩 중"
    />
  );
}
