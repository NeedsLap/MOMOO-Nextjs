import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SyntheticEvent, useState, useEffect, useRef } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Accordion from '@/components/Accordion/Accordion';
import MultipleAccordion from '@/components/Accordion/MultipleAccordion';
import Preview from '@/components/FileUpload/Preview';
import { StyledLoadingComponent } from '@/components/Loading/StyledLodingImg';
import KakaoMap from '@/components/Map/KakaoMap';
import GetAccordionData from '@/components/Upload/GetAccordionData';
import uploadImageToStorage from '@/components/Upload/UploadImageToStorage';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';
import { appFireStore, Timestamp } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';
import useOverlayClose from '@/hooks/dialog/useOverlayClose';
import { useAddFeedIdFromFeedList } from '@/hooks/useUpdateFeedList';
import useUploadFeed from '@/hooks/useUploadFeed';
import {
  closeUploadFeedModal,
  shouldReloadPostData,
} from '@/modules/uploadFeedModal';

import { AccordionDataType, AlbumIdData } from '@/components/Upload/model';

export default function UploadModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { uid } = useAuthState();
  const { albumNameToAdd } = useUploadFeed();

  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [selectedAlbum, setSelectedAlbum] = useState<string[]>(albumNameToAdd);
  const [file, setFile] = useState<File[] | null>(null);
  const [accordionData, setAccordionData] = useState<AccordionDataType>();
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [isPending, setIsPending] = useState(false);
  const getAccordionData = GetAccordionData();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const result = await getAccordionData();

        setAccordionData(result.accordionData || []);
        setAlbumIdData(result.albumIdData || []);
      }
    };
    fetchData();
  }, []);

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  const closeUploadModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    dispatch(closeUploadFeedModal());

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('closeModal');
    }
  };

  useOverlayClose(dialogRef, closeUploadModal);

  const uploadPost = async () => {
    if (file === null) {
      throw new Error('파일이 선택되지 않았습니다.');
    }

    const id = uuidv4();
    const downloadURLs = await uploadImageToStorage(file, `feed/${uid}`, id);
    const uploadData = {
      title,
      text,
      timestamp: Timestamp.now(),
      selectedAddress,
      weatherImage: selectedWeatherImage,
      emotionImage: selectedEmotionImage,
      album: selectedAlbum,
      imageUrl: downloadURLs,
      id,
    };
    await setDoc(doc(appFireStore, uid, uid, 'feed', id), uploadData);
    return id;
  };

  const updateAlbums = async (id: string) => {
    for (const album of selectedAlbum) {
      const selectedAlbumId = albumIdData.find(
        (a) => a.albumName === album,
      )?.docId;
      if (selectedAlbumId) {
        await addFeedIdFromFeedList(id, selectedAlbumId);
      }
    }
  };

  const validateInput = () => {
    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return false;
    }
    if (file === null) {
      alert('사진을 선택해주세요');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validateInput()) return;
    setIsPending(true);

    try {
      if (!uid) throw new Error('사용자가 로그인되지 않았습니다.');
      const id = await uploadPost();
      await updateAlbums(id);
      router.push(`/${uid}/album/${albumNameToAdd[0]}/feed?start=0`);

      closeUploadModal();

      if (decodeURI(path) === `/${uid}/album/${albumNameToAdd[0]}/feed`) {
        dispatch(shouldReloadPostData());
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      closeUploadModal();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Styled.StyledDialog
        ref={(node) => {
          if (node && !dialogRef.current) {
            node.showModal();
            dialogRef.current = node;
          }
        }}
        aria-labelledby="dialog-label"
      >
        <Styled.ContentContainer>
          <h2 className="a11y-hidden">새 게시물 업로드</h2>
          <Styled.UploadHeader>
            <h2>새 게시물</h2>
            <button
              className="uploadBtn"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              업로드
            </button>
          </Styled.UploadHeader>
          <Styled.UploadContents className={isPending ? 'loading' : ''}>
            {isPending ? (
              <StyledLoadingComponent
                src="/icons/loading.svg"
                alt="로딩중"
                width={36}
                height={36}
              />
            ) : (
              <>
                <Styled.TodaysPhoto>
                  <p>오늘의 사진(필수) </p>
                  <span>*10장까지 업로드 가능</span>
                </Styled.TodaysPhoto>
                <Styled.PicSelectPart>
                  <Preview setFile={setFile} />
                </Styled.PicSelectPart>
                <Styled.SelectPart>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      placeholder="제목을 입력해주세요(필수)"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <form className="uploadInfo">
                    <textarea
                      id="uploadText"
                      maxLength={1000}
                      cols={30}
                      rows={10}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        onInputHandler(e);
                      }}
                      placeholder="문구를 입력해주세요"
                    ></textarea>
                    <div className="countText">
                      <span>{inputCount}</span> / 1000 자
                    </div>
                  </form>
                  <Styled.LocationContents onClick={toggleKakaoMap}>
                    <div className="locationHead">
                      {selectedAddress ? (
                        <p>선택한 주소: {selectedAddress}</p>
                      ) : (
                        <h2>위치 추가</h2>
                      )}
                      <Image
                        className={kakaoMapVisible ? 'rotate' : ''}
                        src="/icons/arrow.svg"
                        width={16}
                        height={16}
                        alt={'위치토글아이콘'}
                      ></Image>
                    </div>
                  </Styled.LocationContents>
                  {kakaoMapVisible && (
                    <Styled.KakaoMapContainer>
                      <KakaoMap
                        onAddressSelect={(address) =>
                          handleAddressSelect(address)
                        }
                      />
                    </Styled.KakaoMapContainer>
                  )}
                  <Styled.AccordionContents>
                    {accordionData !== undefined && (
                      <>
                        <MultipleAccordion
                          question={accordionData[0].question}
                          answer={accordionData[0].answer}
                          selectedAlbum={selectedAlbum}
                          setSelectedAlbum={setSelectedAlbum}
                        />
                        <Accordion
                          question={accordionData[1].question}
                          answer={accordionData[1].answer}
                          selectedImages={selectedWeatherImage}
                          setSelectedImages={setSelectedWeatherImage}
                        />
                        <Accordion
                          question={accordionData[2].question}
                          answer={accordionData[2].answer}
                          selectedImages={selectedEmotionImage}
                          setSelectedImages={setSelectedEmotionImage}
                        />
                      </>
                    )}
                  </Styled.AccordionContents>
                </Styled.SelectPart>
              </>
            )}
          </Styled.UploadContents>
          <Styled.CloseBtn
            className="closeBtn"
            onClick={() => closeUploadModal()}
          >
            <Image
              className={kakaoMapVisible ? 'rotate' : ''}
              src="/icons/x-white.svg"
              width={24}
              height={24}
              alt={'닫기'}
            ></Image>
          </Styled.CloseBtn>
        </Styled.ContentContainer>
      </Styled.StyledDialog>
    </>
  );
}
