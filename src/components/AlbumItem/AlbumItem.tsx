import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useRef,
} from 'react';

import StyledAlbumItem from '@/components/AlbumItem/StyledAlbumItem';
import EditFeedModal from '@/components/EditFeed/EditFeedModal';
import useAlbumItemLayout from '@/hooks/useAlbumItemLayout';
import useAlbumName from '@/hooks/useAlbumName';
import useModalWithWebView from '@/hooks/useModalWithWebView';

import type { Feed } from '@/types/feed';

function AlbumItem(
  {
    feed,
    index,
    setFeedsData,
  }: {
    feed: Feed;
    index: number;
    setFeedsData: Dispatch<SetStateAction<Feed[]>>;
  },
  ref: ForwardedRef<HTMLLIElement>,
) {
  const liRef = useRef<HTMLLIElement | null>(null);
  const { uid } = useParams();

  const albumName = useAlbumName();
  const { setImgSize, gridRowEnd } = useAlbumItemLayout(liRef.current);
  const {
    isModalOpen: isEditFeedModalOpen,
    openModal: openEditFeedModal,
    closeModal: closeEditFeedModal,
  } = useModalWithWebView();

  return (
    <StyledAlbumItem
      style={
        gridRowEnd ? { gridRowEnd, border: '1px solid var(--gray-100)' } : {}
      }
      ref={(node) => {
        if (node && !liRef.current) {
          liRef.current = node;
        }
        // 레이아웃 계산 후 observe
        if (typeof ref === 'function' && gridRowEnd) {
          ref(node);
        }
      }}
    >
      <Link
        className="album-item-wrap"
        href={`/${uid}/album/${albumName}/feed?start=${index}`}
      >
        <div>
          <strong>{feed.title}</strong>
          {feed.albumType === 'my' && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openEditFeedModal();
              }}
            >
              <Image
                width={20}
                height={20}
                src="/icons/edit.svg"
                alt="수정하기"
              />
            </button>
          )}
        </div>
        <Image
          width={0}
          height={0}
          sizes="(max-width: 430px) calc((100vw - 32px - 24px) / 2), (max-width: 800px) calc((100vw - 48px - 32px) / 2), min(calc((100vw - 48px - 32px) / 3), 315px)"
          src={feed.imageUrl[0]}
          alt=""
          onLoad={(e) =>
            setImgSize({
              width: e.currentTarget.naturalWidth,
              height: e.currentTarget.naturalHeight,
            })
          }
        />
      </Link>

      {isEditFeedModalOpen && (
        <EditFeedModal
          feed={feed}
          closeEditFeedModal={closeEditFeedModal}
          setFeedsData={setFeedsData}
        />
      )}
    </StyledAlbumItem>
  );
}

export default forwardRef(AlbumItem);
