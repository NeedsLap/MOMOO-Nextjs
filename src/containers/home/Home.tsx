'use client';

import Image from 'next/image';
import { useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import Album from '@/components/Album/Album';
import StyledH2 from '@/components/CommonStyled/StyledH2';
import ArrayModal from '@/components/Modal/ArrayModal/ArrayModal';
import NewAlbumModal from '@/components/Modal/NewAlbumModal/NewAlbumModal';
import HomeTopbar from '@/components/Topbar/HomeTopbar/HomeTopbar';
import { StyledMain, StyledHomeSection } from '@/containers/home/StyledHome';
import useGetSharedAlbumsData from '@/hooks/useGetSharedAlbumsData';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function Home(props: { album: DocumentData[] }) {
  const [selectedAlbumType, setSelectedAlbumType] = useState<
    '나의 앨범' | '공유 앨범'
  >('나의 앨범');
  const [isArrayModalOpen, setIsArrayModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { sharedAlbumsData } = useGetSharedAlbumsData();

  const latestAlbumList = [...props.album].reverse();
  const allFeedsAlbumData = latestAlbumList.pop();
  if (allFeedsAlbumData) {
    latestAlbumList.unshift(allFeedsAlbumData);
  }
  const windowWidth = useWindowWidth();

  const HandleArrayModal = () => {
    setIsArrayModalOpen(true);
  };
  const HandleArrayCloseModal = () => {
    setIsArrayModalOpen(false);
  };

  const HandleAddModal = () => {
    setIsAddModalOpen(true);
  };
  const HandleAddCloseModal = () => {
    setIsAddModalOpen(false);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const changeSelectedAlbumType = () => {
    if (selectedAlbumType === '나의 앨범') {
      setSelectedAlbumType('공유 앨범');
    } else {
      setSelectedAlbumType('나의 앨범');
    }
  };

  return (
    <>
      {windowWidth && windowWidth <= 430 && <HomeTopbar />}
      <StyledMain>
        <StyledH2 className="album-title">Album</StyledH2>
        <StyledHomeSection>
          <div className="btn-wrap">
            <button
              className={
                selectedAlbumType === '나의 앨범'
                  ? 'toggle-btn selected'
                  : 'toggle-btn'
              }
              type="button"
              disabled={selectedAlbumType === '나의 앨범'}
              onClick={changeSelectedAlbumType}
            >
              나의 앨범
            </button>

            <button
              className={
                selectedAlbumType === '나의 앨범'
                  ? 'toggle-btn'
                  : 'toggle-btn selected'
              }
              type="button"
              disabled={selectedAlbumType === '공유 앨범'}
              onClick={changeSelectedAlbumType}
            >
              공유 앨범
            </button>
            <button
              className="sort-btn"
              type="button"
              onClick={HandleArrayModal}
            >
              <Image
                width={20}
                height={20}
                src="/icons/array.svg"
                alt="정렬방식 아이콘"
              />
            </button>
            <button type="button" className="add-btn" onClick={HandleAddModal}>
              <Image
                width={20}
                height={20}
                src="/icons/add.svg"
                alt="이미지 추가 아이콘"
              />
            </button>
          </div>
          {selectedAlbumType === '나의 앨범' ? (
            <ul>
              {(selectedOption === 'oldest'
                ? props.album
                : latestAlbumList
              ).map((v, index) => {
                return (
                  <li key={`${v.name}-${index}`}>
                    <Album albumData={v} showDeleteButton={index !== 0} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul>
              {(selectedOption === 'oldest'
                ? sharedAlbumsData
                : sharedAlbumsData.reverse()
              ).map((v, index) => {
                return (
                  <li key={v.createdTime}>
                    <Album albumData={v} showDeleteButton={index !== 0} />
                  </li>
                );
              })}
            </ul>
          )}
          {isAddModalOpen && <NewAlbumModal onClose={HandleAddCloseModal} />}
          {isArrayModalOpen && (
            <ArrayModal
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
              onClose={HandleArrayCloseModal}
            />
          )}
        </StyledHomeSection>
      </StyledMain>
    </>
  );
}
