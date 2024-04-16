'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import BreadcrumbWrap from '@/components/Breadcrumb/BreadcrumbWrap';
import StyledPolicy from '@/components/CommonStyled/StyledPolicy';
import TopBar from '@/components/Topbar/Topbar';
import useWindowWidth from '@/hooks/useWindowWidth';
import { setPrevPath } from '@/modules/page';

import { ReduxState } from '@/modules/model';

export default function Privacy() {
  const windowWidth = useWindowWidth();

  const prevPath = useSelector((state: ReduxState) => state.page.prevPath);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prevPath === 'signup') {
      window.onpopstate = function () {
        dispatch(setPrevPath('privacy'));
      };
    }
  }, []);

  return (
    <>
      {windowWidth && windowWidth <= 430 && (
        <TopBar tit="니즈랩 개인정보 처리방침" />
      )}
      <StyledPolicy>
        <BreadcrumbWrap
          navList={[
            { path: '/', text: 'Home' },
            { path: '/policy', text: 'Privacy policy' },
          ]}
          title="니즈랩 개인정보 처리방침"
        />
        <p>
          니즈랩은 이용자의 개인정보 보호를 위해 「개인정보 보호법」 및 관계
          법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게
          관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 이용자에게
          개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을
          신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
          처리방침을 수립·공개합니다.
          <br />
          니즈랩 개인정보 처리방침은 MOMOO, Lupin 서비스를 포함하여 니즈랩이
          제공하는 서비스에 적용됩니다. 단, 특정 니즈랩 서비스에서 개별적으로
          개인정보 처리방침을 운영하는 경우 그에 따릅니다.
        </p>
        <section>
          <h3 className="a11y-hidden">개인정보 처리방침 조항</h3>
          <ol>
            <li>
              <h4>제1조. 목적</h4>
              <p>
                니즈랩은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
                있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라
                별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul>
                <li>
                  1. 회원 가입 의사의 확인, 연령 확인, 이용자의 본인 확인,
                  이용자 식별, 회원탈퇴 의사의 확인 등 회원관리
                </li>
              </ul>
            </li>

            <li>
              <h4>제2조. 개인정보의 처리 및 보유기간</h4>
              <p>
                니즈랩은 회원님의 개인정보에 대해 개인정보의 수집 시에 동의 받은
                기간 동안 개인정보를 처리, 보유합니다. 다만, 니즈랩 이용약관을
                위반하는 회원님에 대한 부정 가입 및 이용 방지를 위하여 회원 탈퇴
                시점으로부터 최대 1년간 보관합니다. 법령 위반에 따른 수사/조사
                등이 진행 중인 경우에는 해당 수사/조사 종료 시까지 보관합니다.
              </p>
              <p>개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
              <ul>
                <li>1. 회원 가입 및 관리: 서비스 탈퇴 시까지</li>
                <li>2. 게시물 및 사진: 게시물 삭제 혹은 서비스 탈퇴 시까지</li>
              </ul>
            </li>

            <li>
              <h4>제3조. 처리하는 개인정보의 항목</h4>
              <ul>
                <li>
                  1. 회원 가입 시 회원님로부터 수집하는 개인정보
                  <ul>
                    <li>
                      - 필수 항목: 이메일 주소, 비밀번호, 프로필 사진, 닉네임
                    </li>
                  </ul>
                </li>
                <li>
                  2. 서비스 이용 과정에서 회원님로부터 수집하는 개인정보
                  <ul>
                    <li>- 필수 항목: 게시물 및 사진</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <h4>제4조. 개인정보 처리업무의 위탁</h4>
              <p>
                니즈랩은 서비스 제공을 위하여 다음의 개인정보 처리업무를
                위탁하고 있습니다. 니즈랩은 위탁받은 업체가 위탁받은 업무 목적
                외로 개인정보를 처리하는 것을 제한하고, 기술적/관리적 보호조치
                적용 및 재위탁 제한 등 위탁받은 업체의 개인정보 보호 관련 법령
                준수 여부를 관리/감독하고 있습니다.
              </p>
              <ul>
                <li>1. Firebase: 회원 가입 및 관리, 게시물 DB 관리</li>
              </ul>
            </li>

            <li>
              <h4>제5조. 개인정보의 파기 절차 및 방법</h4>
              <p>
                니즈랩은 처리 목적의 달성, 보유기간의 경과 등 개인정보가
                불필요하게 되었을 시, 해당 정보를 지체 없이 파기합니다.
                <br />
                회원님로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
                달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속
                보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터
                베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              </p>
              <p>개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
              <ul>
                <li>
                  1. 파기 절차: 니즈랩은 파기 사유가 발생한 개인정보를 선정하고,
                  니즈랩의 개인정보 보호책임자의 승인을 받아 개인정보를
                  파기합니다.
                </li>
                <li>
                  2. 파기 방법: 니즈랩은 전자적 파일형태로 저장된 개인정보
                  기록을 재생할 수 없도록 파기합니다.
                </li>
              </ul>
            </li>

            <li>
              <h4>제6조. 회원님와 법정대리인의 권리/의무 및 행사방법</h4>
              <p>
                회원님은 개인정보의 열람, 정정, 처리정지, 삭제, 동의철회/탈퇴를
                요구할 권리가 있습니다.
              </p>
              <p>
                권리 행사는 회원님의 법정대리인이나 위임을 받은 자 등 대리인을
                통하여 하실 수도 있습니다. 이 경우 &quot;개인정보 처리 방법에
                관한 고시(제2020-7호)&quot; 별지 제11호 서식에 따른 위임장을
                제출하셔야 합니다.
              </p>
              <ul>
                <li>
                  {'- '}
                  <Link href="/setting">개인정보 열람, 수정, 삭제</Link>
                </li>
                <li>
                  {'- '}
                  <Link href="/setting">
                    회원탈퇴 및 개인정보 수집, 이용 동의 철회
                  </Link>
                </li>
                <li>- 해당 게시물 &gt; 더보기 &gt; 수정하기/삭제하기</li>
              </ul>
            </li>

            <li>
              <h4>제7조. 개인정보의 안전성 확보조치</h4>
              <p>
                니즈랩은 개인정보의 안전성 확보를 위해 내부관리계획을
                수립/시행하고 있으며, 개인정보가 암호화되어 보관되고 있습니다.
              </p>
            </li>

            <li>
              <h4>제8조. 개인정보 보호 책임자</h4>
              <p>
                니즈랩은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
                처리와 관련한 회원님의 불만처리 및 피해구제 등을 위하여 아래와
                같이 개인정보 보호 책임자를 지정하고 있습니다.
              </p>
              <ul>
                <li>- 성명: 김하연(kim hayeon)</li>
                <li>- 전화번호: 010-7280-5510</li>
                <li>
                  - 메일:{' '}
                  <a href="mailto:k.hayeon00@gmail.com">k.hayeon00@gmail.com</a>
                </li>
                <li>- 부서명: 기획개발팀</li>
              </ul>
            </li>

            <li>
              <h4>제9조. 개인정보 열람청구</h4>
              <p>
                회원님은 「개인정보 보호법」 제35조에 따른 개인정보의 열람
                청구를 제14조의{' '}
                <a href="mailto:k.hayeon00@gmail.com">기획개발팀</a>에 할 수
                있습니다.
              </p>
            </li>

            <li>
              <h4>제10조. 권익침해 구제방법</h4>
              <p>
                회원님은 개인정보침해로 인한 구제를 받기 위하여 개인정보
                분쟁조정위원회, 한국인터넷진흥원 개인정보 침해신고센터 등에
                상담이나 분쟁해결 등을 신청할 수 있습니다.
              </p>
              <ul>
                <li>
                  - 개인정보분쟁조정위원회: (국번없이){' '}
                  <a href="tel:1833-6972">1833-6972</a>{' '}
                  <a
                    href="https://www.kopico.go.kr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    (www.kopico.go.kr)
                  </a>
                </li>
                <li>
                  - 개인정보침해신고센터: (국번없이) <a href="tel:118">118</a>{' '}
                  <a
                    href="https://privacy.kisa.or.kr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    (www.kopico.go.kr)
                  </a>
                </li>
                <li>
                  - 대검찰청 사이버수사과: (국번없이){' '}
                  <a href="tel:1301">1301</a>{' '}
                  <a
                    href="https://www.spo.go.kr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    (www.spo.go.kr)
                  </a>
                </li>
                <li>
                  - 경찰청 사이버수사국: (국번없이) <a href="tel:182">182</a>{' '}
                  <a
                    href="https://ecrm.cyber.go.kr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    (ecrm.cyber.go.kr)
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <h4>제11조. 개인정보 처리방침의 변경</h4>
              <p>
                개인정보 처리방침이 변경되는 경우, 최소 7일 전에 첫 화면
                팝업창으로 사전 공지합니다. 다만, 회원님 권리의 중대한 변경이
                발생할 때에는 최소 30일 전에 공지합니다.
              </p>
              <ul>
                <li>- 공고일자: 2024년 01월 24일</li>
                <li>- 시행일자: 2024년 01월 24일</li>
              </ul>
            </li>
          </ol>
        </section>
      </StyledPolicy>
    </>
  );
}
