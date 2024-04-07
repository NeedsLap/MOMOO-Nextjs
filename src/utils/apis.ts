import { getFeeds } from '@/services/feed';
import { getAlbum } from '@/services/album';

import { GetFeedsQuery } from '@/services/model';

const getFeedsAndHandleException = async (getFeedsQuery: GetFeedsQuery) => {
  try {
    const res = await getFeeds(getFeedsQuery);

    if (!res.ok) {
      if (res.status === 403 || res.status === 404 || res.status === 401) {
        console.error(new Error(await res.text()));
        return 'not-found';
      }
    }
    return await res.json();
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
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getFeedsAndHandleException, getAlbumListHandle };
