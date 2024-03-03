import { PageData, Path } from '@/modules/model';

const initState = {
  prevPath: null,
};

type Action =
  | {
      type: 'reset';
      payload: PageData;
    }
  | {
      type: 'savePrevPath';
      payload: PageData;
    };

export const setPrevPath = (prevPath: Path): Action => {
  return { type: 'savePrevPath', payload: { prevPath } };
};

export const resetPageData = (): Action => {
  return { type: 'reset', payload: initState };
};

const pageReducer = (state = initState, action: Action): PageData => {
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
