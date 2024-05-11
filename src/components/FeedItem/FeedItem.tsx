import Image from 'next/image';
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import Carousel from '@/components/Carousel/Carousel';
import EditFeedModal from '@/components/EditFeed/EditFeedModal';
import StyledFeedItem from '@/components/FeedItem/StyledFeedItem';
import ChangeAlbumModal from '@/components/Modal/ChangeAlbumModal/ChangeAlbumModal';
import DeleteFeedModal from '@/components/Modal/DeleteFeedModal';
import FeedMoreModal from '@/components/Modal/FeedMoreModal';
import useModalWithWebView from '@/hooks/useModalWithWebView';

import type { Feed } from '@/types/feed';

function FeedItem(
  {
    feed,
    setFeedsData,
  }: { feed: Feed; setFeedsData: Dispatch<SetStateAction<Feed[]>> },
  ref: ForwardedRef<HTMLLIElement>,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeAlbumModalOpen, setChangeAlbumModalOpen] = useState(false);

  const {
    isModalOpen: isEditFeedModalOpen,
    openModal: openEditFeedModal,
    closeModal: closeEditFeedModal,
  } = useModalWithWebView();

  const getFormattedDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = new Date(date).toISOString().slice(0, 10);

    return formattedDate;
  };
  const formattedDate = useMemo(
    () => feed && getFormattedDateFromTimestamp(feed.timestamp),
    [feed],
  );

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const closeChangeAlbumModal = () => {
    setChangeAlbumModalOpen(false);
  };

  return (
    <>
      <StyledFeedItem ref={ref}>
        <Carousel imgUrlList={feed.imageUrl}></Carousel>
        <section className="contentsSection">
          {(feed.emotionImage || feed.weatherImage) && (
            <div className="iconSection">
              {feed.emotionImage && (
                <Image
                  width={36}
                  height={36}
                  className="emotion"
                  src={`/images/${feed.emotionImage}.svg`}
                  alt="오늘의 기분"
                />
              )}
              {feed.weatherImage && (
                <Image
                  width={36}
                  height={36}
                  className="weather"
                  src={`/images/${feed.weatherImage}.svg`}
                  alt="오늘의 날씨"
                />
              )}
            </div>
          )}
          {feed.albumType === 'my' && (
            <button className="more" type="button" onClick={handleSeeMoreClick}>
              <Image
                width={20}
                height={20}
                src="/icons/more.svg"
                alt="더보기 버튼"
              />
            </button>
          )}
        </section>
        <strong className="tit">{feed.title}</strong>
        {feed.text && typeof feed.text === 'string' && (
          <p className="detailText">
            {feed.text.split('\n').map((v, i) => {
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
          {feed.selectedAddress && (
            <>
              <Image
                width={16}
                height={16}
                src="/icons/location.svg"
                alt="위치"
                className="location-img"
              />
              <p className="locationSection">{feed.selectedAddress}</p>
            </>
          )}
        </div>

        {isModalOpen && (
          <FeedMoreModal
            setDeleteModalOpen={setDeleteModalOpen}
            setChangeAlbumModalOpen={setChangeAlbumModalOpen}
            openEditFeedModal={openEditFeedModal}
            closeModal={closeMoreModal}
          />
        )}
        {deleteModalOpen && (
          <DeleteFeedModal
            id={feed.id}
            onClose={closeDeleteModal}
            imgUrlList={feed.imageUrl}
            setFeedsData={setFeedsData}
          />
        )}
        {changeAlbumModalOpen && (
          <ChangeAlbumModal
            id={feed.id}
            onClose={closeChangeAlbumModal}
            setFeedsData={setFeedsData}
          />
        )}
        {isEditFeedModalOpen && (
          <EditFeedModal
            feed={feed}
            setFeedsData={setFeedsData}
            closeEditFeedModal={closeEditFeedModal}
          />
        )}
      </StyledFeedItem>
    </>
  );
}

export default forwardRef(FeedItem);
