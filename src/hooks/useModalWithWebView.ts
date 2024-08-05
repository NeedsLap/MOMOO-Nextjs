import { useEffect, useState } from 'react';

export default function useModalWithWebView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('openModal');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('closeModal');
    }
  };

  useEffect(() => {
    if (!window.ReactNativeWebView || !isModalOpen) {
      return () => {};
    }

    const closeModalOnMessage = (e: MessageEvent) => {
      if (e.data === 'closeModal') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('message', closeModalOnMessage, true);

    return () => {
      window.removeEventListener('message', closeModalOnMessage, true);
    };
  }, [isModalOpen]);

  return { openModal, closeModal, isModalOpen };
}
