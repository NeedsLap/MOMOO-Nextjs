import Image from 'next/image';
import { useRef, useState } from 'react';

import * as Styled from '@/components/Carousel/StyledCarousel';
import useClientWidth from '@/hooks/useClientWidth';

const Carousel = ({ imgUrlList }: { imgUrlList: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLUListElement | null>(null);

  const clientWidth = useClientWidth();

  const nextSlide = () => {
    if (!slideRef.current) {
      return;
    }

    if (currentIndex < imgUrlList.length - 1) {
      const indexToSet = (currentIndex + 1) % imgUrlList.length;
      slideRef.current.style.transform = `translateX(-${indexToSet * 100}%)`;
      setCurrentIndex(indexToSet);
    }
  };

  const prevSlide = () => {
    if (!slideRef.current) {
      return;
    }

    if (currentIndex > 0) {
      const indexToSet =
        (currentIndex - 1 + imgUrlList.length) % imgUrlList.length;
      slideRef.current.style.transform = `translateX(-${indexToSet * 100}%)`;
      setCurrentIndex(indexToSet);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Styled.SlideImgWrap>
        <ul ref={slideRef}>
          {imgUrlList.map((image, index) => (
            <li key={index}>
              <Image
                src={image}
                width={
                  clientWidth > 1024
                    ? 500
                    : clientWidth > 430
                      ? clientWidth - 48
                      : clientWidth - 32
                }
                height={500}
                alt={'이미지'}
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
              alt={'뒤로가기'}
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
              alt={'앞으로가기'}
            ></Image>
          </button>
        )}
      </Styled.SlideImgWrap>

      {imgUrlList.length > 1 && (
        <Styled.IndicatorList>
          {imgUrlList.map((_, index) => (
            <Styled.IndicatorItem key={index} active={index === currentIndex}>
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
