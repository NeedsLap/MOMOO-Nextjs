import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import StyledMyNonModal from '@/components/MyNonModal/StyledMyNonModal';
import useLogout from '@/hooks/auth/useLogout';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowNonModal from '@/hooks/dialog/useShowNonModal';
import closeDialogOnClick from '@/utils/dialog';

import type MyNonModalProps from '@/components/MyNonModal/model';
import { ReduxState } from '@/modules/model';

export default function MyNonModal({ setIsDialogOpen }: MyNonModalProps) {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const menuFirstItemRef = useRef<HTMLAnchorElement>();

  const closeMyNonModal = () => {
    setIsDialogOpen(false);
  };

  useEscDialog(closeMyNonModal);
  const { logout, error } = useLogout();
  const { showNonModal } = useShowNonModal();

  useEffect(() => {
    if (error) {
      setSubmitErrMessage(error);
    }
  }, [error]);

  const focusOnFirstItem = (node: HTMLAnchorElement) => {
    if (node && !menuFirstItemRef.current) {
      node.focus();
      menuFirstItemRef.current = node;
    }
  };

  return (
    <StyledMyNonModal onClick={e => closeDialogOnClick(e, closeMyNonModal)} ref={showNonModal}>
      <div>
        <Link href="/edit-profile" className="profile">
          <Image
            width={60}
            height={60}
            src={user.photoURL || '/images/profile-basic-img.svg'}
            alt="프로필 사진"
          />
          <div className="displayName">{user.displayName}</div>
          <div className="email">{user.email}</div>
        </Link>
        <section className="menu">
          <ul>
            <li>
              <Link href="/edit-profile" ref={focusOnFirstItem} onClick={closeMyNonModal}>
                <Image width={24} height={24} src="/icons/setting.svg" alt="" />
                Edit profile
              </Link>
            </li>
            <li>
              <Link href="/terms" onClick={closeMyNonModal}>
                <Image width={24} height={24} src="/icons/document.svg" alt="" />
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/privacy" onClick={closeMyNonModal}>
                <Image width={24} height={24} src="/icons/policy.svg" alt="" />
                Privacy policy
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/NeedsLap/MOMOO-Nextjs"
                rel="noopener noreferrer"
                target="_blank"
                onClick={closeMyNonModal}
              >
                <Image width={24} height={24} src="/icons/github.svg" alt="" />
                GitHub
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMyNonModal();
                }}
              >
                <Image width={24} height={24} src="/icons/logout.svg" alt="" />
                Logout
              </button>
            </li>
          </ul>
        </section>
        <div className="footer">MOMOO 2023. All Right Reserved.</div>
        <button className="close" type="button" onClick={closeMyNonModal} aria-label="닫기">
          <Image width={20} height={20} src="/icons/x.svg" alt="" />
        </button>
      </div>
      {submitErrMessage && (
        <AlertModal message={submitErrMessage} onClose={() => setSubmitErrMessage('')} />
      )}
    </StyledMyNonModal>
  );
}
