<h1 align=center>MOMOO | 모무</h1>

![KakaoTalk_Photo_2024-05-29-18-03-19](https://github.com/NeedsLap/MOMOO-Nextjs/assets/108985221/edaa9b0c-4e1b-4a1a-b0f8-b168884ccd4c)
[웹사이트](https://momoo.kr/)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[플레이스토어](https://play.google.com/store/apps/details?id=com.momoo&hl=en-KR)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[React Native GitHub](https://github.com/NeedsLap/MOMOO-RN)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[React GitHub (Migration 전)](https://github.com/yonainthefish/MOMOO-React)

프로젝트 기간: 2023.09.29 ~ 2023.11.16 | 리팩토링 기간: 2023.11.20 ~ 진행 중<br>
**체험계정** ID: momoo@gmail.com | PW: 123qwe

<br><br>

## <span id="index">목차</span>
1. [👨‍💻👩‍💻 팀 소개](#team)
2. [🛠️ 기술 및 개발 환경](#skill)
3. [💡 주요 기능](#main)
4. [📝 핵심기술](#point)
5. [🐛 트러블 슈팅](#trouble)
6. [🙋‍♂️ 유저 피드백](#feedback)
7. [🚀 버전 2(마이그레이션, 기능추가)](#version)
8. [🔥 Firebase 구조](#firebase)
9. [✔️ Best Practices](#best)
10. [📚 프로젝트 관련 문서](#docs)

<br><br>

## <span id="team">1. 👨‍💻👩‍💻 팀 소개</span>

<div align=center>

![Group 55](https://github.com/yonainthefish/MoMoo/assets/124084624/29847d64-d24d-442a-be55-8bb7a0dff014)

|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://github.com/KimHayeon1"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="//github.com/suminson97"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="//github.com/yonainthefish"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|:---:|:---:|:---:|

</div>
<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="skill">2. 🛠️ 기술 및 개발 환경</span>

<br>

<div align="center">

| FrontEnd | BackEnd | Design | 협업방식 | 컨벤션 |
| --- | --- | --- | --- | --- |
| <img src="https://img.shields.io/badge/Next.js-eeeeee?style=flat-square&logo=Next.js&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-CC6699?style=flat-square&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white"> | <img src="https://img.shields.io/badge/firebase-F6820D?style=flat-square&logo=firebase&logoColor=white"> | <img src="https://img.shields.io/badge/figma-0d99ff?style=flat-square&logo=figma&logoColor=white"> | <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000.svg?style=flat-square&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"> | <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat-square&logo=Prettier&logoColor=black"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=flat-square&logo=eslint&logoColor=white">|

</div>
<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="main">3. 💡 주요 기능</span>

### 1) 인트로
- 스플래시
- 로그인 및 회원가입

### 2) 홈
- 나의 앨범/공유 앨범 리스트
- 앨범 정렬(최신순/오래된순)
- 앨범 추가/수정/삭제
- 앨범 공유

### 3) 앨범 상세페이지
- 앨범의 피드 앨범형
- 앨범에 사진 추가
- 피드 수정

### 4) 피드 상세페이지
- 앨범의 피드 리스트형
- 피드 수정/삭제/앨범 변경

### 5) 피드 업로드
- 사진 및 제목 (필수)
- 본문, 날씨/기분 이모티콘, 위치 (선택)

### 6) 마이페이지
- 프로필 수정
- 회원탈퇴 및 로그아웃
- 이용약관 및 개인정보처리방침

<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="point">4. 📝 핵심 기술</span>

<details>
  <summary><strong>앨범 공유</strong></summary>
  
 <br>
 
  ### 기능 소개
  1. 공유할 사용자를 검색할 수 있다.
  2. 앨범을 공유하거나, 공유한 대상을 삭제할 수 있다.
  3. 홈에서 공유하거나 공유 받은 앨범을 볼 수 있다.
  4. 앨범을 공유 받으면, 해당 앨범에 저장된 사진을 볼 수 있다.
  <br>
  
  ### 코드
  - **사용자 검색**
   
    Firebase Admin SDK를 사용하여, 사용자를 불러온다.
       
      ```js
      // src/app/api/user/route.ts
      adminApp.auth().getUserByEmail(email);
      ```
    
  <br>

  - **공유/공유 취소**

    Firestore Database에 공유 정보 저장 & 삭제
    
       ```js
       // [uid]/[uid]
       sharedAlbums: Reference(albumDoc)[] 

       // [uid]/[uid]/album/[albumId]
       sharedUsers: {uid, permission}[]
       ```

  <br>

  - 홈 - 공유 앨범
    <br>
    - Firestore에서 로그인한 사용자의 공유 앨범 리스트를 가져온다.

      ```js
      // src/utils/SDKUtils.ts
      
      const getSharedAlbums = async (
        uid: string,
      ): Promise<DocumentReference[]> => {
        const userDocRef = doc(appFireStore, uid, uid);
        const userDoc = (await getDoc(userDocRef)).data();
        return userDoc.sharedAlbums;
      };
      ```
      
    <br>

    - 공유 앨범 데이터를 불러온다.

       ```js
       // src/app/api/album/sharing
      
       sharedAlbums.map(async (ref: DocumentReference) => {
         const albumData = await getDoc(ref).data();
         // (중략)
       });
       ```

    <br>

    - 공유한 사용자 데이터를 불러온다.
    
       ```js
       // src/app/api/album/sharing
         
       const { displayName, email } = await adminAppAuth.getUser(sharedAlbumUserUid);
       ```
    
 <br>

 - 공유 앨범 상세
   - 피드 리스트를 얻기 위해 공유 앨범/나의 앨범 구분없이 요청을 보낸다.
     
     ```js
     // src/services/feed.ts
     // Path Parameter(uid, albumName)를 쿼리 매개변수로 요청에 추가하여 전송
     // 앨범 상세페이지 경로: {uid}/album/{albumName}
     // 피드 상세페이지 경로: {uid}/album/{albumName}/feed
     
     await fetch(
       `${API_URL}/feed?limit=${limit}&skip=${skip}&album=${albumName}&uid=${uid}`,
     );
     ```   

     <br>
  
    - 쿠키의 uid(로그인한 사용자)와 쿼리 매개변수로 받은 uid(앨범 생성자)가 다를 경우 권한을 검사한다.
    
      ```js
      // src/app/api/route.ts
      export async function GET(req: NextRequest) {
        // 중략
  
        let hasPermission = true;
      
        if (userUid !== uid) {
          const sharedAlbums = await getSharedAlbums(userUid);
          hasPermission = await checkAlbumPermission(albumDoc, sharedAlbums);
        }
      
        if (!hasPermission) {
          return new Response('접근 권한이 없는 앨범입니다.', {
            status: 403,
          });
        }
  
        // 중략
      }
      ```
</details>

<details>
  <summary> <strong>Masonry Layout </strong> </summary>

  - **CSS**
    - 부모 요소 CSS
      
       ```js
       // src/containers/albumDetail/StyledFeed.ts
      
       const StyledFeedList = styled.ul`
         display: grid;
         grid-template-columns: repeat(3, minmax(0, 1fr));
         margin: -8px -8px;
         grid-auto-rows: 1px;
       `;
       ```
  
    - 아이템 CSS
      
       ```js
       // src/components/AlbumItem/StyledAlbumItem.ts
    
       const StyledAlbumItem = styled.li`
         margin: 8px;
       `;
       ```

  - **JS**
    - gridRowEnd 값을 계산하는 커스텀훅
       ```js
       // src/hooks/useAlbumItemLayout.ts

       interface ImgSize {
         width: number;
         height: number;
       }
      
       function useAlbumItemLayout(node: HTMLLIElement) {
         const [imgSize, setImgSize] = useState<ImgSize | null>(null);
         const [gridRowEnd, setGridRowEnd] = useState('');
      
         useEffect(() => {
           const setLayout = async () => {
             if (!imgSize || !node) {
               return;
             }
      
             const height = node.clientWidth * (imgSize.height / imgSize.width);
             setGridRowEnd(`span ${Math.round(height + 16)}`);
           };
      
           setLayout();
         }, [imgSize]);
      
         return { setImgSize, gridRowEnd };
       }
       ```

    - gridRowEnd 값을 계산하기 위해 필요한 아이템 이미지 사이즈 구하기
       ```js
       // src/components/AlbumItem/AlbumItem.tsx
    
       <img
         onLoad={(e) =>
           setImgSize({
             width: e.currentTarget.naturalWidth,
             height: e.currentTarget.naturalHeight,
           })
         }
       />
       ```
        
</details>

<details>
  <summary><strong>무한 스크롤</strong></summary>
  <br>
  앨범 상세페이지와 게시물 상세페이지 적용한 기술입니다.<br>
  두 페이지에 적용되는 기술로, 코드 중복을 최소화하기 위해 Custom Hook을 통해 핵심 로직을 분리했습니다.
  
 - Custom Hook
   - Intersection Observer API를 활용했습니다.
   - 특정 아이템이 뷰포트에 나타나면 페이지를 업데이트했습니다.
   <br>
   
   ```ts
   // src/hooks/useInfiniteScroll.ts
   
   import { useRef, useState } from 'react';
   
   export default function useInfiniteScroll() {
     const itemRef = useRef<HTMLLIElement | null>();
     const observer = useRef<IntersectionObserver | null>(null);
     const [page, setPage] = useState(1);
   
     const observe = (node: HTMLLIElement) => {
       observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting) {
           setPage(prev => prev + 1);
   
           if (observer.current) {
             observer.current.disconnect();
           }
         }
       });
       observer.current.observe(node);
     };
   
     const setItemToObserveRef = (node: HTMLLIElement) => {
       if (node && node !== itemRef.current) {
         itemRef.current = node;
         observe(node);
       }
     };
   
     return { page, setItemToObserveRef };
   }
   ```

  - Custom Hook 사용
    ```tsx
    // src/containers/albumDetail/albumDetail.tsx
   
    const { page, setItemToObserveRef } = useInfiniteScroll();
   
    // page 업데이트 시, 추가 데이터 페칭
    useEffect(() => {
      if (page === 1) {
        return;
      }
   
      (async () => {
        const feedsToAdd = await getFeeds({
          limit: pageSize * page,
          skip: pageSize * page - pageSize,
          uid,
          albumName
        });
   
        if (feedsToAdd) {
          setFeedsData(prev => [...prev, ...feedsToAdd]);
        }
      })();
    }, [page]);
   
    // observe item
    {feedsData.map((v, i) => {
      return (
        <AlbumItem
          key={v.id}
          ref={i === feedsData.length - 1 ? setItemToObserveRef : null}
        />
      );
    })}
    ```

    상위 컴포넌트에서 ref를 전달받기 위해 forwardRef 사용
    ```tsx
    // src/components/AlbumItem/AlbumItem.tsx
   
   function AlbumItem(ref: ForwardedRef<HTMLLIElement>) {
      return (
        <StyledAlbumItem ref={ref} />
      );
    }

    export default forwardRef(AlbumItem);
    ```
</details>
<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="trouble">5. 🐛 트러블 슈팅</span>

<details>
  <summary> <strong> 1) 안드로이드 기기의 뒤로가기 </strong> </summary>
  
  1. **뒤로가기 클릭 시, 앱이 닫히는 이슈**<br>
    - 해결: 이전 페이지가 존재할 경우, 이전 페이지로 이동하도록 수정

  2. **뒤로가기 클릭 시, 게시물 업로드/수정 모달이 계속 열려있는 이슈**<br>
    - 원인: 게시물 업로드/수정 모달이 페이지 상위 컴포넌트에서 렌더링되기 때문에, 이전 페이지로 이동해도 모달은 닫히지 않음<br>
    - 해결: 모바일에선 게시물 업로드/수정 모달을 페이지로 변경

  3. **게시물 업로드/수정 후 게시물 상세페이지에서 뒤로가기 클릭 시, 게시물 업로드/수정 페이지로 돌아가는 이슈**<br>
    - 상황: 게시물 업로드/수정 화면으로 돌아가는 흐름이 불편하다는 피드백을 받음<br>
    - 해결: 모바일에서도 게시물 업로드/수정을 모달로 되돌리고, 뒤로가기 클릭 시 모달이 닫히도록 변경
  
  [자세한 내용 | MOMOO-RN](https://github.com/NeedsLap/MOMOO-RN?tab=readme-ov-file#%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EA%B8%B0%EA%B8%B0%EC%9D%98-%EB%92%A4%EB%A1%9C%EA%B0%80%EA%B8%B0)
</details>

<details>
  <summary><strong>2) 이미지 확장자 유효성 검사 - SVG </strong> </summary>

  - 문제: 이미지 선택 후 유효성 검사 시, svg 파일이 통과하지 못하는 버그
  - 원인: 기존에 svg 파일을 image/svg로 검사하고 있었으나, 표준 MIME 타입은 image/svg+xml이기 때문
  - 해결: image/svg+xml을 통과시키도록 정규 표현식 수정

    ```js
    /^image\/(jpg|svg|png|jpeg|gif|bmp|tif|heic)$/ // 기존
    /^image\/(jpg|svg(\+xml)?|png|jpeg|gif|bmp|tif|heic)$/ // 변경
    ```
</details>

<details>
  <summary>3)<strong> 모달 배경 콘텐츠 스크롤 </strong></summary>

  - 문제: 모바일에서 게시물 업로드/수정 모달 내 스크롤 시도 시, 배경 콘텐츠가 스크롤되는 경우가 있음
  - 원인: 해당 요소의 스크롤을 (더) 내릴/올릴 수 없는 경우, window에 스크롤 이벤트 발생 (chrome 동작 방식)
  - 해결: 모바일에서 해당 모달 open 시, body에 scroll-rock 클래스 추가 (close 시, scroll-rock 클래스 삭제)

    ```js
    .scroll-lock {
      position: fixed;
      height: 100vh;
      overflow: hidden;
    }
    ```
</details>

<details>
  <summary><strong> 4) 데이터 업데이트와 UI</strong> </summary>

  - 문제: 데이터 업데이트 시, 다른 경로로 이동한 후 돌아오면 이전 데이터가 렌더링됨
  - 해결: 데이터 업데이트 시 라우트 새로고침
      
  ```js
  import { useRouter } from 'next/navigation';
  router.refresh();
  ```
</details>
<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="feedback">6. 🙋‍♂️ 유저 피드백</span>


### 1) 1차 유저 테스트

<details>
  <summary><strong>피드백 목록</strong></summary>
  
  <br>**회원가입**
  1. ~~이용약관 읽고 뒤로 오면 입력해 놓았던 내용이 사라지고, 모든 체크 박스가 해제됨~~[5a0b0d0](https://github.com/yonainthefish/MoMoo/commit/4a7aa70099d156101e2e70cfc2a4101454b5481b)
  2. ~~프로필 사진 변경 버튼에 마우스 커서를 가져다 놓았을 때, 손가락 모양으로 바뀌면 좋겠음~~[bdfc9ea](https://github.com/yonainthefish/MoMoo/commits/bdfc9ea415337d1e6ea7f37cf8143b1d4ebd9445)
  3. 버튼 하단부가 잘림. 앱이 전체적으로 하단부 UI가 잘림
  4. ~~'안녕하세요 모무입니다'라는 텍스트가 없으면 좋을 것 같음. 이미 스플래시에서 소개했기 때문~~[4f05ab6](https://github.com/yonainthefish/MoMoo/commit/700dead85b55bea6e915862c372f8d7bb04747de)
  5. ~~아이디가 로그인용인지 사람들에게 보이는 용인지 모르겠음~~(username -> nickname)

  <br>**프로필 수정**
  1. ~~프로필 수정 기능에서 사진 크기 2MB 이내라서 핸드폰으로 찍은 사진은 등록이 안 됨~~(src/hooks/useProfileImg.ts)
  2. ~~계정 재인증 모달 - 비밀번호가 마스킹 처리되면 좋겠음~~[7e75388](https://github.com/yonainthefish/MoMoo/commit/7e75388ab4da790bb162bcfd589ed7126dfd9961)
  3. ~~프로필 설정이 수정인 건지 헷갈림~~[6167780](https://github.com/yonainthefish/MoMoo/commit/6167780fd776dd28810a9c828866586116ce182d)
  4. ~~탈퇴 모달 하단부가 잘림~~[#227](https://github.com/yonainthefish/MoMoo/pull/227)
  
  <br>**홈**
  1. 플러스 아이콘이 앨범 추가 버튼인지 헷갈림
  2. ~~앨범 이름을 입력하지 않아도 앨범 추가 가능~~[#236](https://github.com/yonainthefish/MoMoo/pull/236)
  3. ~~앨범 수정/삭제 모달에 있는 체크 표시의 기능을 모르겠음~~(저장 버튼: 체크 아이콘 -> '저장' 텍스트)
  4. ~~앨범 생성 시, 엔터를 눌러서 저장 가능하면 좋겠음~~[91d0fe3](https://github.com/yonainthefish/MoMoo/pull/255/commits/91d0fe34d2866947a47bbfb2cf95ae70cc7e22d7)
  5. ~~같은 이름으로 앨범을 여러 개 만들 수 있음~~[#236](https://github.com/yonainthefish/MoMoo/pull/236)
  6. ~~현재 앨범 `...` 버튼(더보기) 클릭 시, 앨범 수정/삭제 모달이 열리는데 기능을 명료화하면 더 좋을 것 같음~~(더보기 클릭 시, 선택 모달이 뜨도록 변경)[01e4d5f](https://github.com/yonainthefish/MoMoo/commit/01e4d5f2af83c30052c8eb995f1f630e3470d194)[b825983](https://github.com/yonainthefish/MoMoo/commit/b825983413259eb93d7934de13ff71f439b9d3f3)
  7. ~~앨범 하단부가 잘림~~[571a714](https://github.com/yonainthefish/MoMoo/commits/571a714a215e4ec15ec8caea240c0d893307ded2)
  8. ~~앨범명을 입력하고 저장 버튼을 여러 번 누르면 앨범이 여러개 생성됨~~[692c719](https://github.com/yonainthefish/MoMoo/commits/692c7190afdfdc2715f84302eae148a802d19b76)
  9. ~~앨범 수정/삭제 모달의 버튼을 여러 번 누르면 에러 페이지("존재하지 않는 페이지입니다")로 이동됨<br>
     상황 재현: 버튼이 위치한 곳을 계속해서 클릭하면, 생성이 완료될 때 모달이 닫히는 동시에 앨범이 클릭 됨 -> 클릭 된 앨범의 제목이 없을 시, 유효하지 않은 주소로 이동됨~~[#236](https://github.com/yonainthefish/MoMoo/pull/236)
  10. ~~모달창이 띄워졌을 때 버튼은 눌러지지 않지만 스크롤이 가능
      -> 일반적인 사용성이나, 게시물 업로드/수정 모달의 경우 모바일에서 화면 전체를 차지하기 때문에 사용에 불편함이 있음~~ [#143](https://github.com/NeedsLap/MOMOO-Nextjs/issues/143)
  11. ~~앨범 필터 버튼이 너무 작음~~[036022a](https://github.com/yonainthefish/MoMoo/commits/036022a0ddaf4a805c6d8937f37f471f3e57cd7f)
  12. ~~앨범 제목 글자 수의 제한이 없음~~[536bae6](https://github.com/yonainthefish/MoMoo/commits/536bae6131017c614fdf0c200b524b3b2f70b9c6)
  13. ~~정렬 기준 누르고 나서 다른 부분 터치했을 때 정렬창이 꺼졌으면 함~~[9b16fbf](https://github.com/yonainthefish/MoMoo/pull/255/commits/9b16fbfd98745b97d6ddb3032892cb8b0f1e7db7)
  
  <br>**앨범 상세 페이지**
  1. ~~게시글이 많아질수록 '앨범에 게시글 추가 버튼'도 뒤로 밀려서 누르러 가기 힘들어짐~~[5bbe7dd](https://github.com/NeedsLap/MOMOO-Nextjs/commit/5bbe7dd6728c3dac51c03461a7b9f1c4d855f31b)[63fa419](https://github.com/NeedsLap/MOMOO-Nextjs/commit/63fa4197a02e67b4e702f51945d742cc9fd6f95e)
  2. ~~목록형, 앨범형 선택 가능하면 좋겠음~~[fe9614f](https://github.com/NeedsLap/MOMOO-Nextjs/commit/fe9614f14268176480502b19654b6e63d944af61)
  3. 날짜, 제목이 보였으면 좋겠음
  
  <br>**게시물 상세 페이지**
  1. ~~제목과 본문이 글자 크기 차이가 크게 안 나서 색상이나 폰트 사이즈를 좀 더 조절하면 좋겠음~~[17cc95d](https://github.com/NeedsLap/MOMOO-Nextjs/commits/17cc95d56d6833d396725c6504f8add8a0155196)

  
  <br>**게시물 업로드**
  1. ~~한 번에 여러 장의 사진을 등록할 수 있으면 좋겠음~~ => 브라우저 파일 선택 기능 익숙지 않은 사용자
  2. 처음에 모든 selectbox가 닫혀있어서 한 번 더 눌러야 하는 게 사용성이 안 좋은 것 같음
  3. 뭔가 지도의 핀을 움직여서 위치를 선택할 수 있는 기능이 있으면 좋겠음
  4. ~~체크 표시가 위치 추가 버튼이라는 것을 알기 어려웠음~~[#52](https://github.com/NeedsLap/MOMOO-Nextjs/issues/52)
  5. ~~업로드 버튼은 포커스가 마지막에 되면 좋겠음~~[#74](https://github.com/NeedsLap/MOMOO-Nextjs/issues/74)
  6. ~~오늘의 날씨에서 비와 눈의 구분이 모호함~~[89f4104](https://github.com/NeedsLap/MOMOO-Nextjs/commit/89f4104e0bba45b261f2f2e03a2e4469c2d4d58c)
  7. 지도에서 내가 원하는 부분을 터치하여 지정할 수 있으면 좋겠음
  8. 위치 추가란을 열었을 때, 아래로 드래그하여 오늘의 날씨도 볼 수 있으면 좋겠음
  9. ~~앨범이 복수 선택 가능해서 좋음~~
  10. ~~ESC를 누르면 모달이 닫히면 좋겠음~~[61d1e8a](https://github.com/yonainthefish/MoMoo/commit/61d1e8a50193d503ba1eeba5fc7fc4a849de1834)
  11. ~~기존 사진에 추가할 사진만 선택했는데, 기존 사진은 없어짐~~[#269](https://github.com/yonainthefish/MoMoo/pull/269)
  12. ~~사진이 최대 3장이 올라가는데 따로 안내 사항이 없는 점이 아쉬움~~[#269](https://github.com/yonainthefish/MoMoo/pull/269)
  13. 위치 추가의 경우 지도에 표시되는 장소를 확대하고 축소하는 기능을 사용할 때 만약 input에 커서가 들어가 있는 경우 (검색어를 입력하고 바로 지도를 확대하는 경우) 확대 축소할 때마다 input에 자꾸 포커스가 들어감. input에서 포커스를 빼야(뒤로가기 버튼 눌러야) 깔끔하게 확대축소가 가능함
  14. 검색어를 모호하게 입력했을 때 선택지가 없는게 아쉬움(서울로 입력하면 경복궁이 선택됨)
  15. ~~필수 항목을 알 수 없어서 불편함~~[#269](https://github.com/yonainthefish/MoMoo/pull/269)
  16. 앨범 선택 시, 새로운 앨범을 만들어서 그 앨범에 바로 추가할 수 있으면 좋겠음
  17. ~~사진 업로드 버튼에 포커스가 되면 좋겠음~~[#74](https://github.com/NeedsLap/MOMOO-Nextjs/issues/74)
  18. 사진뿐만 아니라 동영상도 저장할 수 있으면 좋겠음
  19. 탭바가 있어도 좋을 듯함
  20. ~~업로드되는 사진의 확장명을 추가하면 좋겠음(gif 등)~~[#53](https://github.com/NeedsLap/MOMOO-Nextjs/issues/53)
  21. ~~게시물 제목과 게시물 본문은 공백 포함 500자까지 제한 있음(안내 필요)~~[#269](https://github.com/yonainthefish/MoMoo/pull/269)
  22. ~~위치 선택 시, 지도가 뜨지 않는 버그~~(Kakao Developers에 주소 추가)
  23. ~~날씨와 기분 셀렉트 박스가 선택되지 않는 버그(게시물 업로드 22 버그로 인한 버그)~~
  24. ~~업로드 버튼이 눌러지지 않음 -> UI 피드백이 없어서 업로드중임을 알 수 없음 -> 로딩중 UI 추가~~[]()
  
  <br>**앱**
  1. ~~안드로이드 기기의 뒤로가기 버튼을 누르면 앱이 종료됨~~[dc43540](https://github.com/NeedsLap/MOMOO-RN/commit/dc4354035b1fa3dd67586967f4874495e55c53f5)
  
  <br>**기타**
  1. ~~스크롤을 하며 계속해서 게시글을 보고 싶음~~[fe9614f](https://github.com/NeedsLap/MOMOO-Nextjs/commit/fe9614f14268176480502b19654b6e63d944af61)
  2. ~~앨범을 필수로 생성해야 사진이 업로드할 수 있거나, 앨범 생성 전 사진을 업로드해도 기본 앨범에 사진이 업로드되면 좋겠음<br>
     상황: 회원가입 시, '전체 보기' 앨범이 자동 생성되나 사용자는 인지하지 못함<br>
     해결1: 기존엔 업로드 후 이동한 피드 상세 페이지에서 해당 피드에 대한 정보만 볼 수 있음. '전체 보기'의 피드 상세 페이지로 이동하도록 변경하여, '전체 보기' 앨범이 자동 생성되고 해당 앨범에 저장되었음을 인지할 수 있도록 함~~(`${userUid}/전체 보기/feed`)<br>
     해결2: 회원가입 시, 튜토리얼
  3. ~~사진 슬라이드가 동작하지 않음<br>
     3-1. 업로드~~[3aabb70](https://github.com/yonainthefish/MoMoo/commits/71ad3d4470e98d2c34df6fbbe5391596f54aeee5)<br>
    ~~3-2. 게시물 상세 페이지~~[#35](https://github.com/NeedsLap/MOMOO-Nextjs/pull/35)
  4. ~~게시글 수정 후 게시글에서 `<` 뒤로가기 아이콘을 누르면 다시 게시글 수정 페이지가 나와서 불편함<br>
    - 개선: 게시물 수정 페이지 -> 모달로 통일~~[#32](https://github.com/NeedsLap/MOMOO-Nextjs/issues/32)
  5. ~~게시글 삭제를 하면 기존에 있던 페이지가 아니라 새 게시글 작성하는 페이지가 나와서 불편함
    - 상황: 게시물 생성 후 삭제 시 이전 페이지인 새 게시글 페이지로 이동됨
    - 개선: 새 게시글 페이지(게시물 업로드 페이지) -> 모달로 통일~~[#39](https://github.com/NeedsLap/MOMOO-Nextjs/pull/39)
  6. ~~confirm 창이나 alert창을 직접 만들지 않아서 UI가 예쁘지 않음~~[#191](https://github.com/yonainthefish/MoMoo/issues/191)
  7. 캘린더 형식으로 업로드한 날짜를 지정해 확인할 수 있는 기능이 있으면 좋겠음
  8. 앱 잠금 기능이 있으면 좋겠음
  9. ~~공유 기능 추가 희망~~[#253](https://github.com/yonainthefish/MoMoo/issues/253)
  10. 예쁜 이미지 사진으로 만들어져 사진으로 공유할 수 있으면 좋겠음
  11. ~~내비게이션 바에 홈 버튼이 a 태그와 button 태그로 이루어져서 포커스가 두 번 됨~~(#241)[https://github.com/yonainthefish/MoMoo/issues/241](270938c)[https://github.com/yonainthefish/MoMoo/commit/270938caf1635d0ee1eb806c8d0c7cd91535da98]
  12. ~~모달이 나왔을 땐, 모달 내에서만 포커스가 이동하면 좋겠음~~(#245)[https://github.com/yonainthefish/MoMoo/issues/245]
  13. ~~유효하지 않은 URL 접속 시, 내비게이션바는 나오면 좋을 것 같음~~(#231)[https://github.com/yonainthefish/MoMoo/issues/231]
  14. ~~아이콘의 퀄리티가 더 발전하면 좋겠음~~
  15. 앱의 컨셉이 더 분명하면 좋을 것 같음<br>
      15-1. 사진 업로드 메인일 경우, 앨범 상세 페이지에서 사용자가 업로드한 사진들이 모였을 때 뿌듯함을 느낄 만한 디자인 요소 추가하면 좋겠음<br>
      15-2. 일기 기능이 메인일 경우,<br>
      - 폰트 속성 변화 기능을 추가하면 좋겠음<br>
      - 나의 하루 기분을 주간/월간 그래프로 확인할 수 있는 기능 추가하면 좋겠음
  16. ~~튜토리얼이나 사용법을 알려주는 기능이 있으면 좋겠음~~ [이용가이드](https://www.notion.so/MOMOO-081ebf94df754542a17ad20bcf2e6fd4)
  17. ~~앨범이 여러 개가 되는 경우 스크롤이 너무 길어져서 핸드폰의 갤러리처럼 작아도 좋을 듯 함~~
  18. 전체보기가 시선을 강탈함
  19. ~~마이페이지 창에서 유저 프로필 기능을 따로 사용하지 않는다면 빼면 좋겠음(되는 줄 알고 몇 번 클릭함)~~[#91](https://github.com/NeedsLap/MOMOO-Nextjs/issues/91)
  20. 다른 사람과의 채팅 기능이 있었으면 신선할 것 같음
  21. ~~앨범 생성, 회원탈퇴 모달 - 버튼이 보이지 않음~~[]()
  22. ~~404 페이지에 nav가 있으면 좋겠음(다른 페이지로 이동할 수 있도록)~~

</details>

**총 73개의 피드백을 받았습니다. **현재 56개**를 반영 완료했습니다.*

<br>

### 2) 2차 유저 테스트

<details>
  <summary><strong>사용 만족도 개선</strong></summary>

  <br>
  
  - 1차 만족도 조사 대비 평균 약 **29% 향상**됨 (4번 제외)
  - ⭐ 10점 만점

  <br>

  1. 회원가입/로그인/프로필 수정: ⭐ 7.3 -> ⭐ 10
  2. 앨범 생성/수정/삭제: ⭐ 7.7 -> ⭐ 9.5
  3. 게시물 업로드/수정/삭제: ⭐ 6.7 -> ⭐ 10
  4. 앨범 공유: 10
</details>

<details>
  <summary><strong>피드백 목록</strong></summary>

  <br>**홈**
  1. '더보기'를 누르면 (수정하기, 공유 대상) 이외에 삭제하기도 있었으면 함
  2. 앨범에서 사진을 누르거나 확대를 통해 사진을 좀 더 자세히 볼 수 있으면 좋을 것 같음
  3. ~~앨범 클릭 시, 404 화면이 뜨는 경우가 있음
    -> 앨범 이름이 '.'인 경우~~[#145](https://github.com/NeedsLap/MOMOO-Nextjs/issues/145)

  <br>**게시물 상세**
  1. ~~실제 업로드한 날짜의 다음날로 나옴~~[412e163](https://github.com/NeedsLap/MOMOO-Nextjs/commit/412e163181c16642dc70ad1ad12699b59ab75dd2)
  
  <br>**게시물 업로드/수정/삭제**
  1. 기존엔 앨범에 들어가 있는 상태에서 업로드를 눌러도 앨범 선택을 따로 눌러야 하는데, 만약 앨범에 들어간 상태에서 업로드하고자 하면 저절로 어떤 앨범인지 선택되면 좋겠음
  2. 시간이 오래 걸리는 경우 있음
  3. 사진을 여러장 올릴 때 다중 선택이 가능하면 좋겠음
     
  <br>**공유 앨범**
  1. 공유 앨범을 만들고 사용자를 초대하면 사진을 같이 볼 수 있다는 게 재밌는 부분인 거 같음
  2. 공유 앨범을 만들 때, 사용자를 초대해야만 공유 앨범(홈)에 앨범이 생기는 것을 몰랐음. 설명이 필요할 것 같음

  <br>**기타**
  1. ~~업로드 모달에서 기기의 뒤로가기를 누르면 어플이 종료되는 현상이 나타남
    -> AndroidManifest.xml에서 더는 지원하지 않는 속성을 제거한 후 해결됨~~[832a5ab](https://github.com/NeedsLap/MOMOO-RN/commit/832a5abf8f97173ea1e7e9b60a04fe5ab67bfe76)
  2. 앱스토어로도 설치하고 싶음
  3. 공유 앨범에 반응을 남길 수 있으면 좋겠음. 좋아요 혹은 스티커. 다양한 스티커를 판매했으면 좋겠음
  4. 공유받은 앨범에 사진을 올리고 싶음
  5. 사진 보정도 할 수 있으면 좋겠음. 밝기 조정, 채도 조정 등
  6. 업로드 날짜는 현재 자동으로 저장되는데, 직접 수정 가능하면 좋겠음

</details>
<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>
  
## <span id="version">7. 🚀 버전 2(마이그레이션, 기능추가)</span>

### 1) React -> Next.js Migration 이유
- **Admin SDK 사용**: v2의 앨범 공유 기능 추가를 위해 Admin SDK를 사용해야 했고, 이를 위해 서버 환경을 구축해야 했습니다.
  
- **서버 사이드 렌더링 (SSR) 지원**: SSR을 통해 SEO를 향상시키고 초기 페이지 로딩 속도를 개선할 수 있습니다.
   >초기 렌더링 속도 약 78% 개선 (FCP, LCO, Speed Index)

<br>

### 2) 달라진 기능

<details>
  <summary><strong>앨범 공유 (신기능)</strong></summary>

  - 앨범 공유 모달을 통해, 공유 대상을 검색/추가/삭제할 수 있다
    
    <img src='https://github.com/NeedsLap/MOMOO-Nextjs/assets/108985221/5bf64396-41cf-4cdf-8974-c935a3464ef3' width=200>
    
    
  - 홈에서 공유 앨범을 확인할 수 있다
  
    <table>
      <tr>
        <td><img src="https://github.com/NeedsLap/MOMOO-Nextjs/assets/108985221/efdc9c82-01a8-4fac-aeb6-b53166aa2a53" width="200px"></td>
        <td>👉</td>
        <td><img src="https://github.com/KimHayeon1/Dopamine_Frontend/assets/108985221/9150f3b5-0326-4cd0-9441-a872b56f98ad" width="200px"></td>
      </tr>
      <tr align="center">
        <td>v1</td>
        <td></td>
        <td>v2</td>
      </tr>
    </table>
    
    <br>
  
  - 공유 받은 사용자는 해당 앨범의 모든 사진을 볼 수 있다
  - 현재 read 권한까지 개발 완료. write, admin 권한 추가 예정
</details>



<details>
  <summary><strong>게시물 업로드 모달</strong></summary>

  - 기존: 사진 선택 및 전체 재선택 가능
  - 개선: 사진 선택 후, 일부 삭제 및 추가 선택 가능

  <table>
    <tr>
      <td><img src="https://github.com/NeedsLap/MOMOO-Nextjs/assets/108985221/a05bf5ba-a30c-46eb-9909-2cee775d0d98" width="300px"></td>
      <td>👉</td>
      <td><img src="https://github.com/NeedsLap/MOMOO-Nextjs/assets/108985221/0ffdf58c-3abe-4af0-84d5-24c9c0fc190c" width="300px"></td>
    </tr>
    <tr align="center">
      <td>v1</td>
      <td></td>
      <td>v2</td>
    </tr>
  </table>
</details>
<br>

### 3) 리팩토링
<details>
  <summary><strong>API 엔드포인트</strong></summary>
 
  - 기존: 파이어베이스와의 모든 통신을 클라이언트에서 처리했습니다.

  - 개선: 파이어베이스와의 통신 로직을 백엔드로 분리한 이유는 다음과 같습니다.
     - 유지보수성 향상을 위한 비즈니스 로직 분리
     - 요청 중단으로 인한 데이터 손실 방지
     - 보안 강화
     <br>
     
      ```ts
      // src/app/api/user/route/ts

      export async function DELETE() {
        const uid = cookies().get('uid')?.value;
      
        if (!uid) {
          return NextResponse.json(
            {
              error: '인증되지 않은 사용자입니다.'
            },
            {
              status: 401
            }
          );
        }
      
        try {
          const { photoURL } = await getUserByUid(uid);
      
          await Promise.all([
            deletePhothURL(photoURL),
            deleteFeedsImg(uid),
            deleteUserDoc(uid),
            deleteAlbumDocs(uid),
            deleteFeedDocs(uid)
          ]);
      
          await adminAppAuth.deleteUser(uid);
        } catch (error) {
          console.error(error);
      
          return NextResponse.json(
            {
              error: '계정 삭제 중 예기치 못한 오류가 발생했습니다.'
            },
            {
              status: 500
            }
          );
        }
      
        return NextResponse.json({
          status: 204
        });
      }
      ```
</details>
<br>

### 4) 사용성 개선 및 버그 수정
*[6. 유저 피드백](https://github.com/NeedsLap/MOMOO-Nextjs?tab=readme-ov-file#6-%EC%9C%A0%EC%A0%80-%ED%94%BC%EB%93%9C%EB%B0%B1)을 참고해주세요 :)*

<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="firebase">8. 🔥 Firebase 구조</span>

<details>
  <summary><strong>Firestore Database</strong></summary>

  ```
  // {uid}/{uid}
  {
    sharedAlbums: Reference(albumDoc){}
  }

  // {uid}/{uid}/album/{albumId}
  {
    createdTime: Timestamp;
    feedList: String(feedId)[];
    name: String;
    sharedUsers: {uid:String; permission: "read"}[];
  }

  // {uid}/{uid}/feed/{feedId}
  {
    id: String;
    title: String;
    text: String;
    seletedAddress: String;
    emotionImage: String;
    weatherImage: String;
    timestamp: Timestamp;
  }
  ```
</details>

<details>
  <summary><strong>Storage</strong></summary>

  ```
  feed/{feedId + imageIndex}.{확장자}
  profile/{uid}.{확장자}
  ```
</details>
<p align="right"><a href="#index" style='color: white; '>목차로 ▲</a></p>
<br>

## <span id="best">9. ✔️ Best Practices</span>

[**접근성**](https://www.notion.so/4944398f7e7546a0a86a6bd5b5f80a56)

[**컨벤션**](https://www.notion.so/c8b85abd4f8049cdb10dc07191522ba9)

<p align="right">
  <a href="#index" style='color: white;'>목차로 ▲</a>
</p>
<br>

## <span id="docs">10. 📚 프로젝트 관련 문서</span>

- 💡 [노션: 기획 및 회의록](https://lumbar-distance-384.notion.site/momoo-moment-mood-33ccb07d75264f9d9bd1b1ca265f8db3)
- 💡 [피그마: 와이어프레임 & 디자인](https://www.figma.com/file/IXS4UPRbunlz1cI0ka5koi/momoo-design?type=design&node-id=74-2789&mode=design&t=pVd3Uehs4a6wFHNW-0)
- 💡 [이용가이드](https://www.notion.so/MOMOO-081ebf94df754542a17ad20bcf2e6fd4)
<p align="right">
  <a href="#index" style='color: white;'>목차로 ▲</a>
</p>
