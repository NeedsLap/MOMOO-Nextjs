import { API_URL } from '@/services/constant';

import type { GetFeedsQuery, GetFeedsOpts } from '@/services/model';

const getFeeds = async ({
  limit,
  skip,
  albumName,
  uid,
  cookie,
}: GetFeedsQuery) => {
  const opts: GetFeedsOpts = {
    method: 'GET',
  };

  if (cookie) {
    opts.headers = {
      Cookie: cookie,
    };
  }
  const res = await fetch(
    `${API_URL}/feed?limit=${limit}&skip=${skip}&album=${albumName}&uid=${uid}`,
    opts,
  );

  return res;
};

export { getFeeds };
