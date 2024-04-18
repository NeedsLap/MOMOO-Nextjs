import Image from 'next/image';
import { useState, SetStateAction, Dispatch } from 'react';

import * as Styled from '@/components/FileUpload/StyledPreview';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';

const Preview = ({
  setFile,
  imgUrlList = [],
}: {
  setFile: Dispatch<SetStateAction<FileList | null>>;
  imgUrlList?: string[];
}) => {
  const [imageList, setImageList] = useState<string[]>(imgUrlList);
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      let valid = true;

      for (const file of files) {
        if (
          !/^image\/(jpg|svg(\+xml)?|png|jpeg|gif|bmp|tif|heic)$/.test(
            file.type,
          )
        ) {
          valid = false;
          break;
        }

        if (file.size > 10 * 1024 * 1024) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        setSubmitErrMessage(
          '이미지 파일 확장자는 jpg, svg, png, jpeg, gif, bmp, tif, heic만 가능합니다.',
        );
        return;
      }

      // 모든 파일이 유효한 경우 이미지 설정 및 업로드
      setImages(files);
      setFile(files);
    } else {
      setSubmitErrMessage('이미지 파일을 선택해주세요.');
    }
  };

  const setImages = async (files: FileList) => {
    if (files) {
      if (files.length <= 10) {
        const fileArray = Array.from(files);
        const newImages: string[] = [];

        for (const file of fileArray) {
          // 파일을 URL로 변환하여 이미지 리스트에 추가
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        }

        // 이미지 리스트 업데이트
        setImageList(newImages);
      } else {
        setSubmitErrMessage('최대 10장의 이미지까지만 선택할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    // 이미지 리스트에서 이미지 제거
    setImageList((currentImgList) =>
      currentImgList.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <>
      <Styled.SelectContainer>
        <Styled.ImageGrid>
          {imageList.map((image, index) => (
            <div key={index} className="selectedImgList">
              <img className="selectedImg" src={image} alt="이미지" />
              <button
                className="deleteBtn"
                onClick={() => handleRemoveImage(index)}
              >
                <Image
                  src="/icons/x-white.svg"
                  className="deleteBtnImg"
                  width={30}
                  height={30}
                  alt="이미지삭제"
                />
              </button>
            </div>
          ))}
          <Styled.PreviewSection>
            <Image
              src="/icons/add-l-white.svg"
              className="btnUpload"
              width={30}
              height={30}
              alt="사진 업로드 버튼"
            />
            <input
              accept="image/*"
              multiple
              type="file"
              id="file"
              onChange={handleImageUpload}
            />
          </Styled.PreviewSection>
        </Styled.ImageGrid>

        {submitErrMessage && (
          <AlertModal
            message={submitErrMessage}
            onClose={() => setSubmitErrMessage('')}
          />
        )}
      </Styled.SelectContainer>
    </>
  );
};

export default Preview;
