import { Metadata } from 'next';

import Login from '@/containers/login/Login';

export const metadata: Metadata = {
  title: 'Login | MOMOO'
};

export default function page() {
  return <Login />;
}
