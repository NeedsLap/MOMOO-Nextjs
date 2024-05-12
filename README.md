<div align=center>

<h1> MOMOO |  모무 </h1>

<br>

<h3> 네컷에 담긴 특별한 하루와 그 날의 MOMENT & MOOD를 기록하는 저장소 <br>  MOMOO 입니다.</h3>
<br><br>

</div>

<div align=center>

|프로젝트 기간|2023.09.29 - 2023.11.16|
|:--:|:--|
|**웹사이트**|**[바로가기] 👉 https://momoo.kr**|
|**플레이스토어**|**[바로가기] 👉 https://play.google.com/store/apps/details?id=com.momoo&hl=en-KR**|
|리팩토링 기간|2023.11.20 ~ 2024.05.07|
|체험계정|ID: momoo@gmail.com / PW: 123qwe|
|React Native 레포|https://github.com/NeedsLap/MOMOO-RN|
|(Migration 전) React 레포|https://github.com/yonainthefish/MoMoo|

</div>

<br><br>
<br><br>

## 0. React -> Next.js Migration

## 1. ✍🏻 팀원 

<div align=center>

![Group 55](https://github.com/yonainthefish/MoMoo/assets/124084624/29847d64-d24d-442a-be55-8bb7a0dff014)

|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://github.com/KimHayeon1"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="//github.com/suminson97"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="//github.com/yonainthefish"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|:---:|:---:|:---:|

</div>

<br><br>
<br><br>

  
## 2. 🛠️ 기술 및 개발 환경

<br>

<div align="center">

| FrontEnd | BackEnd | Design | 협업방식 | 컨벤션 |
| --- | --- | --- | --- | --- |
| <img src="https://img.shields.io/badge/Next.js-eeeeee?style=flat-square&logo=Next.js&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-CC6699?style=flat-square&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white"> | <img src="https://img.shields.io/badge/firebase-F6820D?style=flat-square&logo=firebase&logoColor=white"> | <img src="https://img.shields.io/badge/figma-0d99ff?style=flat-square&logo=figma&logoColor=white"> | <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000.svg?style=flat-square&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"> | <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat-square&logo=Prettier&logoColor=black"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=flat-square&logo=eslint&logoColor=white">|

</div>

<br><br>
<br><br>

## 3. 주요기능

### 인트로
- 스플래시
- 로그인 및 회원가입

### 홈
- 나의 앨범/공유 앨범 리스트
- 앨범 정렬(최신순/오래된순)
- 앨범 추가/수정/삭제
- 앨범 공유

### 앨범 상세페이지
- 앨범의 피드 앨범형
- 앨범에 사진 추가
- 피드 수정

### 피드 상세페이지
- 앨범의 피드 리스트형
- 피드 수정/삭제/앨범 변경

### 피드 업로드
- 사진 및 제목 (필수)
- 본문, 날씨/기분 이모티콘, 위치 (선택)

### 마이페이지
- 프로필 수정
- 회원탈퇴 및 로그아웃
- 이용약관 및 개인정보처리방침

<br><br>

## 4. Firebase 구조


<details>
  <summary><h3>Firestore Database</h3></summary>
  
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
  <summary><h3>Storage</h3></summary>

  ```
    feed/{feedId + imageIndex}.{확장자}
    profile/{uid}.{확장자}
  ```
</details>

<br><br>

## 5. 📝 핵심기술

<details>
  <summary><h3>앨범 공유</h3></summary>

  **기능 소개**
  1. 공유할 사용자를 검색할 수 있다.
  2. 앨범을 공유하거나, 공유한 대상을 삭제할 수 있다.
  3. 홈에서 공유하거나 공유 받은 앨범을 볼 수 있다.
  4. 앨범을 공유 받으면, 해당 앨범에 저장된 사진을 볼 수 있다.
  <br>
  
  코드**
  1. **사용자 검색**
  - Firebase Admin SDK를 사용하여, 사용자를 불러온다.
       
    ```js
      // src/app/api/user/route.ts
      adminApp.auth().getUserByEmail(email);
    ```
    
  <br>
   
  2. **공유/공유 취소**
  - Firestore Database에 공유 정보 저장&삭제
    
    ```
      // [uid]/[uid]
      sharedAlbums: Reference(albumDoc)[] 

      // [uid]/[uid]/album/[albumId]
      sharedUsers: {uid, permission}[]
    ```

  <br>

  3. 홈 - 공유 앨범
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
      
      const { displayName, email } =
        await adminAppAuth.getUser(sharedAlbumUserUid);
    ```
    
  <br>

  4. 공유 앨범 상세
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
  <summary><h3>Masonry Layout</h3></summary>

  **CSS**
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

  **JS**
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

<br><br>
  
## 6. 유저 피드백 

<h3>비공개 테스트 설문</h3>

- 총 71개의 피드백 중 현재 46개 반영

<details>
  <summary><h4>피드백 목록</h4></summary>
  
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
  1. 한 번에 여러 장의 사진을 등록할 수 있으면 좋겠음
    -> input 파일 선택이 익숙하지 않은 사용자로 추정
  2. 처음에 모든 selectbox가 닫혀있어서 한 번 더 눌러야 하는 게 사용성이 안 좋은 것 같음
  3. 뭔가 지도의 핀을 움직여서 위치를 선택할 수 있는 기능이 있으면 좋겠음
  4. ~~체크 표시가 위치 추가 버튼이라는 것을 알기 어려웠음~~[#52](https://github.com/NeedsLap/MOMOO-Nextjs/issues/52)
  5. 업로드 버튼은 포커스가 마지막에 되면 좋겠음[#74](https://github.com/NeedsLap/MOMOO-Nextjs/issues/74)
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
  17. 사진 업로드 버튼에 포커스가 되면 좋겠음[#74](https://github.com/NeedsLap/MOMOO-Nextjs/issues/74)
  18. 사진뿐만 아니라 동영상도 저장할 수 있으면 좋겠음
  19. 탭바가 있어도 좋을 듯함
  20. ~~업로드되는 사진의 확장명을 추가하면 좋겠음(gif 등)~~[#53](https://github.com/NeedsLap/MOMOO-Nextjs/issues/53)
  21. ~~게시물 제목과 게시물 본문은 공백 포함 500자까지 제한 있음(안내 필요)~~[#269](https://github.com/yonainthefish/MoMoo/pull/269)
  22. ~~위치 선택 시, 지도가 뜨지 않는 버그~~(Kakao Developers에 주소 추가)
  23. ~~날씨와 기분 셀렉트 박스가 선택되지 않는 버그(위치 선택 오픈 시, 지도가 뜨지 않지만 영역을 차지하며 날씨/기분 셀렉트 박스를 가리고 있어서 선택되지 않음)~~
  
  <br>**게시물 수정**
  1. 원래 있던 정보들이 사라짐. 기존 정보들이 함께 떠 있는 상태에서 수정할 수 있으면 좋겠음

  <br>**앱**
  1. ~~안드로이드 기기의 뒤로가기 버튼을 누르면 앱이 종료됨~~[dc43540](https://github.com/NeedsLap/MOMOO-RN/commit/dc4354035b1fa3dd67586967f4874495e55c53f5)
  
  <br>**기타**
  1. ~~스크롤을 하며 계속해서 게시글을 보고 싶음~~[fe9614f](https://github.com/NeedsLap/MOMOO-Nextjs/commit/fe9614f14268176480502b19654b6e63d944af61)
  2. ~~앨범을 필수로 생성해야 사진이 업로드할 수 있거나, 앨범 생성 전 사진을 업로드해도 기본 앨범에 사진이 업로드되면 좋겠음<br>
     상황: 회원가입 시, '전체 보기' 앨범이 자동 생성되나 사용자는 인지하지 못함<br>
     해결1: 기존엔 업로드 후 이동한 피드 상세 페이지에서 해당 피드에 대한 정보만 볼 수 있음. '전체 보기'의 피드 상세 페이지로 이동하도록 변경하여, '전체 보기' 앨범이 자동 생성되고 해당 앨범에 저장되었음을 인지할 수 있도록 함~~(`${userUid}/전체 보기/feed`)<br>
     해결2: 회원가입 시, 튜토리얼
  4. ~~사진 슬라이드가 동작하지 않음<br>
    4-1. 업로드~~[3aabb70](https://github.com/yonainthefish/MoMoo/commits/71ad3d4470e98d2c34df6fbbe5391596f54aeee5)<br>
    ~~4-2. 게시물 상세 페이지~~[#35](https://github.com/NeedsLap/MOMOO-Nextjs/pull/35)
  5. ~~게시글 수정 후 게시글에서 `<` 뒤로가기 아이콘을 누르면 다시 게시글 수정 페이지가 나와서 불편함<br>
    - 개선: 게시물 수정 페이지 -> 모달로 통일~~[#32](https://github.com/NeedsLap/MOMOO-Nextjs/issues/32)
  6. ~~게시글 삭제를 하면 기존에 있던 페이지가 아니라 새 게시글 작성하는 페이지가 나와서 불편함
    - 상황: 게시물 생성 후 삭제 시 이전 페이지인 새 게시글 페이지로 이동됨
    - 개선: 새 게시글 페이지(게시물 업로드 페이지) -> 모달로 통일~~[#39](https://github.com/NeedsLap/MOMOO-Nextjs/pull/39)
  7. ~~confirm 창이나 alert창을 직접 만들지 않아서 UI가 예쁘지 않음~~[#191](https://github.com/yonainthefish/MoMoo/issues/191)
  8. 캘린더 형식으로 업로드한 날짜를 지정해 확인할 수 있는 기능이 있으면 좋겠음
  9. 앱 잠금 기능이 있으면 좋겠음
  10. ~~공유 기능 추가 희망~~[#253](https://github.com/yonainthefish/MoMoo/issues/253)
  11. 예쁜 이미지 사진으로 만들어져 사진으로 공유할 수 있으면 좋겠음
  12. ~~내비게이션 바에 홈 버튼이 a 태그와 button 태그로 이루어져서 포커스가 두 번 됨~~(#241)[https://github.com/yonainthefish/MoMoo/issues/241](270938c)[https://github.com/yonainthefish/MoMoo/commit/270938caf1635d0ee1eb806c8d0c7cd91535da98]
  13. ~~모달이 나왔을 땐, 모달 내에서만 포커스가 이동하면 좋겠음~~(#245)[https://github.com/yonainthefish/MoMoo/issues/245]
  14. ~~유효하지 않은 URL 접속 시, 내비게이션바는 나오면 좋을 것 같음~~(#231)[https://github.com/yonainthefish/MoMoo/issues/231]
  15. 아이콘의 퀄리티가 더 발전하면 좋겠음
  16. 앱의 컨셉이 더 분명하면 좋을 것 같음<br>
    16-1. 사진 업로드 메인일 경우, 앨범 상세 페이지에서 사용자가 업로드한 사진들이 모였을 때 뿌듯함을 느낄 만한 디자인 요소 추가하면 좋겠음<br>
    16-2. 일기 기능이 메인일 경우,<br>
      - 폰트 속성 변화 기능을 추가하면 좋겠음<br>
      - 나의 하루 기분을 주간/월간 그래프로 확인할 수 있는 기능 추가하면 좋겠음
  17. ~~튜토리얼이나 사용법을 알려주는 기능이 있으면 좋겠음~~ [이용가이드](https://www.notion.so/MOMOO-081ebf94df754542a17ad20bcf2e6fd4)
  18. 앨범이 여러 개가 되는 경우 스크롤이 너무 길어져서 핸드폰의 갤러리처럼 작아도 좋을 듯 함
  19. 전체보기가 시선을 강탈함
  20. ~~마이페이지 창에서 유저 프로필 기능을 따로 사용하지 않는다면 빼면 좋겠음(되는 줄 알고 몇 번 클릭함)~~[#91](https://github.com/NeedsLap/MOMOO-Nextjs/issues/91)
  21. 다른 사람과의 채팅 기능이 있었으면 신선할 것 같음

</details>
<br><br>
  
## 7. 🐛 트러블 슈팅

<details>
  <summary><h3>안드로이드 기기의 뒤로가기</h3></summary>
  
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
  <summary><h3>이미지 확장자 유효성 검사 - SVG</h3></summary>
</details>

<details>
  <summary><h3>Firestore - 이모티콘 저장 방식</h3></summary>
</details>

<details>
  <summary><h3>input - 유효성 알림</h3></summary>
</details>

<br><br>

## 8. 📚 프로젝트 관련 문서
- 💡 [노션: 기획 및 회의록](https://lumbar-distance-384.notion.site/momoo-moment-mood-33ccb07d75264f9d9bd1b1ca265f8db3)
- 💡 [피그마: 와이어프레임 & 디자인](https://www.figma.com/file/IXS4UPRbunlz1cI0ka5koi/momoo-design?type=design&node-id=74-2789&mode=design&t=pVd3Uehs4a6wFHNW-0)
<br><br>
<br><br>
