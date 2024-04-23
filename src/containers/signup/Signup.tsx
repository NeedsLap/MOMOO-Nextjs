'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Button from '@/components/Button/Button/Button';
import StyledInput from '@/components/CommonStyled/StyledInput';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import StyledSignup from '@/containers/signup/StyledSignup';
import useSignup from '@/hooks/auth/useSingup';
import useProfileImg from '@/hooks/useProfileImg';
import { resetPageState, setPrevPath } from '@/modules/page';
import { resetSignupState, setSignupForm } from '@/modules/signup';

import { ReduxState } from '@/modules/model';

export default function Signup() {
  const [profileImgFiles, setProfileImgFiles] = useState<FileList | null>(null);
  const [displayName, setDisplayName] = useState({ vaild: false, value: '' });
  const [email, setEmail] = useState({ vaild: false, value: '' });
  const [password, setPassword] = useState({ vaild: false, value: '' });
  const [passwordConfirm, setPasswordConfirm] = useState({
    vaild: false,
    value: '',
  });
  const [displayNameErrMessage, setDisplayNameErrMessage] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);
  const [allChecked, setAllChecked] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [imgHasFocus, setImgHasFocus] = useState(false);

  const { error, signup, isPending } = useSignup();
  const {
    file,
    src,
    setProfileImg,
    error: imgErrMessage,
    setError: setImgErrMessage,
  } = useProfileImg();

  const prevPath = useSelector((state: ReduxState) => state.page.prevPath);
  const signupFormdata = useSelector(
    (state: ReduxState) => state.signup.signupForm,
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if ((prevPath === 'terms' || prevPath === 'privacy') && signupFormdata) {
      setProfileImg(signupFormdata.profileImgFiles);
      setDisplayName(signupFormdata.displayName);
      setEmail(signupFormdata.email);
      setPassword(signupFormdata.password);
      setPasswordConfirm(signupFormdata.passwordConfirm);

      setAgeChecked(signupFormdata.ageChecked);
      setTermsChecked(signupFormdata.termsChecked);
      setPrivacyChecked(signupFormdata.privacyChecked);

      dispatch(resetSignupState());
      dispatch(resetPageState());
    }
  }, [prevPath]);

  useEffect(() => {
    if (error === null) {
      return;
    }

    switch (error) {
      case 'auth/email-already-in-use':
        setEmail((prev) => {
          return { ...prev, vaild: false };
        });
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        break;
      case 'auth/network-request-failed':
        setSubmitErrMessage('네트워크 연결에 실패했습니다');
        break;
      case 'auth/invalid-email':
        setEmail((prev) => {
          return { ...prev, vaild: false };
        });
        setEmailErrMessage('잘못된 이메일 형식입니다');
        break;
      case 'auth/internal-error':
        setSubmitErrMessage('잘못된 요청입니다');
        break;
      default:
        setSubmitErrMessage('회원가입 중 에러가 발생했습니다');
    }
  }, [error]);

  useEffect(() => {
    if (
      displayName.vaild &&
      email.vaild &&
      password.vaild &&
      passwordConfirm.vaild &&
      allChecked
    ) {
      setDisabledSubmitBtn(false);
    } else {
      setDisabledSubmitBtn(true);
    }
  }, [displayName, email, password, passwordConfirm, allChecked]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({
      email: email.value,
      password: password.value,
      displayName: displayName.value,
      file,
    });
  };

  const handleDisplayNameInp = (target: HTMLInputElement) => {
    const value = target.value;

    if (target.validity.valueMissing) {
      setDisplayNameErrMessage('닉네임을 입력해주세요');
      setDisplayName({ value, vaild: false });
    } else {
      setDisplayNameErrMessage('');
      setDisplayName({ value, vaild: true });
    }
  };

  const handleEmailInp = (target: HTMLInputElement) => {
    const value = target.value;

    if (target.validity.valueMissing) {
      setEmailErrMessage('이메일을 입력해주세요');
      setEmail({ value, vaild: false });
    } else {
      setEmailErrMessage('');
      setEmail({ value, vaild: true });
    }
  };

  const handlePasswordInp = (target: HTMLInputElement) => {
    const value = target.value;

    if (target.validity.valueMissing) {
      setPasswordErrMessage('비밀번호를 입력해주세요');
      setPassword({ value, vaild: false });
    } else if (target.validity.tooShort) {
      setPasswordErrMessage('6자 이상 입력해주세요');
      setPassword({ value, vaild: false });
    } else {
      setPasswordErrMessage('');
      setPassword({ value, vaild: true });
    }

    if (target.value === passwordConfirm.value) {
      setPasswordConfirmErrMessage('');
      setPasswordConfirm({ value, vaild: false });
    }
  };

  const handlePasswordConfirmInp = (value: string) => {
    if (value !== password.value) {
      setPasswordConfirm({ value, vaild: false });
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordConfirm({ value, vaild: true });
      setPasswordConfirmErrMessage('');
    }
  };

  const handleInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitErrMessage('');

    switch (e.target.id) {
      case 'email-inp':
        handleEmailInp(e.target);
        break;
      case 'password-inp':
        handlePasswordInp(e.target);
        break;
      case 'passwordConfirm-inp':
        handlePasswordConfirmInp(e.target.value);
        break;
      case 'displayName-inp':
        handleDisplayNameInp(e.target);
    }
  };

  useEffect(() => {
    if (ageChecked && termsChecked && privacyChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [ageChecked, termsChecked, privacyChecked]);

  const setSignupData = () => {
    const toChangeState = {
      profileImgFiles,
      displayName,
      email,
      password,
      passwordConfirm,

      ageChecked,
      termsChecked,
      privacyChecked,
    };

    dispatch(setPrevPath('signup'));
    dispatch(setSignupForm(toChangeState));
  };

  return (
    <StyledSignup
      $checkboxIcon="/icons/checkbox.svg"
      $checkboxCheckedIcon="/icons/checkbox-checked.svg"
    >
      <div className="container">
        <h1>
          <Image width={218} height={37} src="/icons/logo.svg" alt="MOMOO" />
        </h1>
        <article>
          <Link href="/login">Login</Link>
          <h2>Signup</h2>
        </article>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label
            htmlFor="profile-inp"
            className={imgHasFocus ? 'profile focus' : 'profile'}
          >
            <Image
              width={171}
              height={171}
              src={src || '/images/profile-basic-img.svg'}
              alt="프로필 사진"
            />
            <Image
              width={45}
              height={45}
              src="/icons/edit-circle.svg"
              alt="변경하기"
            />
          </label>
          <input
            id="profile-inp"
            type="file"
            className="a11y-hidden"
            onClick={(e) => ((e.currentTarget as HTMLInputElement).value = '')}
            onChange={(e) => {
              setProfileImg(e.target.files);
              setProfileImgFiles(e.target.files);
            }}
            onFocus={() => setImgHasFocus(true)}
            onBlur={() => setImgHasFocus(false)}
          />
          <label htmlFor="displayName-inp" className="a11y-hidden">
            닉네임
          </label>
          <StyledInput
            id="displayName-inp"
            placeholder="nickname"
            type="text"
            maxLength={20}
            value={displayName.value}
            onChange={handleInp}
            required
          />
          {displayNameErrMessage && (
            <strong role="alert">*{displayNameErrMessage}</strong>
          )}
          <label htmlFor="email-inp" className="a11y-hidden">
            이메일
          </label>
          <StyledInput
            id="email-inp"
            placeholder="email"
            type="email"
            value={email.value}
            maxLength={98}
            onChange={handleInp}
            required
          />
          {emailErrMessage && <strong role="alert">*{emailErrMessage}</strong>}
          <label htmlFor="password-inp" className="a11y-hidden">
            비밀번호
          </label>
          <StyledInput
            id="password-inp"
            placeholder="password"
            type="password"
            value={password.value}
            minLength={6}
            maxLength={20}
            onChange={handleInp}
            required
          />
          {passwordErrMessage && (
            <strong role="alert">*{passwordErrMessage}</strong>
          )}
          <label htmlFor="passwordConfirm-inp" className="a11y-hidden">
            비밀번호 재확인
          </label>
          <StyledInput
            id="passwordConfirm-inp"
            placeholder="password confirm"
            type="password"
            value={passwordConfirm.value}
            minLength={6}
            maxLength={20}
            onChange={handleInp}
            required
          />
          {passwordConfirmErrMessage && (
            <strong role="alert">*{passwordConfirmErrMessage}</strong>
          )}
          <div className="agree">
            <h3>MOMOO 서비스 약관에 동의해 주세요.</h3>
            <label className={allChecked ? 'checkbox checked' : 'checkbox'}>
              모두 동의합니다.
              <input
                type="checkbox"
                className="a11y-hidden"
                onChange={(e) => {
                  setAllChecked(e.currentTarget.checked);

                  if (e.currentTarget.checked) {
                    setAgeChecked(true);
                    setTermsChecked(true);
                    setPrivacyChecked(true);
                  } else {
                    setAgeChecked(false);
                    setTermsChecked(false);
                    setPrivacyChecked(false);
                  }
                }}
                checked={allChecked}
              />
            </label>
            <strong className="a11y-hidden">동의 항목</strong>
            <ul>
              <li>
                <label className={ageChecked ? 'checkbox checked' : 'checkbox'}>
                  [필수] 만 14세 이상입니다.
                  <input
                    type="checkbox"
                    className="a11y-hidden"
                    onChange={(e) => setAgeChecked(e.currentTarget.checked)}
                    checked={ageChecked}
                  />
                </label>
              </li>
              <li>
                <label
                  className={termsChecked ? 'checkbox checked' : 'checkbox'}
                >
                  [필수] 이용약관
                  <input
                    type="checkbox"
                    className="a11y-hidden"
                    onChange={(e) => setTermsChecked(e.currentTarget.checked)}
                    checked={termsChecked}
                  />
                </label>
                <button className="link" type="button">
                  <Image
                    width={14}
                    height={14}
                    src="/icons/arrow-right.svg"
                    alt="자세히 보기"
                    onClick={() => {
                      router.push('/terms');
                      setSignupData();
                    }}
                  />
                </button>
              </li>
              <li>
                <label
                  className={privacyChecked ? 'checkbox checked' : 'checkbox'}
                >
                  [필수] 데이터 정책
                  <input
                    type="checkbox"
                    className="a11y-hidden"
                    onChange={(e) => setPrivacyChecked(e.currentTarget.checked)}
                    checked={privacyChecked}
                  />
                </label>
                <button
                  className="link"
                  type="button"
                  onClick={() => {
                    router.push('/privacy');
                    setSignupData();
                  }}
                >
                  <Image
                    width={14}
                    height={14}
                    src="/icons/arrow-right.svg"
                    alt="자세히 보기"
                  />
                </button>
              </li>
            </ul>
          </div>

          <div className="submit-btn-wrap">
            <Button size="l" disabled={disabledSubmitBtn || isPending}>
              {isPending ? (
                <Image
                  width={29}
                  height={29}
                  src="/icons/loading-black.svg"
                  alt="계정 생성 중"
                />
              ) : (
                'Signup'
              )}
            </Button>
          </div>
        </form>
      </div>

      {submitErrMessage && (
        <AlertModal
          message={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
      {imgErrMessage && (
        <AlertModal
          message={imgErrMessage}
          onClose={() => setImgErrMessage('')}
        />
      )}
    </StyledSignup>
  );
}
