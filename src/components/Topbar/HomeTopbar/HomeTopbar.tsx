import Image from 'next/image';

import StyledHomeTopBar from '@/components/Topbar/HomeTopbar/StyledHomeTopbar';

export default function HomeTopbar() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <StyledHomeTopBar>
      <h1 className="a11y-hidden">MoMoo</h1>
      <button type="button" onClick={scrollToTop}>
        <Image width={112} height={18} src="/icons/logo.svg" alt="모무" />
      </button>
    </StyledHomeTopBar>
  );
}
