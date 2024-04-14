import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import StyledBreadcrumbWrap from '@/components/Breadcrumb/StyledBreadcrumbWrap';
import StyledH2 from '@/components/CommonStyled/StyledH2';

interface NavItem {
  path: string;
  text: string;
}

interface Props {
  navList: NavItem[];
  title: string;
}

export default function BreadcrumbWrap({ navList, title }: Props) {
  return (
    <StyledBreadcrumbWrap>
      <StyledH2>{title}</StyledH2>
      <Breadcrumb navList={navList} />
    </StyledBreadcrumbWrap>
  );
}
