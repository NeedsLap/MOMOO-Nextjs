import { Metadata } from 'next';

import Feed from '@/containers/feed/Feed';

export const metadata: Metadata = {
  title: 'Feed | MOMOO',
};

export default function page() {
  return <Feed />;
}
