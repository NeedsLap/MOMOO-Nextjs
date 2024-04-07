import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getFeed } from '@/services/feed';

import type { GetFeedProps } from '@/services/model';
import type { Feed } from '@/types/feed';

export default function useFeedData() {
  const router = useRouter();
  const [error, setError] = useState('');
  const getFeedData = async (
    getFeedProps: GetFeedProps,
  ): Promise<undefined | Feed> => {
    try {
      const res = await getFeed(getFeedProps);
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 403 || res.status === 404 || res.status === 401) {
          router.replace('/404');
        }

        throw new Error(json.error);
      }

      return json;
    } catch (error) {
      console.error(error);

      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('데이터를 불러오는 중 에러가 발생했습니다');
      }
    }
  };

  return { getFeedData, error };
}
