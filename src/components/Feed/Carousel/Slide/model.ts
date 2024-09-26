import { CSSProperties, TouchEvent } from 'react';

export default interface SlideProps {
  startDragging: (e: TouchEvent<HTMLUListElement>) => void;
  dragSlide: (e: TouchEvent<HTMLUListElement>) => void;
  endDragging: (e: TouchEvent<HTMLUListElement>) => void;
  imgUrlList: string[];
  style?: CSSProperties;
}
