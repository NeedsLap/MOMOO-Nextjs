import Image from 'next/image';
import { useParams } from 'next/navigation';
// import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';

import { DocumentData } from '@firebase/firestore';
// import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';

import Carousel from '@/components/Carousel/Carousel';
import StyledFeedItem from '@/components/FeedItem/StyledFeedItem';
import ChangeAlbumModal from '@/components/Modal/ChangeAlbumModal/ChangeAlbumModal';
import DeleteFeedModal from '@/components/Modal/DeleteFeedModal';
import FeedMoreModal from '@/components/Modal/FeedMoreModal';
import useAuthState from '@/hooks/auth/useAuthState';
// import useGetFeedData from '@/hooks/useGetFeedData';

// import { ReduxState } from '@/modules/model';

function FeedItem(
  { feed }: { feed: DocumentData },
  ref: ForwardedRef<HTMLLIElement>,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeAlbumModalOpen, setChangeAlbumModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(feed);
  const { uid } = useParams<{
    uid: string;
    albumName: string;
  }>();

  useEffect(() => {
    setFeedData((prev) => prev);
  }, []);

  const { user } = useAuthState();
  // const isEditFeedModalOpen = useSelector(
  //   (state: ReduxState) => state.editFeedModal.isEditFeedModalOpen,
  // );
  // const getFeedData = useGetFeedData();

  const getFormattedDateFromTimestamp = (timestamp: Timestamp) => {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
    );
    const formattedDate = new Date(date.setHours(date.getHours() - 12))
      .toISOString()
      .slice(0, 10);

    return formattedDate;
  };
  const formattedDate = useMemo(
    () => feedData && getFormattedDateFromTimestamp(feedData.timestamp),
    [feedData],
  );

  // useEffect(() => {
  //   // 피드 수정 후 리렌더링
  //   if (isEditFeedModalOpen) {
  //     return;
  //   }

  //   const setData = async () => {
  //     const feedData = await getFeedData(id, uid);

  //     if (feedData) {
  //       setFeedData(feedData);

  //       const date = new Date(feedData.timestamp.toDate());
  //       const time = new Date(date.setHours(date.getHours() + 9))
  //         .toISOString()
  //         .slice(0, 10);

  //       setTime(time);
  //     } else {
  //       setFeedData(null);
  //     }
  //   };

  //   setData();
  // }, [isEditFeedModalOpen]);

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
    setIsModalOpen(false);
  };

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {!feedData ? (
        <></>
      ) : (
        <StyledFeedItem ref={ref}>
          <Carousel imgUrlList={feedData.imageUrl}></Carousel>
          <section className="contentsSection">
            {(feedData.emotionImage || feedData.weatherImage) && (
              <div className="iconSection">
                {feedData.emotionImage && (
                  <Image
                    width={36}
                    height={36}
                    className="emotion"
                    src={feedData.emotionImage}
                    alt="오늘의 기분"
                  />
                )}
                {feedData.weatherImage && (
                  <Image
                    width={36}
                    height={36}
                    className="weather"
                    src={feedData.weatherImage}
                    alt="오늘의 날씨"
                  />
                )}
              </div>
            )}
            {uid === user.uid && (
              <button
                className="more"
                type="button"
                onClick={handleSeeMoreClick}
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/more.svg"
                  alt="더보기 버튼"
                />
              </button>
            )}
          </section>
          <strong className="tit">{feedData.title}</strong>
          {feedData.text && typeof feedData.text === 'string' && (
            <p className="detailText">
              {feedData.text.split('\n').map((v, i) => {
                if (i === 0) {
                  return v;
                } else {
                  return (
                    <>
                      <br />
                      {v}
                    </>
                  );
                }
              })}
            </p>
          )}
          <div className="time-wrap">
            {formattedDate && (
              <>
                <Image
                  width={16}
                  height={16}
                  src="/icons/calendar.svg"
                  alt="저장일"
                />
                <time dateTime={formattedDate} className="date">
                  {formattedDate.replace(/-/gi, '.')}
                </time>
              </>
            )}
            {feedData.selectedAddress && (
              <>
                <Image
                  width={16}
                  height={16}
                  src="/icons/location.svg"
                  alt="위치"
                  className="location-img"
                />
                <p className="locationSection">{feedData.selectedAddress}</p>
              </>
            )}
          </div>
          {isModalOpen && (
            <FeedMoreModal
              setDeleteModalOpen={setDeleteModalOpen}
              setChangeAlbumModalOpen={setChangeAlbumModalOpen}
              closeModal={closeMoreModal}
            />
          )}
          {deleteModalOpen && (
            <DeleteFeedModal
              onClose={handleDeleteCloseModal}
              imgUrlList={feedData.imageUrl}
            />
          )}
          {changeAlbumModalOpen && (
            <ChangeAlbumModal onClose={handleChangeAlbumModal} />
          )}
        </StyledFeedItem>
      )}
    </>
  );
}

export default forwardRef(FeedItem);
