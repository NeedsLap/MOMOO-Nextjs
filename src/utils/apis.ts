import { getAlbum } from '@/services/album';
import { getFeeds } from '@/services/feed';

import type { GetFeedsProps } from '@/services/model';
import { Album } from '@/types/album';
import type { Feed } from '@/types/feed';

const getFeedsAndHandleException = async (
  getFeedsProps: GetFeedsProps
): Promise<null | Feed[] | 'not-found'> => {
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

    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAlbumListHandle = async (cookie: string) => {
  try {
    const res = await getAlbum(cookie);

    if (!res.ok) {
      if (res.status === 403 || res.status === 404 || res.status === 401) {
        console.error(new Error(await res.text()));
        return 'not-found';
      }
    }

    const json: Album[] = await res.json();

    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getFeedsAndHandleException, getAlbumListHandle };
