import { getFeeds } from '@/services/feed';

import type { GetFeedsProps } from '@/services/model';
import type { Feed } from '@/types/feed';

const getFeedsAndHandleException = async (
  getFeedsProps: GetFeedsProps,
): Promise<undefined | Feed[] | 'not-found'> => {
  try {
    const res = await getFeeds(getFeedsProps);
    const json = await res.json();

    if (!res.ok) {
      if (res.status === 403 || res.status === 404 || res.status === 401) {
        console.error(json.error);
        return 'not-found';
      }

      throw new Error(json.error);
    }

    return await json;
  } catch (error) {
    console.error(error);
  }
};

export { getFeedsAndHandleException };
