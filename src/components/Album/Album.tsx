import { useState } from 'react';

import { AlbumContainer, AlbumLink } from '@/components/Album/StyledAlbum';
import AlbumMoreModal from '@/components/Modal/AlbumMoreModal';
import DeleteAndEditAlbumModal from '@/components/Modal/DeleteAndEditAlbumModal/DeleteAndEditAlbumModal';
import SharingModal from '@/components/Modal/SharingModal/SharingModal';
import useAuthState from '@/hooks/auth/useAuthState';

import type { Album } from '@/types/album';

interface AlbumProps {
  albumData: Album;
  showDeleteButton: boolean;
}

export default function Album({ albumData, showDeleteButton }: AlbumProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [album, setAlbum] = useState<Album | null>(albumData);

  const { uid } = useAuthState();

  const HandleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {album ? (
        <li>
          <AlbumContainer $imageUrl={album.imageUrl}>
            <AlbumLink href={`/${album.user?.uid || uid}/album/${album.name}`}>
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
                closeModal={() => setIsSharingModalOpen(false)}
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
