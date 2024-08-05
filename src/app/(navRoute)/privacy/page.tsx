import { Metadata } from 'next';

import Privacy from '@/containers/privacy/Privacy';

export const metadata: Metadata = {
  title: 'Privacy policy | MOMOO'
};

export default function page() {
  return <Privacy />;
}
