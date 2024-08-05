'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import Album from '@/components/Album/Album';
import StyledH2 from '@/components/CommonStyled/StyledH2';
import ArrayModal from '@/components/Modal/ArrayModal/ArrayModal';
import NewAlbumModal from '@/components/Modal/NewAlbumModal';
import Toast from '@/components/Toast/Toast';
import HomeTopbar from '@/components/Topbar/HomeTopbar/HomeTopbar';
import { StyledMain, StyledHomeSection } from '@/containers/home/StyledHome';
import useWindowWidth from '@/hooks/useWindowWidth';
import { getSharedAlbums } from '@/services/album';

import type AlbumSortOpt from '@/components/Modal/ArrayModal/model';
import type { Album as AlbumType } from '@/types/album';

export default function Home({ album }: { album: AlbumType[] | null }) {
  const [selectedAlbumType, setSelectedAlbumType] = useState<'나의 앨범' | '공유 앨범'>(
    '나의 앨범'
  );
  const [isArrayModalOpen, setIsArrayModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AlbumSortOpt>('latest');
  const [albumData, setAlbumData] = useState<AlbumType[]>(album || []);
  const [sharedAlbums, setSharedAlbums] = useState<AlbumType[]>([]);
  const [error, setError] = useState('');
  const [shouldFetchSharedAlbums, setShouldFetchSharedAlbums] = useState(true);

  useEffect(() => {
    if (!shouldFetchSharedAlbums) {
      return;
    }

    (async () => {
      try {
        const res = await getSharedAlbums();
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error);
        }

        setSharedAlbums(json);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 에러가 발생했습니다');
      }
    })();

    setShouldFetchSharedAlbums(false);
  }, [shouldFetchSharedAlbums]);

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
  const handleOptionClick = (option: AlbumSortOpt) => {
    if (option === selectedOption) {
      return;
    }

    setSelectedOption(option);
    setAlbumData(prev => [prev[0], ...prev.slice(1).reverse()]);
    setSharedAlbums(prev => prev.reverse());
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
        {(!album || error) && <Toast message="데이터를 불러오는 중 에러가 발생했습니다" />}
        <StyledH2 className="album-title">Album</StyledH2>
        <StyledHomeSection>
          <div className="btn-wrap">
            <button
              className={selectedAlbumType === '나의 앨범' ? 'toggle-btn selected' : 'toggle-btn'}
              type="button"
              disabled={selectedAlbumType === '나의 앨범'}
              onClick={changeSelectedAlbumType}
            >
              나의 앨범
            </button>

            <button
              className={selectedAlbumType === '나의 앨범' ? 'toggle-btn' : 'toggle-btn selected'}
              type="button"
              disabled={selectedAlbumType === '공유 앨범'}
              onClick={changeSelectedAlbumType}
            >
              공유 앨범
            </button>
            <button className="sort-btn" type="button" onClick={HandleArrayModal}>
              <Image width={20} height={20} src="/icons/array.svg" alt="정렬방식 아이콘" />
            </button>
            {isArrayModalOpen && (
              <ArrayModal
                selectedOption={selectedOption}
                onOptionClick={handleOptionClick}
                onClose={HandleArrayCloseModal}
              />
            )}
            <button type="button" className="add-btn" onClick={HandleAddModal}>
              <Image width={20} height={20} src="/icons/add.svg" alt="이미지 추가 아이콘" />
            </button>
          </div>
          {selectedAlbumType === '나의 앨범' ? (
            <ul>
              {albumData.map((v, index) => {
                return (
                  <Album
                    key={v.id}
                    album={v}
                    showDeleteButton={index !== 0}
                    albumType="my"
                    setAlbums={setAlbumData}
                    setShouldFetchSharedAlbums={setShouldFetchSharedAlbums}
                  />
                );
              })}
            </ul>
          ) : (
            <ul>
              {sharedAlbums.map(v => {
                return <Album key={v.id} album={v} showDeleteButton={false} albumType="shared" />;
              })}
            </ul>
          )}
          {isAddModalOpen && (
            <NewAlbumModal
              onClose={HandleAddCloseModal}
              setAlbumData={setAlbumData}
              selectedOption={selectedOption}
            />
          )}
        </StyledHomeSection>
      </StyledMain>
    </>
  );
}
