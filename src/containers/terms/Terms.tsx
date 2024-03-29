'use client';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import StyledH2 from '@/components/CommonStyled/StyledH2';
import StyledPolicy from '@/components/CommonStyled/StyledPolicy';
import TopBar from '@/components/Topbar/Topbar';
import terms from '@/containers/terms/TermsText';
import useWindowWidth from '@/hooks/useWindowWidth';
import { setPrevPath } from '@/modules/page';

import { ReduxState } from '@/modules/model';

export default function Terms() {
  const windowWidth = useWindowWidth();

  const prevPath = useSelector((state: ReduxState) => state.page.prevPath);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prevPath === 'signup') {
      window.onpopstate = function () {
        dispatch(setPrevPath('terms'));
      };
    }
  }, [prevPath, dispatch]);

  return (
    <>
      {windowWidth && windowWidth <= 430 && <TopBar tit="MOMOO 이용약관" />}
      <StyledPolicy>
        {windowWidth && windowWidth > 1024 && (
          <>
            <Breadcrumb
              navList={[
                { path: '/', text: 'Home' },
                { path: '/terms', text: 'Terms of use' },
              ]}
            />
            <StyledH2>MOMOO 이용약관</StyledH2>
          </>
        )}
        {windowWidth && windowWidth > 430 && windowWidth <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: '/', text: 'Home' },
              { path: '/terms', text: 'Terms of use' },
            ]}
            title="MOMOO 이용약관"
          />
        )}
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
