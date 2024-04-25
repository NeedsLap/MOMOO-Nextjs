import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';

const uploadImageToStorage = async (
  files: File[],
  folderName: string,
  feedId: string,
) => {
  const storage = getStorage();
  const downloadURLs: string[] = files.map(() => '');
  const uploadPromises = files.map((file, i) => {
    const storageRef = ref(storage, `${folderName}/${feedId}${i}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('이미지 업로드 오류:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            downloadURLs[i] = downloadURL;

            resolve(undefined);
          } catch (error) {
            console.error('다운로드 URL 가져오기 오류:', error);
            reject(error);
          }
        },
      );
    });
  });

  await Promise.all(uploadPromises);

  return downloadURLs;
};

export default uploadImageToStorage;
