import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState, useEffect, useRef } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Accordion from '@/components/Accordion/Accordion';
import MultipleAccordion from '@/components/Accordion/MultipleAccordion';
import Preview from '@/components/FileUpload/Preview';
import { StyledLoadingImg } from '@/components/Loading/StyledLodingImg';
import KakaoMap from '@/components/Map/KakaoMap';
import GetAccordionData from '@/components/Upload/GetAccordionData';
import uploadImageToStorage from '@/components/Upload/UploadImageToStorage';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';
import { appFireStore, Timestamp } from '@/firebase/config';
import useAuthState from '@/hooks/auth/useAuthState';
import useOverlayClose from '@/hooks/dialog/useOverlayClose';
import { useAddFeedIdFromFeedList } from '@/hooks/useUpdateFeedList';
import useUploadFeed from '@/hooks/useUploadFeed';
import { closeUploadFeedModal } from '@/modules/uploadFeedModal';

interface accordionData {
  question: string;
  answer: string[];
}

interface AlbumIdData {
  albumName: string;
  docId: string;
}

function UploadModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuthState();
  const { albumNameToAdd, isUploadFeedModalOpen } = useUploadFeed();

  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [selectedAlbum, setSelectedAlbum] = useState<string[]>(albumNameToAdd);
  const [file, setFile] = useState<FileList | null>(null);
  const [accordionData, setAccordionData] = useState<accordionData[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [isPending, setIsPending] = useState(false);
  const getAccordionData = GetAccordionData();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
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

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  useEffect(() => {
    if (isUploadFeedModalOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isUploadFeedModalOpen]);

  const closeUploadModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    dispatch(closeUploadFeedModal());
  };

  useOverlayClose(dialogRef, closeUploadModal);

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    if (file === null) {
      alert('사진을 선택해주세요');
      return;
    }

    setIsPending(true);

    try {
      if (user) {
        const id = uuidv4();
        const userDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

        const downloadURLs = await uploadImageToStorage(
          file,
          `feed/${user.uid}`,
          id,
        );

        const uploadData = {
          title: title,
          text: text,
          timestamp: Timestamp.now(),
          selectedAddress: selectedAddress,
          weatherImage: selectedWeatherImage,
          emotionImage: selectedEmotionImage,
          album: selectedAlbum,
          imageUrl: downloadURLs,
          id: id,
        };

        await setDoc(userDocRef, uploadData);
        router.push(
          `${user.uid}/${
            selectedAlbum.includes(albumNameToAdd[1])
              ? albumNameToAdd[1]
              : albumNameToAdd[0]
          }/p/${id}`,
        );
        closeUploadModal();

        try {
          selectedAlbum.forEach(async (album) => {
            let selectedAlbumId = '';
            for (const iterator of albumIdData) {
              if (album === iterator.albumName) {
                selectedAlbumId = iterator.docId;
              }
            }

            await addFeedIdFromFeedList(id, selectedAlbumId);
          });
        } catch (error) {
          console.error(
            '앨범 데이터를 업데이트하는 중 오류가 발생했습니다.',
            error,
          );
        }
      } else {
        console.error('사용자가 로그인되지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
    }

    setIsPending(false);
  };

  return (
    <>
      <Styled.StyledDialog
        className={isPending ? 'loading' : ''}
        ref={dialogRef}
        aria-labelledby="dialog-label"
      >
        <div>
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
          <Styled.UploadContents>
            {isPending ? (
              <StyledLoadingImg
                src="/icons/loading.svg"
                alt="로딩중"
                width={36}
                height={36}
              />
            ) : (
              <>
                <Styled.PicSelectPart>
                  <Preview setFile={setFile} />
                </Styled.PicSelectPart>
                <Styled.SelectPart>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      placeholder="제목을 입력해주세요 (필수)"
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
                    {accordionData.slice(1, 2).map(() => (
                      <MultipleAccordion
                        key={0}
                        question={accordionData[0].question}
                        answer={accordionData[0].answer.join(',')}
                        selectedAlbum={selectedAlbum}
                        setSelectedAlbum={setSelectedAlbum}
                      />
                    ))}
                    {accordionData.slice(1, 3).map((data, index) => (
                      <Accordion
                        key={index}
                        question={data.question}
                        answer={data.answer.join(',')}
                        selectedImages={
                          data.question === '오늘의 날씨'
                            ? selectedWeatherImage
                            : selectedEmotionImage
                        }
                        setSelectedImages={
                          data.question === '오늘의 날씨'
                            ? setSelectedWeatherImage
                            : setSelectedEmotionImage
                        }
                      />
                    ))}
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
        </div>
      </Styled.StyledDialog>
    </>
  );
}

export default UploadModal;
