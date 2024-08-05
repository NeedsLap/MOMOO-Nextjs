import { Metadata } from 'next';

import Signup from '@/containers/signup/Signup';

export const metadata: Metadata = {
  title: 'Signup | MOMOO'
};

export default function page() {
  return <Signup />;
}
