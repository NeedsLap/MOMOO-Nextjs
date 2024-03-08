const url = 'http://localhost:3000/api';

interface FeedsApiQuery {
  limit: number;
  skip: number;
  albumName: string;
  uid: string;
  cookie?: string;
}

interface FetchOpts {
  method: 'GET';
  headers?: {
    Cookie?: string;
  };
}

const getFeeds = async ({
  limit,
  skip,
  albumName,
  uid,
  cookie,
}: FeedsApiQuery) => {
  const opts: FetchOpts = {
    method: 'GET',
    // credentials: 'include',
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
