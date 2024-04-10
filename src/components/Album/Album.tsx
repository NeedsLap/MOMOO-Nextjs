import { useState } from 'react';

import { DocumentData } from 'firebase/firestore';

import { AlbumContainer, AlbumLink } from '@/components/Album/StyledAlbum';
import AlbumMoreModal from '@/components/Modal/AlbumMoreModal';
import DeleteAlbumModal from '@/components/Modal/DeleteAlbumModal/DeleteAlbumModal';
import SharingModal from '@/components/Modal/SharingModal/SharingModal';
import useAuthState from '@/hooks/auth/useAuthState';

interface AlbumProps {
  albumData: DocumentData;
  showDeleteButton: boolean;
}

const Album = ({ albumData, showDeleteButton }: AlbumProps) => {
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
    <AlbumContainer $imageUrl={albumData.imageUrl}>
      <AlbumLink href={`/${albumData.uid || user.uid}/${albumData.name}`}>
        <div className="txtWrapper">
          <p className="albumTitle">{albumData.name}</p>
          <div className="CountWrapper">
            <p className="albumCount">{albumData.feedList.length}</p>
            {showDeleteButton && (
              <button type="button" onClick={HandleModal} aria-label="더보기" />
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
        <DeleteAlbumModal
          albumId={albumData.id}
          albumName={albumData.name}
          onClose={() => setIsEditAlbumModalOpen(false)}
        />
      )}
      {isSharingModalOpen && (
        <SharingModal
          albumId={albumData.id}
          closeModal={() => setIsSharingModalOpen(false)}
        />
      )}
    </AlbumContainer>
  );
};
export default Album;
