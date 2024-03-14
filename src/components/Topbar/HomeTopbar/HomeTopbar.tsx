import Image from 'next/image';

import StyledHomeTopBar from '@/components/Topbar/HomeTopbar/StyledHomeTopbar';

export default function HomeTopbar() {
  return (
    <StyledHomeTopBar>
      <h1 className="a11y-hidden">MoMoo</h1>
      <Image src="/icons/logo.svg" alt="모무" />
    </StyledHomeTopBar>
  );
}
