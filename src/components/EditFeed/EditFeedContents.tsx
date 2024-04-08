import Image from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react';

import Accordion from '@/components/Accordion/Accordion';
import MultipleAccordion from '@/components/Accordion/MultipleAccordion';
import Preview from '@/components/FileUpload/Preview';
import { StyledLoadingImg } from '@/components/Loading/StyledLodingImg';
import KakaoMap from '@/components/Map/KakaoMap';
import Toast from '@/components/Toast/Toast';
import GetAccordionData from '@/components/Upload/GetAccordionData';
import uploadImageToStorage from '@/components/Upload/UploadImageToStorage';
import * as Styled from '@/components/Upload/UploadModal/StyledUploadModal';
import useAuthState from '@/hooks/auth/useAuthState';
import useEditFeed from '@/hooks/useEditFeed';
import useFeedData from '@/hooks/useFeedData';
import useGetSavedAlbumList from '@/hooks/useGetSavedAlbumList';
import {
  useAddFeedIdFromFeedList,
  useRemoveFeedIdFromFeedList,
} from '@/hooks/useUpdateFeedList';
import { deleteImg } from '@/utils/SDKUtils';

import type { Feed, FeedToUpdate } from '@/types/feed';

interface AccordionData {
  question: string;
  answer: string[];
}

interface AlbumIdData {
  albumName: string;
  docId: string;
}

export default function EditFeedContents({
  id,
  close,
  setFeedData,
}: {
  id: string;
  close: () => void;
  setFeedData?: React.Dispatch<SetStateAction<Feed | null>>;
}) {
  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedAlbumList, setSelectedAlbumList] = useState<string[]>([]);
  const [savedAlbumList, setSavedAlbumList] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [file, setFile] = useState<FileList | null>(null);
  const [imgUrlList, setImgUrlList] = useState<string[]>([]);
  const [accordionData, setAccordionData] = useState<AccordionData[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [inputCount, setInputCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const { getFeedData, error } = useFeedData();
  const { user } = useAuthState();
  const getAccordionData = GetAccordionData();
  const editFeed = useEditFeed();
  const getSavedAlbumList = useGetSavedAlbumList();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();

  useEffect(() => {
    const setFeedData = async () => {
      const data = await getFeedData({ id });

      if (data) {
        setTitle(data.title);
        setText(data.text);
        setSelectedAddress(data.selectedAddress);
        setSelectedWeatherImage(data.weatherImage);
        setSelectedEmotionImage(data.emotionImage);
        setImgUrlList(data.imageUrl);
      }
    };

    const setSavedAlbumData = async () => {
      const data = await getSavedAlbumList(id);

      if (data) {
        setSelectedAlbumList(data.map((v) => v.data().name));
        setSavedAlbumList(data.map((v) => v.id));
      }
    };

    const SetAccordionData = async () => {
      const result = await getAccordionData();
      setAccordionData(result.accordionData || []);
      setAlbumIdData(result.albumIdData || []);
    };

    setFeedData();
    setSavedAlbumData();
    SetAccordionData();
  }, []);

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    try {
      setIsPending(true);

      let downloadURLs: string[] = imgUrlList;

      if (file !== null) {
        downloadURLs = await uploadImageToStorage(file, `feed/${user.uid}`, id);
      }

      const editData: FeedToUpdate = {
        imageUrl: downloadURLs,
        title: title,
        text: text,
        selectedAddress: selectedAddress,
        album: selectedAlbumList,
        weatherImage: selectedWeatherImage,
        emotionImage: selectedEmotionImage,
      };

      await editFeed(editData, id);

      selectedAlbumList.forEach(async (selectedAlbumName) => {
        let selectedAlbumId = '';

        for (const iterator of albumIdData) {
          if (selectedAlbumName === iterator.albumName) {
            selectedAlbumId = iterator.docId;
          }
        }

        if (!savedAlbumList.includes(selectedAlbumId)) {
          await addFeedIdFromFeedList(id, selectedAlbumId);
        }
      });

      savedAlbumList.forEach(async (savedAlbumId) => {
        let savedAlbumName = '';

        for (const iterator of albumIdData) {
          if (savedAlbumId === iterator.docId) {
            savedAlbumName = iterator.albumName;
          }
        }

        if (!selectedAlbumList.includes(savedAlbumName)) {
          await removeFeedIdFromFeedList(id, savedAlbumId);
        }
      });

      if (setFeedData) {
        setFeedData((prev) => {
          if (prev) {
            return { ...prev, ...editData };
          } else {
            return null;
          }
        });
      }

      // 이미지 삭제 실패 시, 게시물 수정이 중단되지 않도록 try 마지막에 위치
      if (file !== null) {
        for (let i = downloadURLs.length; i < 3; i++)
          if (!downloadURLs.includes(imgUrlList[i])) {
            await deleteImg(imgUrlList[i]);
          }
      }
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
        <Styled.MobileCloseBtn type="button" onClick={close} aria-label="닫기">
          <Image width={16} height={16} src="/icons/arrow-back.svg" alt="" />
        </Styled.MobileCloseBtn>
        <h2>게시물 수정</h2>
        <button className="uploadBtn" type="submit" onClick={handleSubmit}>
          완료
        </button>
      </Styled.UploadHeader>
      <Styled.UploadContents className={isPending ? 'loading' : ''}>
        {error && <Toast message={error} />}
        {isPending ? (
          <StyledLoadingImg
            src="/icons/loading.svg"
            alt="로딩중"
            width={36}
            height={36}
          />
        ) : (
          <>
            <Styled.TodaysPhoto>
              <p>오늘의 사진 (필수) </p>
              <span>*10장까지 업로드 가능</span>
            </Styled.TodaysPhoto>
            <Styled.PicSelectPart>
              <Preview setFile={setFile} />
            </Styled.PicSelectPart>
            <Styled.SelectPart>
              <div className="inputWrapper">
                <input
                  type="text"
                  placeholder="제목을 입력해 주세요 (필수)"
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
                    alt="위치 토글 아이콘"
                  ></Image>
                </div>
              </Styled.LocationContents>
              {kakaoMapVisible && (
                <Styled.KakaoMapContainer>
                  <KakaoMap
                    onAddressSelect={(address) => handleAddressSelect(address)}
                  />
                </Styled.KakaoMapContainer>
              )}
              <Styled.AccordionContents>
                {accordionData.slice(1, 2).map(() => (
                  <MultipleAccordion
                    key={0}
                    question={accordionData[0].question}
                    answer={accordionData[0].answer.join(',')}
                    selectedAlbum={selectedAlbumList}
                    setSelectedAlbum={setSelectedAlbumList}
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
    </Styled.ContentContainer>
  );
}
