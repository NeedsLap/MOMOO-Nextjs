import { CSSProperties, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

import Indicator from '@/components/Feed/Carousel/Indicator/Indicator';
import NextBtn from '@/components/Feed/Carousel/NavBtns/NextBtn/NextBtn';
import PrevBtn from '@/components/Feed/Carousel/NavBtns/PrevBtn/PrevBtn';
import Slide from '@/components/Feed/Carousel/Slide/Slide';
import StyledSlider from '@/components/Feed/Carousel/StyledSlider';

export default function Carousel({
  imgUrlList,
  style
}: {
  imgUrlList: string[];
  style: CSSProperties;
}) {
  const [currIndex, setCurrIndex] = useState(0);
  const slideRef = useRef<HTMLUListElement | null>(null);
  const [slideStartX, setSlideStartX] = useState(0);

  const goToNextSlide = () => {
    if (currIndex < imgUrlList.length - 1) {
      const indexToSet = currIndex + 1;
      setCurrIndex(indexToSet);
    }
  };

  const goToPrevSlide = () => {
    if (currIndex > 0) {
      const indexToSet = currIndex - 1;
      setCurrIndex(indexToSet);
    }
  };

  const updateSlidePosition = useCallback(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currIndex * 100}%)`;
    }
  }, [slideRef, currIndex]);

  useEffect(() => {
    updateSlidePosition();
  }, [updateSlidePosition]);

  const endDragging = (e: React.TouchEvent<HTMLUListElement>) => {
    if (!slideRef.current) {
      return;
    }

    const { clientX } = e.changedTouches[0];

    if (clientX + 30 < slideStartX) {
      goToNextSlide();
    } else if (clientX > slideStartX + 30) {
      goToPrevSlide();
    } else {
      updateSlidePosition();
    }
  };

  const dragSlide = (e: React.TouchEvent<HTMLUListElement>) => {
    if (!slideRef.current) {
      return;
    }

    const { clientX } = e.touches[0];

    if (
      (currIndex !== 0 && clientX > slideStartX) ||
      (currIndex !== imgUrlList.length - 1 && clientX < slideStartX)
    ) {
      slideRef.current.style.transform = `translateX(calc(-${currIndex * 100}% + ${clientX - slideStartX}px))`;
    }
  };

  const updateCurrIndex = (index: number) => {
    setCurrIndex(index);
  };

  const startDragging = (e: TouchEvent<HTMLUListElement>) => {
    setSlideStartX(e.touches[0].clientX);
  };

  return imgUrlList.length > 1 ? (
    <div style={style}>
      <StyledSlider style={{ marginBottom: 'var(--space-150)' }}>
        <Slide
          ref={slideRef}
          imgUrlList={imgUrlList}
          startDragging={startDragging}
          dragSlide={dragSlide}
          endDragging={endDragging}
        />
        <NextBtn goToNextSlide={goToNextSlide} />
        <PrevBtn goToPrevSlide={goToPrevSlide} />
      </StyledSlider>

      <Indicator imgUrlList={imgUrlList} currIndex={currIndex} updateCurrIndex={updateCurrIndex} />
    </div>
  ) : (
    <Slide
      ref={slideRef}
      imgUrlList={imgUrlList}
      startDragging={startDragging}
      dragSlide={dragSlide}
      endDragging={endDragging}
      style={style}
    />
  );
}
