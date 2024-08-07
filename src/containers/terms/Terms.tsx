'use client';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import StyledPolicy from '@/components/CommonStyled/StyledPolicy';
import TopBar from '@/components/Topbar/Topbar';
import terms from '@/containers/terms/TermsText';
import useWindowWidth from '@/hooks/useWindowWidth';
import { setPrevPath } from '@/modules/page';

import { ReduxState } from '@/modules/model';

export default function Terms() {
  const windowWidth = useWindowWidth();

  const { prevPath, loggedIn } = useSelector((state: ReduxState) => ({
    prevPath: state.page.prevPath,
    loggedIn: state.auth.loggedIn,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (prevPath === 'signup') {
      window.onpopstate = function () {
        dispatch(setPrevPath('terms'));
      };
    }
  }, []);

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="MOMOO 이용약관" />}
      <StyledPolicy>
        <BreadcrumbWrap
          navList={
            loggedIn
              ? [
                  { path: '/', text: 'Home' },
                  { path: '/policy', text: 'Privacy policy' },
                ]
              : [
                  { path: '/signup', text: 'Signup' },
                  { path: '/policy', text: 'Privacy policy' },
                ]
          }
          title="MOMOO 이용약관"
        />
        <section>
          <ol>
            {terms.map((v, i) => {
              if (typeof v.text === 'string') {
                return (
                  <li key={i}>
                    <h4>{v.title}</h4>
                    <p>{v.text}</p>
                  </li>
                );
              }

              return (
                <li key={i}>
                  <h4>{v.title}</h4>
                  <ul>
                    {v.text.map((v, i) => {
                      if (typeof v === 'string') {
                        return <li key={i}>{v}</li>;
                      }

                      return (
                        <li key={i}>
                          {v.subTitle}
                          <ul>
                            {v.text.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </section>
      </StyledPolicy>
    </>
  );
}
