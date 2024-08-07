import Image from 'next/image';
import { useState, SetStateAction, Dispatch } from 'react';

import * as Styled from '@/components/FileUpload/StyledPreview';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';

export default function Preview({
  setFile,
  imageList,
  setImageList
}: {
  setFile: Dispatch<SetStateAction<File[] | null>>;
  imageList: string[];
  setImageList: Dispatch<SetStateAction<string[]>>;
}) {
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const setImages = async (files: FileList) => {
    if (files) {
      if (files.length + imageList.length <= 10) {
        const fileArray = Array.from(files);
        const newImages: string[] = [...imageList];

        fileArray.forEach(file => {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        });

        setImageList(newImages);
        setFile(prev => {
          if (prev) {
            return [...prev, ...files];
          }
          return [...files];
        });
      } else {
        setSubmitErrMessage('최대 10장의 이미지까지만 선택할 수 있습니다.');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const valid = ![...files].some(file => {
        if (!/^image\/(jpg|svg(\+xml)?|png|jpeg|gif|bmp|tif|heic|webp)$/.test(file.type)) {
          return true;
        }

        if (file.size > 10 * 1024 * 1024) {
          return true;
        }

        return false;
      });

      if (!valid) {
        setSubmitErrMessage(
          '이미지 파일 확장자는 jpg, svg, png, jpeg, gif, bmp, tif, heic, webp만 가능합니다.'
        );
        return;
      }

      setImages(files);
    } else {
      setSubmitErrMessage('이미지 파일을 선택해 주세요.');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageList(currentImgList => currentImgList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Styled.SelectContainer>
      <Styled.ImageGrid>
        {imageList.map((image, index) => (
          <div key={image} className="selectedImgList">
            <Image width={430} height={430} className="selectedImg" src={image} alt="이미지" />
            <button type="button" className="deleteBtn" onClick={() => handleRemoveImage(index)}>
              <Image
                src="/icons/x-white.svg"
                className="deleteBtnImg"
                width={30}
                height={30}
                alt="이미지 삭제"
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
            onClick={e => {
              (e.currentTarget as HTMLInputElement).value = '';
            }}
            onChange={handleImageUpload}
          />
        </Styled.PreviewSection>
      </Styled.ImageGrid>

      {submitErrMessage && (
        <AlertModal message={submitErrMessage} onClose={() => setSubmitErrMessage('')} />
      )}
    </Styled.SelectContainer>
  );
}
