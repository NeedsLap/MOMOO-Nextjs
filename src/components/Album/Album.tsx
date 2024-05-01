import { useEffect, useState } from 'react';

import { AlbumContainer, AlbumLink } from '@/components/Album/StyledAlbum';
import AlbumMoreModal from '@/components/Modal/AlbumMoreModal';
import DeleteAndEditAlbumModal from '@/components/Modal/DeleteAndEditAlbumModal/DeleteAndEditAlbumModal';
import SharingModal from '@/components/Modal/SharingModal/SharingModal';

import { AlbumProps } from '@/components/Album/model';
import type { Album } from '@/types/album';

export default function Album({
  albumData,
  showDeleteButton,
  setSharedAlbums,
  sortOpt,
}: AlbumProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [isShared, setIsShared] = useState(!!albumData.sharedUsers.length);
  const [album, setAlbum] = useState<Album | null>(albumData);

  const HandleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!setSharedAlbums) {
      return;
    }

    if (isShared) {
      setSharedAlbums((prev) => {
        const isAlbum = prev.some((album) => album.id === albumData.id);

        if (isAlbum) {
          return prev;
        }

        const insertIndex = prev.findIndex((album) => {
          if (sortOpt === 'latest') {
            return album.createdTime < albumData.createdTime;
          } else if (sortOpt === 'oldest') {
            return album.createdTime > albumData.createdTime;
          }
          return false;
        });

        if (insertIndex === -1) {
          return [...prev, albumData];
        }

        return [
          ...prev.slice(0, insertIndex),
          albumData,
          ...prev.slice(insertIndex),
        ];
      });
    } else {
      setSharedAlbums((prev) => {
        const indexOfAlbumData = prev.findIndex(
          (album) => album.id === albumData.id,
        );

        if (indexOfAlbumData !== -1) {
          return [
            ...prev.slice(0, indexOfAlbumData),
            ...prev.slice(indexOfAlbumData + 1),
          ];
        }

        return prev;
      });
    }
  }, [isShared]);

  return (
    <>
      {album ? (
        <li>
          <AlbumContainer $imageUrl={album.imageUrl}>
            <AlbumLink
              href={`/${album.user.uid}/album/${encodeURI(album.name)}`}
            >
              <div className="txtWrapper">
                <p className="albumTitle">{album.name}</p>
                <div className="CountWrapper">
                  <p className="albumCount">
                    {album.user
                      ? `${album.user.displayName || album.user.email}님이 생성`
                      : album.feedList.length}
                  </p>
                  {showDeleteButton && (
                    <button
                      type="button"
                      onClick={HandleModal}
                      aria-label="더보기"
                    />
                  )}
                </div>
              </div>
            </AlbumLink>

            {isModalOpen && (
              <AlbumMoreModal
                closeModal={closeMoreModal}
                setIsEditAlbumModalOpen={setIsEditAlbumModalOpen}
                setIsSharingModalOpen={setIsSharingModalOpen}
              />
            )}
            {isEditAlbumModalOpen && (
              <DeleteAndEditAlbumModal
                albumId={album.id}
                albumName={album.name}
                onClose={() => setIsEditAlbumModalOpen(false)}
                setAlbum={setAlbum}
              />
            )}
            {isSharingModalOpen && (
              <SharingModal
                albumId={album.id}
                setIsModalOpen={setIsSharingModalOpen}
                setIsShared={setIsShared}
              />
            )}
          </AlbumContainer>
        </li>
      ) : (
        <></>
      )}
    </>
  );
}
