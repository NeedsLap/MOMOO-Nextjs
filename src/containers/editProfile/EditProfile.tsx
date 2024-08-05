'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import Button from '@/components/Button/Button';
import StyledInput from '@/components/CommonStyled/StyledInput';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import DeleteIdModal from '@/components/Modal/DeleteIdModal';
import ReauthModal from '@/components/Modal/ReauthModal';
import TopBar from '@/components/Topbar/Topbar';
import StyledEditProfile from '@/containers/editProfile/StyledEditProfile';
import useUpdateProfile from '@/hooks/auth/useUpdateProfile';
import useProfileImg from '@/hooks/useProfileImg';
import useWindowWidth from '@/hooks/useWindowWidth';

import type { EditProfileProps, ProfileToUpdate } from '@/containers/editProfile/model';
import { ReduxState } from '@/modules/model';

export default function EditProfile({ profile }: EditProfileProps) {
  const [displayName, setDisplayName] = useState({
    value: profile.displayName,
    vaild: true,
    changed: false
  });
  const [email, setEmail] = useState({
    value: profile.email,
    vaild: true,
    changed: false
  });
  const [password, setPassword] = useState({
    value: '',
    vaild: true
  });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: '',
    vaild: true
  });
  const [displayNameErrMessage, setDisplayNameErrMessage] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] = useState('');
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const [disabledEditButton, setDisabledEditButton] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState('프로필 수정');
  const [isDeleteIdModalOpen, setIsDeleteIdModalOpen] = useState(false);
  const [isReauthForDeleteIdModalOpen, setIsReauthForDeleteIdModalOpen] = useState(false);
  const [isReauthForUpdateProfileModalOpen, setIsReauthForUpdateProfileModalOpen] = useState(false);
  const [readyToUpdateProfile, setReadyToUpdateProfile] = useState(false);
  const [readyToDeleteId, setReadyToDeleteId] = useState(false);
  const [updateProfileIsPending, setUpdateProfileIsPending] = useState(false);
  const [imgHasFocus, setImgHasFocus] = useState(false);

  const { user, isAuthReady } = useSelector((state: ReduxState) => ({
    user: state.auth.user,
    isAuthReady: state.auth.isAuthReady
  }));

  const { setProfile, error: updateProfileError } = useUpdateProfile();
  const windowWidth = useWindowWidth();
  const {
    file,
    setSrc,
    src,
    setProfileImg,
    error: imgErrMessage,
    setError: setImgErrMessage
  } = useProfileImg(profile.photoURL);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    setSubmitErrMessage('');

    if (!displayName.vaild || !email.vaild || !password.vaild || !passwordConfirm.vaild) {
      setDisabledEditButton(true);
      return;
    }

    if (email.changed || user.photoURL !== src || displayName.changed || password.value) {
      setDisabledEditButton(false);
    } else {
      setDisabledEditButton(true);
    }
  }, [email, src, displayName, password, passwordConfirm]);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (user.photoURL) {
      setSrc(user.photoURL);
    }
  }, [user, isAuthReady, setSrc]);

  useEffect(() => {
    if (!readyToUpdateProfile) {
      return;
    }

    (async () => {
      setUpdateProfileIsPending(true);
      const toUpdateProfile: ProfileToUpdate = {
        file,
        displayName: displayName.value,
        email: email.value,
        password: password.value
      };
      await setProfile(toUpdateProfile);
      // 초기화
      setUpdateProfileIsPending(false);
      setReadyToUpdateProfile(false);
      setPassword({ vaild: true, value: '' });
      setPasswordConfirm({ vaild: true, value: '' });
    })();
  }, [readyToUpdateProfile]);

  useEffect(() => {
    if (!updateProfileError) {
      return;
    }

    switch (updateProfileError) {
      case 'auth/email-already-in-use':
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        break;
      case 'auth/network-request-failed':
        setSubmitErrMessage('네트워크 연결에 실패했습니다');
        break;
      case 'auth/invalid-email':
        setEmailErrMessage('잘못된 이메일 형식입니다');
        break;
      case 'auth/internal-error':
        setSubmitErrMessage('잘못된 요청입니다');
        break;
      default:
        setSubmitErrMessage('프로필 변경에 실패했습니다');
    }
  }, [updateProfileError]);

  useEffect(() => {
    if (readyToDeleteId) {
      setIsDeleteIdModalOpen(true);
      setReadyToDeleteId(false);
    }
  }, [readyToDeleteId]);

  const deleteId = async () => {
    setIsReauthForDeleteIdModalOpen(true);
    setSelectedBtn('회원 탈퇴');
  };

  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabledEditButton(true);

    if (email.value !== user.email || password) {
      setIsReauthForUpdateProfileModalOpen(true);
    } else {
      setReadyToUpdateProfile(true);
    }
  };

  const handlePasswordInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (e.target.validity.tooShort) {
      setPasswordErrMessage('6자 이상 입력해 주세요');
      setPassword({ vaild: false, value });
    } else {
      setPasswordErrMessage('');
      setPassword({ vaild: true, value });
    }

    if (value === passwordConfirm.value) {
      setPasswordConfirmErrMessage('');
      setPasswordConfirm({ vaild: true, value });
    } else {
      setPasswordConfirm(prev => {
        return { ...prev, vaild: false };
      });
    }
  };

  const handlePasswordConfirmInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== password.value) {
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
      setPasswordConfirm({ vaild: false, value });
    } else {
      setPasswordConfirmErrMessage('');
      setPasswordConfirm({ vaild: true, value });
    }
  };

  const handleEmailInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const changed = user.email !== value;

    if (e.target.validity.valueMissing) {
      setEmailErrMessage('필수 항목입니다');
      setEmail({ vaild: false, value, changed });
    } else {
      setEmail({ vaild: true, value, changed });
    }
  };

  const handleDisplayNameInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const changed = user.displayName !== value;
    setDisplayName({ value, vaild: !!value, changed });

    if (e.target.validity.valueMissing) {
      setDisplayNameErrMessage('닉네임을 입력해 주세요');
    }
  };

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="Edit profile" />}
      <StyledEditProfile>
        {windowWidth && windowWidth > 1024 && (
          <Breadcrumb
            navList={[
              { path: '/', text: 'Home' },
              { path: '/edit-profile', text: 'Edit profile' }
            ]}
          />
        )}
        {windowWidth && windowWidth > 430 && windowWidth <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: '/', text: 'Home' },
              { path: '/edit-profile', text: 'Edit profile' }
            ]}
            title="Edit profile"
          />
        )}
        <div className="container">
          <article>
            <h2>
              Edit
              <br />
              profile
            </h2>
            <button
              type="button"
              className={selectedBtn === '프로필 수정' ? 'selected' : ''}
              onClick={() => setSelectedBtn('프로필 수정')}
            >
              프로필 수정
            </button>
            <button
              type="button"
              className={selectedBtn === '회원 탈퇴' ? 'selected' : ''}
              onClick={deleteId}
            >
              회원 탈퇴
            </button>
          </article>
          <form className="auth-form" onSubmit={updateProfile}>
            <label htmlFor="profile-inp" className={imgHasFocus ? 'profile focus' : 'profile'}>
              <Image
                width={171}
                height={171}
                src={src || '/images/profile-basic-img.svg'}
                alt="프로필 사진"
              />
              <Image width={45} height={45} src="/icons/edit-circle.svg" alt="변경하기" />
            </label>
            <input
              id="profile-inp"
              accept="image/*"
              type="file"
              className="a11y-hidden"
              onClick={e => {
                (e.currentTarget as HTMLInputElement).value = '';
              }}
              onChange={e => setProfileImg(e.target.files)}
              onFocus={() => setImgHasFocus(true)}
              onBlur={() => setImgHasFocus(false)}
            />
            <label htmlFor="nickname-inp" className="a11y-hidden">
              닉네임
            </label>
            <StyledInput
              id="nickname-inp"
              placeholder="nickname"
              type="text"
              autoComplete="nickname"
              value={displayName.value}
              maxLength={20}
              onChange={handleDisplayNameInp}
              required
            />
            {displayNameErrMessage && <strong role="alert">*{displayNameErrMessage}</strong>}
            <label htmlFor="email-inp" className="a11y-hidden">
              이메일
            </label>
            <StyledInput
              id="email-inp"
              placeholder="email"
              type="email"
              autoComplete="email"
              value={email.value || ''}
              maxLength={98}
              onChange={handleEmailInp}
            />
            {emailErrMessage && <strong role="alert">*{emailErrMessage}</strong>}
            <label htmlFor="password-inp" className="a11y-hidden">
              비밀번호
            </label>
            <StyledInput
              id="password-inp"
              placeholder="password"
              type="password"
              autoComplete="new-password"
              minLength={6}
              maxLength={20}
              value={password.value}
              onChange={handlePasswordInp}
            />
            {passwordErrMessage && <strong role="alert">*{passwordErrMessage}</strong>}
            <label htmlFor="password-inp" className="a11y-hidden">
              비밀번호 재확인
            </label>
            <StyledInput
              id="password-inp"
              placeholder="password confirm"
              type="password"
              autoComplete="new-password"
              minLength={6}
              maxLength={20}
              value={passwordConfirm.value}
              onChange={handlePasswordConfirmInp}
            />
            {passwordConfirmErrMessage && (
              <strong role="alert">*{passwordConfirmErrMessage}</strong>
            )}
            <Button size="l" disabled={disabledEditButton}>
              {updateProfileIsPending ? (
                <Image width={29} height={29} src="/icons/loading-black.svg" alt="저장 중" />
              ) : (
                'Save'
              )}
            </Button>
          </form>
          {windowWidth && windowWidth <= 430 && (
            <button type="button" className="delete-btn" onClick={deleteId}>
              Delete account
              <Image width={20} height={20} src="/icons/delete-red.svg" alt="" />
            </button>
          )}
        </div>
        {isDeleteIdModalOpen && (
          <DeleteIdModal
            onClose={() => {
              setIsDeleteIdModalOpen(false);
              setSelectedBtn('프로필 수정');
            }}
            setIsModalOpen={setIsDeleteIdModalOpen}
            setSubmitErrMessage={setSubmitErrMessage}
          />
        )}
        {isReauthForUpdateProfileModalOpen && (
          <ReauthModal
            setIsModalOpen={setIsReauthForUpdateProfileModalOpen}
            setIsReauthSuccess={setReadyToUpdateProfile}
            cancle={() => {
              setIsReauthForUpdateProfileModalOpen(false);
              setDisabledEditButton(false);
            }}
          />
        )}
        {isReauthForDeleteIdModalOpen && (
          <ReauthModal
            setIsModalOpen={setIsReauthForDeleteIdModalOpen}
            setIsReauthSuccess={setReadyToDeleteId}
            cancle={() => {
              setIsReauthForDeleteIdModalOpen(false);
              setSelectedBtn('프로필 수정');
            }}
          />
        )}
        {submitErrMessage && (
          <AlertModal
            message={submitErrMessage}
            onClose={() => {
              setSubmitErrMessage('');
              setSelectedBtn('프로필 수정');
            }}
          />
        )}
        {imgErrMessage && (
          <AlertModal message={imgErrMessage} onClose={() => setImgErrMessage('')} />
        )}
      </StyledEditProfile>
    </>
  );
}
