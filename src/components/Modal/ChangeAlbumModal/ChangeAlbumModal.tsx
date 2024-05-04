import { useRouter } from 'next/navigation';
import { SetStateAction, SyntheticEvent, useEffect, useState } from 'react';

import {
  ChangeModalDialog,
  MultiAccordionWrapper,
} from '@/components/Modal/ChangeAlbumModal/StyledChangeAlbumModal';
import GetAccordionData from '@/components/Upload/GetAccordionData';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowModal from '@/hooks/dialog/useShowModal';
import useAlbumName from '@/hooks/useAlbumName';
import useGetSavedAlbumList from '@/hooks/useGetSavedAlbumList';
import {
  useAddFeedIdFromFeedList,
  useRemoveFeedIdFromFeedList,
} from '@/hooks/useUpdateFeedList';
import { closeDialogOnClick } from '@/utils/dialog';

import { Feed } from '@/types/feed';

interface AlbumIdData {
  albumName: string;
  docId: string;
}

export default function ChangeAlbumModal({
  onClose,
  id,
  setFeedData,
}: {
  onClose: () => void;
  id: string;
  setFeedData: React.Dispatch<SetStateAction<Feed | null>>;
}) {
  const { showModal } = useShowModal();
  useEscDialog(onClose);
  const [selectedAlbumList, setSelectedAlbumList] = useState<string[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);
  const [savedAlbumList, setSavedAlbumList] = useState<string[]>([]);
  const [answerArray, setAnswerArray] = useState<string[] | null>();

  const router = useRouter();

  const getAccordionData = GetAccordionData();
  const getSavedAlbumList = useGetSavedAlbumList();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();
  const albumName = useAlbumName();

  useEffect(() => {
    const setSavedAlbumData = async () => {
      const data = await getSavedAlbumList(id);

      if (data) {
        setSelectedAlbumList(data.map((v) => v.data().name));
        setSavedAlbumList(data.map((v) => v.id));
      } else {
        return;
      }
    };

    const SetAccordionData = async () => {
      const result = await getAccordionData();
      setAlbumIdData(result.albumIdData || []);
    };

    setSavedAlbumData();
    SetAccordionData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAccordionData();
      setAlbumIdData(result.albumIdData || []);
      const accordionData = result.accordionData || null;

      if (accordionData) {
        setAnswerArray(accordionData[0].answer);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      selectedAlbumList.forEach(async (selectedAlbumName) => {
        let selectedAlbumId = '';

        for (const iterator of albumIdData) {
          if (selectedAlbumName === iterator.albumName) {
            selectedAlbumId = iterator.docId;
          }
        }

        if (!savedAlbumList.includes(selectedAlbumId)) {
          await addFeedIdFromFeedList(id, selectedAlbumId);
        }
      });

      savedAlbumList.forEach(async (savedAlbumId) => {
        let savedAlbumName = '';

        for (const iterator of albumIdData) {
          if (savedAlbumId === iterator.docId) {
            savedAlbumName = iterator.albumName;
          }
        }

        if (!selectedAlbumList.includes(savedAlbumName)) {
          await removeFeedIdFromFeedList(id, savedAlbumId);
        }
      });

      if (!selectedAlbumList.includes(albumName)) {
        setFeedData(null);
      }

      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const MultiAnswerClick = (text: string) => {
    const isSelected = selectedAlbumList.includes(text);

    if (isSelected) {
      setSelectedAlbumList(selectedAlbumList.filter((album) => album !== text));
    } else {
      setSelectedAlbumList([...selectedAlbumList, text]);
    }
  };

  return (
    <ChangeModalDialog
      role="dialog"
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, onClose)}
    >
      <header className="modal-header" id="modal-select">
        <h2>앨범 변경하기</h2>
        <p> 저장할 앨범을 선택해 주세요</p>
      </header>

      <MultiAccordionWrapper>
        <div className="anw" id="multiAnswer">
          {answerArray?.map((item, index) => {
            return (
              <button
                type="button"
                disabled={item === '전체 보기' ? true : false}
                key={index}
                onClick={() => MultiAnswerClick(item)}
                className={selectedAlbumList.includes(item) ? 'selected' : ''}
              >
                {item}
              </button>
            );
          })}
        </div>
      </MultiAccordionWrapper>
      <div className="modalList">
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="submit" onClick={handleSubmit}>
          확인
        </button>
      </div>
    </ChangeModalDialog>
  );
}
