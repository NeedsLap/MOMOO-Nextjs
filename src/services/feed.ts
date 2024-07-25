import { API_URL } from '@/services/constant';

import type {
  GetFeedOpts,
  GetFeedProps,
  GetFeedsOpts,
  GetFeedsProps,
} from '@/services/model';

const getFeed = async ({ id, cookie }: GetFeedProps) => {
  const opts: GetFeedOpts = {
    method: 'GET',
  };

  if (cookie) {
    opts.headers = {
      Cookie: cookie,
    };
  }

  const res = await fetch(`${API_URL}/feed/${id}`, opts);

  return res;
};

const deleteFeed = async (id: string) => {
  const res = await fetch(`${API_URL}/feed/${id}`, {
    method: 'Delete',
  });

  return res;
};

const getFeeds = async ({
  limit,
  skip,
  albumName,
  uid,
  cookie,
}: GetFeedsProps) => {
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

export { getFeed, deleteFeed, getFeeds };
