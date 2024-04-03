interface GetFeedsQuery {
  limit: number;
  skip: number;
  albumName: string;
  uid: string;
  cookie?: string;
}

interface GetFeedsOpts {
  method: 'GET';
  headers?: {
    Cookie?: string;
  };
}

export type { GetFeedsQuery, GetFeedsOpts };
