import type { Metadata } from 'next';
import { Noto_Sans_KR, Prata } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Script from 'next/script';

import App from '@/components/global/App';
import ReduxProvider from '@/components/global/ReduxProvider';
import RootStyle from '@/components/global/RootStyle';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
            <App splashRendered={splashRendered}>{children}</App>
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
