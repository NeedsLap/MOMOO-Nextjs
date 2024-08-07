import { CSSProperties } from 'react';

export default interface MoreBtnProps {
  handleOnClick: () => void;
  color?: 'white';
  style?: CSSProperties;
}
