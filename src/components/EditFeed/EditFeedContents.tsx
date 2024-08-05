import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Accordion from '@/components/Accordion/Accordion';
import MultipleAccordion from '@/components/Accordion/MultipleAccordion';
import Preview from '@/components/FileUpload/Preview';
import { StyledLoadingImg } from '@/components/Loading/StyledLodingImg';
import KakaoMap from '@/components/Map/KakaoMap';
import GetAccordionData from '@/components/Upload/GetAccordionData';
import uploadImageToStorage from '@/components/Upload/UploadImageToStorage';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';
import useScrollLockForDimmed from '@/hooks/dialog/useScrollLockForDimmed';
import useAlbumName from '@/hooks/useAlbumName';
import useEditFeed from '@/hooks/useEditFeed';
import useGetSavedAlbumList from '@/hooks/useGetSavedAlbumList';
import { useAddFeedIdFromFeedList, useRemoveFeedIdFromFeedList } from '@/hooks/useUpdateFeedList';
import { deleteImg } from '@/utils/SDKUtils';

import { AccordionDataType, AlbumIdData } from '@/components/Upload/model';
import { ReduxState } from '@/modules/model';
import type { Feed, FeedBase } from '@/types/feed';

export default function EditFeedContents({
  feed,
  close,
  setFeedsData
}: {
  feed: Feed;
  close: () => void;
  setFeedsData: Dispatch<SetStateAction<Feed[]>>;
}) {
  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState(feed.title);
  const [text, setText] = useState(feed.text);
  const [selectedAlbumList, setSelectedAlbumList] = useState<string[]>([]);
  const [savedAlbumList, setSavedAlbumList] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(feed.selectedAddress);
  const [selectedWeatherImage, setSelectedWeatherImage] = useState(feed.weatherImage);
  const [selectedEmotionImage, setSelectedEmotionImage] = useState(feed.emotionImage);
  const [file, setFile] = useState<File[] | null>(null);
  const [imageList, setImageList] = useState<string[]>(feed.imageUrl);
  const [accordionData, setAccordionData] = useState<AccordionDataType>();
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [inputCount, setInputCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  useScrollLockForDimmed();
  const albumName = useAlbumName();
  const user = useSelector((state: ReduxState) => state.auth.user);
  const editFeed = useEditFeed();
  const getSavedAlbumList = useGetSavedAlbumList();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();

  const getAccordionData = GetAccordionData();

  useEffect(() => {
    const setSavedAlbumData = async () => {
      const userAlbumList = await getSavedAlbumList(feed.id);

      if (userAlbumList) {
        setSelectedAlbumList(userAlbumList.map(v => v.data().name));
        setSavedAlbumList(userAlbumList.map(v => v.id));
      }
    };

    const SetAccordionData = async () => {
      const result = await getAccordionData();
      setAccordionData(result.accordionData || []);
      setAlbumIdData(result.albumIdData || []);
    };

    setSavedAlbumData();
    SetAccordionData();
  }, []);

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    try {
      setIsPending(true);

      const downloadURLs: string[] = [];

      if (file !== null) {
        const newUrls = await uploadImageToStorage(file, `feed/${user.uid}`, feed.id);
        downloadURLs.push(...imageList.slice(0, imageList.length - file.length), ...newUrls);
      } else {
        downloadURLs.push(...imageList);
      }

      const editData: FeedBase = {
        imageUrl: downloadURLs,
        title,
        text,
        selectedAddress,
        weatherImage: selectedWeatherImage,
        emotionImage: selectedEmotionImage
      };

      await editFeed(editData, feed.id);

      selectedAlbumList.forEach(async selectedAlbumName => {
        let selectedAlbumId = '';

        albumIdData.forEach(iterator => {
          if (selectedAlbumName === iterator.albumName) {
            selectedAlbumId = iterator.docId;
          }
        });

        if (!savedAlbumList.includes(selectedAlbumId)) {
          await addFeedIdFromFeedList(feed.id, selectedAlbumId);
        }
      });

      savedAlbumList.forEach(async savedAlbumId => {
        let savedAlbumName = '';

        albumIdData.forEach(iterator => {
          if (savedAlbumId === iterator.docId) {
            savedAlbumName = iterator.albumName;
          }
        });

        if (!selectedAlbumList.includes(savedAlbumName)) {
          await removeFeedIdFromFeedList(feed.id, savedAlbumId);
        }
      });

      if (selectedAlbumList.includes(albumName)) {
        setFeedsData(prev => prev.map(v => (v.id === feed.id ? { ...v, ...editData } : v)));
      } else {
        setFeedsData(prev => prev.filter(v => v.id !== feed.id));
      }

      // 이미지 삭제 실패 시, 게시물 수정이 중단되지 않도록 try 마지막에 위치
      if (file !== null) {
        const deleteFeedImgsPromises = downloadURLs
          .slice(feed.imageUrl.length)
          .map(async (_, i) => deleteImg(feed.imageUrl[i]));
        await Promise.all(deleteFeedImgsPromises);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setIsPending(false);
    close();
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  return (
    <Styled.ContentContainer>
      <Styled.UploadHeader>
        <h2>게시물 수정</h2>
        <button className="uploadBtn" type="submit" onClick={handleSubmit}>
          완료
        </button>
      </Styled.UploadHeader>
      <Styled.UploadContents className={isPending ? 'loading' : ''}>
        {isPending ? (
          <StyledLoadingImg src="/icons/loading.svg" alt="로딩중" width={36} height={36} />
        ) : (
          <>
            <Styled.TodaysPhoto>
              <p>오늘의 사진 (필수) </p>
              <span>*10장까지 업로드 가능</span>
            </Styled.TodaysPhoto>
            <Styled.PicSelectPart>
              <Preview setFile={setFile} setImageList={setImageList} imageList={imageList} />
            </Styled.PicSelectPart>
            <Styled.SelectPart>
              <div className="inputWrapper">
                <input
                  type="text"
                  placeholder="제목을 입력해 주세요 (필수)"
                  value={title}
                  onChange={e => {
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
                  onChange={e => {
                    setText(e.target.value);
                    onInputHandler(e);
                  }}
                  placeholder="문구를 입력해 주세요"
                />
                <div className="countText">
                  <span>{inputCount}</span> / 1000 자
                </div>
              </form>
              <Styled.LocationContents onClick={toggleKakaoMap}>
                <div className="locationHead">
                  {selectedAddress ? <p>선택한 주소: {selectedAddress}</p> : <h2>위치 추가</h2>}
                  <Image
                    className={kakaoMapVisible ? 'rotate' : ''}
                    src="/icons/arrow.svg"
                    width={16}
                    height={16}
                    alt="위치 토글 아이콘"
                  />
                </div>
              </Styled.LocationContents>
              {kakaoMapVisible && (
                <Styled.KakaoMapContainer>
                  <KakaoMap onAddressSelect={address => handleAddressSelect(address)} />
                </Styled.KakaoMapContainer>
              )}
              <Styled.AccordionContents>
                {accordionData !== undefined && (
                  <>
                    <MultipleAccordion
                      question={accordionData[0].question}
                      answer={accordionData[0].answer}
                      selectedAlbum={selectedAlbumList}
                      setSelectedAlbum={setSelectedAlbumList}
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
    </Styled.ContentContainer>
  );
}
