import { PageAction, PageState, Path } from '@/modules/model';

const initState = {
  prevPath: null
};

const setPrevPath = (prevPath: Path): PageAction => {
  return { type: 'savePrevPath', payload: { prevPath } };
};

const resetPageState = (): PageAction => {
  return { type: 'reset', payload: initState };
};

/* eslint-disable @typescript-eslint/default-param-last */
const pageReducer = (state = initState, action: PageAction): PageState => {
  switch (action.type) {
    case 'savePrevPath':
      return action.payload;
    case 'reset':
      return action.payload;
    default:
      return state;
  }
};

export default pageReducer;
export { setPrevPath, resetPageState };
