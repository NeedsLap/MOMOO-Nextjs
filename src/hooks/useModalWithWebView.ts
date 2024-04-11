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
      return;
    }

    const closeModal = (e: MessageEvent) => {
      if (e.data === 'closeModal') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('message', closeModal, true);

    return () => {
      window.removeEventListener('message', closeModal, true);
    };
  }, [isModalOpen]);

  return { openModal, closeModal, isModalOpen };
}
