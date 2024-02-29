import Link from 'next/link';

import StyledBreadcrumb from '@/components/Breadcrumb/StyledBreadcrumb';

interface NavItem {
  path: string;
  text: string;
}

interface Props {
  navList: NavItem[];
}

export default function Breadcrumb({ navList }: Props) {
  return (
    <StyledBreadcrumb
      $arrow={'/icons/arrow-s.svg'}
      $arrowGray={'/icons/arrow-s-gray.svg'}
    >
      <ol>
        {navList.map((v, i) => {
          return (
            <li key={i} className={i === navList.length - 1 ? 'current' : ''}>
              <Link href={`${v.path}`}>{v.text}</Link>
            </li>
          );
        })}
      </ol>
    </StyledBreadcrumb>
  );
}
