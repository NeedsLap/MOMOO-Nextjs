import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import StyledMyNonModal from '@/components/MyNonModal/StyledMyNonModal';
import useAuthState from '@/hooks/auth/useAuthState';
import useLogout from '@/hooks/auth/useLogout';
import useEscDialog from '@/hooks/dialog/useEscDialog';
import useShowNonModal from '@/hooks/dialog/useShowNonModal';
import { closeDialogOnClick } from '@/utils/dialog';

import type { MyNonModalProps } from '@/components/MyNonModal/model';

export default function MyNonModal({ setIsDialogOpen }: MyNonModalProps) {
  const { user } = useAuthState();
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const { logout, error } = useLogout();
  const { showNonModal } = useShowNonModal();

  const menuFirstItemRef = useRef<HTMLAnchorElement>();

  const closeMyNonModal = () => {
    setIsDialogOpen(false);
  };

  useEscDialog(closeMyNonModal);

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
    <StyledMyNonModal
      role="dialog"
      onClick={(e) => closeDialogOnClick(e, closeMyNonModal)}
      ref={showNonModal}
    >
      <div>
        <section className="profile">
          <Image
            width={60}
            height={60}
            src={user.photoURL || '/images/profile-basic-img.svg'}
            alt="프로필 사진"
          />
          <div className="displayName">{user.displayName}</div>
          <div className="email">{user.email}</div>
        </section>
        <section className="menu">
          <ul>
            <li>
              <Link href="/edit-profile" ref={focusOnFirstItem}>
                <Image width={24} height={24} src="/icons/setting.svg" alt="" />
                Edit profile
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <Image
                  width={24}
                  height={24}
                  src="/icons/document.svg"
                  alt=""
                />
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <Image width={24} height={24} src="/icons/policy.svg" alt="" />
                Privacy policy
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/yonainthefish/MoMoo"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image width={24} height={24} src="/icons/github.svg" alt="" />
                GitHub
              </a>
            </li>
            <li>
              <button type="button" onClick={logout}>
                <Image width={24} height={24} src="/icons/logout.svg" alt="" />
                Logout
              </button>
            </li>
          </ul>
        </section>
        <div className="footer">MOMOO 2023. All Right Reserved.</div>
        <button
          className="close"
          type="button"
          onClick={() => setIsDialogOpen(false)}
          aria-label="닫기"
        >
          <Image width={20} height={20} src="/icons/x.svg" alt="" />
        </button>
      </div>
      {submitErrMessage && (
        <AlertModal
          message={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </StyledMyNonModal>
  );
}
