import { Metadata } from 'next';

import EditFeed from '@/containers/editFeed/EditFeed';

export const metadata: Metadata = {
  title: 'Edit feed | MOMOO',
};

export default function page() {
  return <EditFeed />;
}
