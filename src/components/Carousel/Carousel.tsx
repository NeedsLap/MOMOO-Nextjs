import Image from 'next/image';
import { useRef, useState } from 'react';

import * as Styled from '@/components/Carousel/StyledCarousel';

const Carousel = ({ imgUrlList }: { imgUrlList: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLUListElement | null>(null);
  const [slideStartX, setSlideStartX] = useState(0);

  const nextSlide = () => {
    if (!slideRef.current) {
      return;
    }

    if (currentIndex < imgUrlList.length - 1) {
      const indexToSet = currentIndex + 1;
      slideRef.current.style.transform = `translateX(-${indexToSet * 100}%)`;
      setCurrentIndex(indexToSet);
    }
  };

  const prevSlide = () => {
    if (!slideRef.current) {
      return;
    }

    if (currentIndex > 0) {
      const indexToSet = currentIndex - 1;
      slideRef.current.style.transform = `translateX(-${indexToSet * 100}%)`;
      setCurrentIndex(indexToSet);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const slide = (e: React.TouchEvent<HTMLUListElement>) => {
    const clientX = e.changedTouches[0].clientX;

    if (clientX + 30 < slideStartX) {
      nextSlide();
    } else if (clientX > slideStartX + 30) {
      prevSlide();
    } else if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  };

  const moveCarousel = (e: React.TouchEvent<HTMLUListElement>) => {
    if (!slideRef.current) {
      return;
    }

    const clientX = e.touches[0].clientX;

    if (
      (currentIndex !== 0 && clientX > slideStartX) ||
      (currentIndex !== imgUrlList.length - 1 && clientX < slideStartX)
    ) {
      slideRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${clientX - slideStartX}px))`;
    }
  };

  return (
    <>
      <Styled.SlideImgWrap>
        <ul
          ref={slideRef}
          onTouchStart={(e) => setSlideStartX(e.touches[0].clientX)}
          onTouchMove={moveCarousel}
          onTouchEnd={slide}
        >
          {imgUrlList.map((image, index) => (
            <li key={index}>
              <Image
                src={image}
                width={0}
                height={0}
                sizes=" 500px
                (max-width: 431px) calc(100vw - 48px),
               (max-width: 430px) calc(100vw - 32px)"
                alt="사진"
              ></Image>
            </li>
          ))}
        </ul>

        {imgUrlList.length > 1 && (
          <button
            type="button"
            onClick={prevSlide}
            className="ArrowBack"
            aria-label="Before slide"
          >
            <Image
              src="/icons/arrow-white.svg"
              width={24}
              height={24}
              alt="뒤로가기"
            ></Image>
          </button>
        )}

        {imgUrlList.length > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            className="ArrowRight"
            aria-label="Next slide"
          >
            <Image
              src="/icons/arrow-white.svg"
              width={24}
              height={24}
              alt="앞으로가기"
            ></Image>
          </button>
        )}
      </Styled.SlideImgWrap>

      {imgUrlList.length > 1 && (
        <Styled.IndicatorList>
          {imgUrlList.map((_, index) => (
            <Styled.IndicatorItem
              key={index}
              className={index === currentIndex ? 'active' : ''}
            >
              <button
                type="button"
                onClick={() => handleIndicatorClick(index)}
                aria-label={`${imgUrlList}개 중 ${index + 1}번`}
              ></button>
            </Styled.IndicatorItem>
          ))}
        </Styled.IndicatorList>
      )}
    </>
  );
};

export default Carousel;
