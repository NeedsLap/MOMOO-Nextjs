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
import useWindowWidth from '@/hooks/useWindowWidth';

export default function Home(props: { album: DocumentData[] }) {
  const [isArrayModalOpen, setIsArrayModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  return (
    <>
      {windowWidth && windowWidth <= 430 && <HomeTopbar />}
      <StyledMain>
        <StyledH2 className="album-title">Album</StyledH2>
        <StyledHomeSection>
          <div className="btn-wrap">
            <button type="button" onClick={HandleArrayModal}>
              <Image
                width={20}
                height={20}
                src="/icons/array.svg"
                alt="정렬방식 아이콘"
              />
            </button>
            <button type="button" onClick={HandleAddModal}>
              <Image
                width={20}
                height={20}
                src="/icons/add.svg"
                alt="이미지 추가 아이콘"
              />
            </button>
          </div>
          <ul>
            {(selectedOption === 'oldest' ? props.album : latestAlbumList).map(
              (v, index) => {
                return (
                  <li key={v.name}>
                    <Album albumData={v} showDeleteButton={index !== 0} />
                  </li>
                );
              },
            )}
          </ul>
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
