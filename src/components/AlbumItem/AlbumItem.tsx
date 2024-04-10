import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';

import StyledAlbumItem from '@/components/AlbumItem/StyledAlbumItem';
import EditFeedModal from '@/components/EditFeed/EditFeedModal';
import useAuthState from '@/hooks/auth/useAuthState';
import useAlbumItemLayout from '@/hooks/useAlbumItemLayout';
import useAlbumName from '@/hooks/useAlbumName';
import useModalWithWebView from '@/hooks/useModalWithWebView';
import useWindowWidth from '@/hooks/useWindowWidth';

import type { Feed as FeedType } from '@/types/feed';

function AlbumItem(
  { feed, index }: { feed: FeedType; index: number },
  ref: ForwardedRef<HTMLLIElement>,
) {
  const [feedData, setFeedData] = useState<FeedType | null>(feed);

  const liRef = useRef<HTMLLIElement | null>(null);
  const { uid } = useParams();

  const windowWidth = useWindowWidth();
  const { user } = useAuthState();
  const albumName = useAlbumName();
  const { setImgSize, gridRowEnd } = useAlbumItemLayout(liRef.current);
  const {
    isModalOpen: isEditFeedModalOpen,
    openModal: openEditFeedModal,
    closeModal: closeEditFeedModal,
  } = useModalWithWebView();

  const showHoverStyle = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    if (e.currentTarget.firstElementChild) {
      e.currentTarget.firstElementChild.className = 'hover-wrap';
    }
  };

  const hiddenHoverStyle = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    if (e.currentTarget.firstElementChild) {
      e.currentTarget.firstElementChild.className = 'a11y-hidden';
    }
  };

  return (
    <>
      {feedData ? (
        <StyledAlbumItem
          key={feedData.id}
          style={
            gridRowEnd
              ? { gridRowEnd, border: '1px solid var(--gray-100)' }
              : {}
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
            href={`/${uid}/${albumName}/feed?start=${index}`}
            onMouseOver={showHoverStyle}
            onFocus={showHoverStyle}
            onMouseLeave={hiddenHoverStyle}
            onBlur={hiddenHoverStyle}
          >
            <div className="a11y-hidden">
              <strong>{feedData.title}</strong>
              {uid === user?.uid && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();

                    if (!windowWidth) {
                      return;
                    }

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
              // 최대 width 지정으로 변경 고려
              sizes="(max-width: 430px) calc((100vw - 32px - 24px) / 2), (max-width: 800px) calc((100vw - 48px - 32px) / 2), min(calc((100vw - 48px - 32px) / 3), 315px)"
              src={feedData.imageUrl[0]}
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
              id={feedData.id}
              closeEditFeedModal={closeEditFeedModal}
              setFeedData={setFeedData}
            />
          )}
        </StyledAlbumItem>
      ) : (
        <></>
      )}
    </>
  );
}

export default forwardRef(AlbumItem);
