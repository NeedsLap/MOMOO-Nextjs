import { useState } from 'react';

export default function useProfileImg(photoURL?: string) {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState(photoURL || '');
  const [error, setError] = useState('');

  const setProfileImg = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const fileToChange = files[0];

    if (!/^image\/(jpg|png|jpeg|bmp|tif|heic)$/.test(fileToChange.type)) {
      setError(
        '이미지 파일 확장자는 jpg, png, jpeg, bmp, tif, heic만 가능합니다.',
      );
      return;
    }

    if (fileToChange.size > 10 * 1024 * 1024) {
      setError('이미지 용량은 10MB 이내로 등록 가능합니다.');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(fileToChange);
    setFile(fileToChange);

    reader.addEventListener('load', ({ target }) => {
      if (typeof target?.result !== 'string') {
        return;
      }

      const image = new Image();
      image.src = target.result;
      setSrc(target.result);
    });
  };

  return { setProfileImg, file, setFile, src, setSrc, error, setError };
}
