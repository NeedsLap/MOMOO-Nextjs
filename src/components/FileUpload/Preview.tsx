import Image from 'next/image';
import { useState, SetStateAction, Dispatch } from 'react';

import * as Styled from '@/components/FileUpload/StyledPreview';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';

export default function Preview({
  setFile,
  imgUrlList = [],
}: {
  setFile: Dispatch<SetStateAction<File[] | null>>;
  imgUrlList?: string[];
}) {
  const [imageList, setImageList] = useState<string[]>(imgUrlList);
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      let valid = true;

      for (const file of files) {
        if (
          !/^image\/(jpg|svg(\+xml)?|png|jpeg|gif|bmp|tif|heic|webp)$/.test(
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
          '이미지 파일 확장자는 jpg, svg, png, jpeg, gif, bmp, tif, heic, webp만 가능합니다.',
        );
        return;
      }

      setImages(files);
    } else {
      setSubmitErrMessage('이미지 파일을 선택해주세요.');
    }
  };

  const setImages = async (files: FileList) => {
    if (files) {
      if (files.length + imageList.length <= 10) {
        const fileArray = Array.from(files);
        const newImages: string[] = [...imageList];

        for (const file of fileArray) {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        }

        setImageList(newImages);
        setFile((prev) => {
          if (prev) {
            return [...prev, ...files];
          } else {
            return [...files];
          }
        });
      } else {
        setSubmitErrMessage('최대 10장의 이미지까지만 선택할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
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
              onClick={(e) =>
                ((e.currentTarget as HTMLInputElement).value = '')
              }
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
}
