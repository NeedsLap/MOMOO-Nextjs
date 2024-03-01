import Image from 'next/image';
import { useState, SetStateAction, Dispatch, useEffect } from 'react';

import * as Styled from '@/components/FileUpload/StyledPreview';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';

const Preview = ({
  setFile,
  imgUrlList,
}: {
  setFile: Dispatch<SetStateAction<FileList | null>>;
  imgUrlList: string[];
}) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (!/^image\/(jpg|svg|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
        setSubmitErrMessage(
          '이미지 파일 확장자는 jpg, svg, png, jpeg, bmp, tif, heic만 가능합니다.',
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setSubmitErrMessage('이미지 용량은 10MB 이내로 등록 가능합니다.');
        return;
      }

      setImages(files);
      setFile(files);
    } else {
      setSubmitErrMessage('이미지 파일을 선택해주세요.');
    }
  };

  useEffect(() => {
    setImageList(imgUrlList);
  }, [imgUrlList]);

  const setImages = async (files: FileList) => {
    if (files) {
      if (files.length <= 3) {
        const fileArray = Array.from(files);
        const newImages: string[] = [];

        for (const file of fileArray) {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        }

        setImageList(newImages);
      } else {
        setSubmitErrMessage('최대 3장의 이미지까지만 선택할 수 있습니다.');
      }
    }
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % imageList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + imageList.length) % imageList.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Styled.PreviewSection>
        {imageList.length === 0 && (
          <label htmlFor="file">
            <div className="uploadText">
              <p>사진을 선택해 주세요(필수)</p>
              <span>*3장까지 업로드 가능</span>
              <Image
                src="/icons/add-l-white.svg"
                alt="사진 업로드 버튼"
                className="btnUpload"
                width={24}
                height={24}
              />
            </div>
          </label>
        )}
        <input
          accept="image/*"
          multiple
          type="file"
          id="file"
          onChange={handleImageUpload}
          onClick={(e) => console.log('file', e.currentTarget.files)}
        />
        <Styled.PreviewSlider>
          {imageList.length > 0 && (
            <>
              {/* 모바일 슬라이드 */}
              <Styled.ImageGrid>
                {imageList.map((image, index) => (
                  <Image
                    width={480}
                    height={480}
                    key={index}
                    src={image}
                    alt="사진 선택하기"
                  />
                ))}
              </Styled.ImageGrid>
              {/* 모바일 이상 슬라이드 */}
              <Styled.ImgSlidePcSize>
                {imageList.length > 1 && (
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="ArrowBack"
                    aria-label="Next slide"
                  >
                    <Image
                      width={20}
                      height={20}
                      alt=""
                      src="/icons/arrow-white.svg"
                    />
                  </button>
                )}
                <Image
                  className="selectImg"
                  width={480}
                  height={480}
                  src={imageList[currentIndex]}
                  alt="이미지"
                />
                {imageList.length > 1 && (
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="ArrowRight"
                    aria-label="Before slide"
                  >
                    <Image
                      width={20}
                      height={20}
                      src="/icons/add-l-white.svg"
                      alt=""
                    />
                  </button>
                )}
              </Styled.ImgSlidePcSize>
            </>
          )}
        </Styled.PreviewSlider>
        <Styled.IndicatorBasicBox>
          {imageList.length > 1 && (
            <Styled.IndicatorContainer>
              {imageList.map((_, index) => (
                <Styled.Indicator
                  key={index}
                  active={index === currentIndex}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </Styled.IndicatorContainer>
          )}
        </Styled.IndicatorBasicBox>
      </Styled.PreviewSection>

      {submitErrMessage && (
        <AlertModal
          message={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </>
  );
};

Preview.defaultProps = {
  imgUrlList: [],
};

export default Preview;
