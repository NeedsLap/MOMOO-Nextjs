'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Button from '@/components/Button/Button/Button';
import StyledInput from '@/components/CommonStyled/StyledInput';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import StyledLogin from '@/containers/login/StyledLogin';
import useLogin from '@/hooks/auth/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const { login, error, isPending } = useLogin();

  useEffect(() => {
    if (error === null) {
      return;
    }

    switch (error) {
      case 'auth/invalid-login-credentials':
        setSubmitErrMessage('아이디 혹은 비밀번호가 일치하지 않습니다');
        break;
      case 'auth/user-not-found':
        setSubmitErrMessage('존재하지 않는 계정입니다');
        break;
      case 'auth/wrong-password':
        setPasswordErrMessage('비밀번호를 다시 확인해주세요');
        setPasswordValid(false);
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      case 'auth/too-many-requests':
        setSubmitErrMessage(
          '여러 번 로그인에 실패하여 해당 계정에 대한 로그인이 비활성화되었습니다. 나중에 다시 시도해 주세요',
        );
        break;
      default:
        setSubmitErrMessage('아이디 혹은 비밀번호를 확인해주세요');
    }
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  const handleEmailInp = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitErrMessage('');

    if (e.target.validity.valueMissing) {
      setEmailValid(false);
      setEmailErrMessage('이메일을 입력해주세요');
    } else if (e.target.validity.typeMismatch) {
      setEmailValid(false);
      setEmailErrMessage('이메일 형식이 올바르지 않습니다');
    } else {
      setEmailValid(true);
      setEmailErrMessage('');
    }
  };

  const handlePasswordInp = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setSubmitErrMessage('');

    if (e.target.validity.valueMissing) {
      setPasswordValid(false);
      setPasswordErrMessage('비밀번호를 입력해주세요');
    } else {
      setPasswordValid(true);
      setPasswordErrMessage('');
    }
  };

  return (
    <StyledLogin>
      <div className="container">
        <h1>
          <Image width={218} height={37} src="/icons/logo.svg" alt="MOMOO" />
        </h1>
        <article>
          <h2>Login</h2>
          <Link href="/signup">Signup</Link>
        </article>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email-inp" className="a11y-hidden">
            이메일
          </label>
          <StyledInput
            id="email-inp"
            placeholder="email"
            type="email"
            onChange={handleEmailInp}
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
            onChange={handlePasswordInp}
            required
          />
          {passwordErrMessage && (
            <strong role="alert">*{passwordErrMessage}</strong>
          )}
          <Button
            size="l"
            disabled={!emailValid || !passwordValid || isPending}
          >
            {isPending ? (
              <Image
                width={29}
                height={29}
                src="/icons/loading-black.svg"
                alt="로그인 중"
              />
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </div>

      {submitErrMessage && (
        <AlertModal
          message={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </StyledLogin>
  );
}
