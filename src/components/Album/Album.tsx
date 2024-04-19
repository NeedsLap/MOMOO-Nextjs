import { Dispatch, SetStateAction, useState } from 'react';

import { AlbumContainer, AlbumLink } from '@/components/Album/StyledAlbum';
import AlbumMoreModal from '@/components/Modal/AlbumMoreModal';
import DeleteAndEditAlbumModal from '@/components/Modal/DeleteAndEditAlbumModal/DeleteAndEditAlbumModal';
import SharingModal from '@/components/Modal/SharingModal/SharingModal';
import useAuthState from '@/hooks/auth/useAuthState';

import type { Album } from '@/types/album';

interface AlbumProps {
  index: number;
  albumData: Album;
  setAlbumsData: Dispatch<SetStateAction<Album[]>>;
  showDeleteButton: boolean;
}

export default function Album({
  index,
  albumData,
  setAlbumsData,
  showDeleteButton,
}: AlbumProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);

  const { user } = useAuthState();

  const HandleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li>
      <AlbumContainer $imageUrl={albumData.imageUrl}>
        <AlbumLink
          href={`/${albumData.uid || user.uid}/album/${albumData.name}`}
        >
          <div className="txtWrapper">
            <p className="albumTitle">{albumData.name}</p>
            <div className="CountWrapper">
              <p className="albumCount">{albumData.feedList.length}</p>
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
            albumId={albumData.id}
            albumName={albumData.name}
            onClose={() => setIsEditAlbumModalOpen(false)}
            setAlbumsData={setAlbumsData}
            index={index}
          />
        )}
        {isSharingModalOpen && (
          <SharingModal
            albumId={albumData.id}
            closeModal={() => setIsSharingModalOpen(false)}
          />
        )}
      </AlbumContainer>
    </li>
  );
}
