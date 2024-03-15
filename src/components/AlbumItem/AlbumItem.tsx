import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ForwardedRef, forwardRef, useRef } from 'react';

import { DocumentData } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import StyledAlbumItem from '@/components/AlbumItem/StyledAlbumItem';
import useAuthState from '@/hooks/auth/useAuthState';
import useAlbumItemLayout from '@/hooks/useAlbumItemLayout';
import useAlbumName from '@/hooks/useAlbumName';
import useWindowWidth from '@/hooks/useWindowWidth';
import { openEditFeedModal } from '@/modules/editFeedModal';

function AlbumItem(
  { feedData }: { feedData: DocumentData },
  ref: ForwardedRef<HTMLLIElement>,
) {
  const windowWidth = useWindowWidth();
  const { user } = useAuthState();
  const albumName = useAlbumName();
  const liRef = useRef<HTMLLIElement | null>(null);
  const { setImgSize } = useAlbumItemLayout(liRef.current);

  const router = useRouter();
  const { uid } = useParams();
  const dispatch = useDispatch();
  const setEditFeedContext = (feedId: string) => {
    dispatch(openEditFeedModal(feedId));
  };

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
    <StyledAlbumItem
      key={feedData.id}
      ref={(node) => {
        if (node && !liRef.current) {
          liRef.current = node;
        }

        return ref;
      }}
    >
      <Link
        href={`/${uid}/${albumName}/feed/${feedData.id}`}
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

                if (windowWidth > 430) {
                  setEditFeedContext(feedData.id);
                } else {
                  router.push(`/edit/${albumName}`);
                }
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
    </StyledAlbumItem>
  );
}

export default forwardRef(AlbumItem);
