'use client';

import { Provider } from 'react-redux';

import App from '@/components/global/App';
import store from '@/modules/store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  );
}
