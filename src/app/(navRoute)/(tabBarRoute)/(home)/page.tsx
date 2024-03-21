import { Metadata } from 'next';

import Home from '@/containers/home/Home';

export const metadata: Metadata = {
  title: 'Home | MOMOO',
};

export default function page() {
  return <Home />;
}
