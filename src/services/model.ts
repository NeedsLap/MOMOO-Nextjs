interface GetFeedsProps {
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

interface GetFeedProps {
  id: string;
  cookie?: string;
}

interface GetFeedOpts {
  method: 'GET';
  headers?: {
    Cookie?: string;
  };
}

export type { GetFeedsProps, GetFeedsOpts, GetFeedProps, GetFeedOpts };
