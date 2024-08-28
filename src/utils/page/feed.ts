import { OFFSET_FROM_START } from '@/constants/feed';

import { NonNegativeInteger } from '@/types/common';

const getInitialSkip = (start: NonNegativeInteger) => {
  return start > OFFSET_FROM_START ? start - OFFSET_FROM_START : 0;
};

export default getInitialSkip;
