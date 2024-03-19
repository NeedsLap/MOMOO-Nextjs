import type { GetFeedsQuery, GetFeedsOpts } from '@/services/model';

const url = 'http://localhost:3000/api';

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
    `${url}/feed?limit=${limit}&skip=${skip}&album=${albumName}&uid=${uid}`,
    opts,
  );

  return res;
};

export { getFeeds };
