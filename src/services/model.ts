interface GetFeedsQuery {
  limit: number;
  skip: number;
  albumName: string;
  uid: string;
  cookie?: string;
}

interface GetFeedsOpts {
  method: 'GET';
  // cache: 'no-store';
  headers?: {
    Cookie?: string;
  };
}

export type { GetFeedsQuery, GetFeedsOpts };
