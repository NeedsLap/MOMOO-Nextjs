import { useState } from 'react';

import { AlbumContainer, AlbumLink } from '@/components/Album/StyledAlbum';
import AlbumMoreModal from '@/components/Modal/AlbumMoreModal';
import DeleteAndEditAlbumModal from '@/components/Modal/DeleteAndEditAlbumModal/DeleteAndEditAlbumModal';
import SharingModal from '@/components/Modal/SharingModal/SharingModal';

import AlbumProps from '@/components/Album/model';

export default function Album({
  album,
  showDeleteButton,
  albumType,
  setAlbums,
  setShouldFetchSharedAlbums
}: AlbumProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [isShared, setIsShared] = useState(!!album.sharedUsers.length);

  const HandleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li>
      <AlbumContainer $imageUrl={album.imageUrl}>
        <AlbumLink href={`/${album.user.uid}/album/${encodeURI(album.name)}`}>
          <div className="txtWrapper">
            <p className="albumTitle">{album.name}</p>
            <div className="CountWrapper">
              <p className="albumCount">
                {albumType === 'my'
                  ? album.feedList.length
                  : `${`${album.user.displayName}님이` || `${album.user.email}님이` || '내가'} 생성`}
              </p>
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
        {setAlbums && isEditAlbumModalOpen && (
          <DeleteAndEditAlbumModal
            albumId={album.id}
            albumName={album.name}
            onClose={() => setIsEditAlbumModalOpen(false)}
            setAlbums={setAlbums}
          />
        )}
        {setShouldFetchSharedAlbums && isSharingModalOpen && (
          <SharingModal
            albumId={album.id}
            isShared={isShared}
            setIsShared={setIsShared}
            setIsModalOpen={setIsSharingModalOpen}
            setShouldFetchSharedAlbums={setShouldFetchSharedAlbums}
          />
        )}
      </AlbumContainer>
    </li>
  );
}
