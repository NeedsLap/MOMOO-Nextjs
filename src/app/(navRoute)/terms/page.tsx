import { Metadata } from 'next';

import Terms from '@/containers/terms/Terms';

export const metadata: Metadata = {
  title: 'Terms of use | MOMOO',
};

export default function page() {
  return <Terms />;
}
