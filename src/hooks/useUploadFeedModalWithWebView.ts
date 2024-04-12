import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  closeUploadFeedModal,
  openUploadFeedModal,
} from '@/modules/uploadFeedModal';

import { ReduxState } from '@/modules/model';

export default function useUploadFeedModalWithWebView() {
  const dispatch = useDispatch();
  const isUploadFeedModalOpen = useSelector(
    (state: ReduxState) => state.uploadFeedModal.isUploadFeedModalOpen,
  );

  const openModal = (albumNameToAdd: string[]) => {
    dispatch(openUploadFeedModal(albumNameToAdd));

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('openModal');
    }
  };

  useEffect(() => {
    if (!window.ReactNativeWebView || !isUploadFeedModalOpen) {
      return;
    }

    const closeModal = (e: MessageEvent) => {
      if (e.data === 'closeModal') {
        dispatch(closeUploadFeedModal());
      }
    };
    window.addEventListener('message', closeModal, true);

    return () => {
      window.removeEventListener('message', closeModal, true);
    };
  }, [isUploadFeedModalOpen]);

  return { openModal };
}
