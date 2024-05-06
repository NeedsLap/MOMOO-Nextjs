import type { Metadata } from 'next';
import { Noto_Sans_KR, Prata } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';

import App from '@/components/global/App';
import ReduxProvider from '@/components/global/ReduxProvider';
import RootStyle from '@/components/global/RootStyle';
import LoadingComponent from '@/components/Loading/LoadingComponent';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-noto-sans',
});
const prata = Prata({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-prata',
});

export const metadata: Metadata = {
  title: 'MOMOO',
  description:
    'MOMOO는 네컷사진 보관 서비스입니다. 네컷에 담긴 특별한 하루와 그날의 MOMENT & MOOD를 간편하게 기록하세요.',
  openGraph: {
    type: 'website',
    url: 'https://momoo.kr/',
    siteName: 'MOMOO',
    title: '[MOMOO] 사이트 튜토리얼',
    description:
      'MOMOO는 네컷사진 보관 서비스입니다. 네컷에 담긴 특별한 하루와 그날의 MOMENT & MOOD를 간편하게 기록하세요.',
    images: [
      {
        url: 'https://momoo.kr/images/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'MOMOO',
    title: '[MOMOO] 사이트 튜토리얼',
    description:
      'MOMOO는 네컷사진 보관 서비스입니다. 네컷에 담긴 특별한 하루와 그날의 MOMENT & MOOD를 간편하게 기록하세요.',
    images: [
      {
        url: 'https://momoo.kr/images/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ['photo', 'archive', 'Album', 'diary'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const splashRendered = cookies().get('splash') ? true : false;

  return (
    <html lang="ko" className={`${notoSans.variable} ${prata.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <RootStyle>
          <ReduxProvider>
            <App splashRendered={splashRendered}>
              <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
            </App>
          </ReduxProvider>
        </RootStyle>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`}
      />
    </html>
  );
}
