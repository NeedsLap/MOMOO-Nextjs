'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import StyledMy from '@/containers/my/StyledMy';
import useLogout from '@/hooks/auth/useLogout';

import { Profile } from '@/utils/model';

export default function My({ profile }: { profile: Profile }) {
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const { logout, error } = useLogout();

  useEffect(() => {
    if (error) {
      setSubmitErrMessage(error);
    }
  }, [error]);

  return (
    <StyledMy>
      <section className="profile">
        <Image
          width={70}
          height={70}
          src={profile.photoURL || '/images/profile-basic-img.svg'}
          alt="프로필 사진"
        />
        <div className="displayName">{profile.displayName}</div>
        <div className="email">{profile.email}</div>
      </section>
      <section className="menu">
        <ul>
          <li>
            <Link href="/edit-profile">
              <Image width={24} height={24} src="/icons/setting.svg" alt="" />
              Edit profile
            </Link>
          </li>
          <li>
            <Link href="/terms">
              <Image width={24} height={24} src="/icons/document.svg" alt="" />
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

      {submitErrMessage && (
        <AlertModal
          message={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </StyledMy>
  );
}
