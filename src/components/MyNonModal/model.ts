import { Dispatch, SetStateAction } from 'react';

export default interface MyNonModalProps {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}
