<div align=center>

<h1> MOMOO |  모무 </h1>

<br>

<h3> 네컷에 담긴 특별한 하루와 그 날의 MOMENT & MOOD를 기록하는 저장소 <br>  MOMOO 입니다.</h3>
<br><br>

</div>

<div align=center>

|프로젝트 기간|2023.09.29 - 2023.11.16|
|:--:|:--|
|리팩토링 기간|2023.11.20 ~|
|**웹사이트**|**[바로가기] 👉 https://momoo.kr**|
|**플레이스토어**|**[바로가기] 👉 https://play.google.com/store/apps/details?id=com.momoo&hl=en-KR**|
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

<br><br>

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

### Firestore Database

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
    album: String(albumName)[];
    emotionImage: String;
    weatherImage: String;
    timestamp: Timestamp;
  }
```

### Storage

```
  feed/{feedId + imageIndex}.{확장자}
  profile/{uid}.{확장자}
```

<br><br>

## 5. 📝 핵심기술

<details>
  <summary><h3>앨범 공유</h3></summary>

  **기능 소개**
  1. 사용자를 email(id)로 검색할 수 있다.
  2. 앨범을 공유하거나, 공유한 대상을 삭제할 수 있다.
  3. 홈에서 공유 앨범 리스트를 볼 수 있다.
  4. 공유 받은 앨범에 저장된 사진을 볼 수 있다.
  <br>
  
  **코드**
  1. 사용자 검색
  - Firebase Admin SDK를 사용하여, 사용자를 불러온다.
       
    ```js
      // src/app/api/user/route.ts
      adminApp.auth().getUserByEmail(email);
    ```
    
  <br>
   
  2. 공유/공유 취소
  - Firestore Database에 공유 정보 저장&삭제
    
    ```
      // [uid]/[uid]
      sharedAlbums: Reference(albumDoc)[] 

      // [uid]/[uid]/album/[albumId]
      sharedUsers: {uid, permission}[]
    ```

  <br>

  3. 홈 - 공유 앨범 리스트

  4. 공유 앨범 상세
  - 앨범 상세페이지 경로: {uid}/{albumName}
  - 피드 상세페이지 경로: {uid}/{albumName}/feed
  - Next.js로 만든 api를 통해, 공유 앨범/나의 앨범 구분없이 요청을 보낸다.
  
  ```
    // [uid]/[uid]
    sharedAlbums: Reference(albumDoc)[] 

    // [uid]/[uid]/album/[albumId]
    sharedUsers: {uid, permission}[]
  ```
  
</details>

<br><br>
  
## 6. 유저 피드백 

<br><br>
  
## 7. 🐛 트러블 슈팅 

<br><br>

## 8. 📚 프로젝트 관련 문서
- 💡 [노션: 기획 및 회의록](https://lumbar-distance-384.notion.site/momoo-moment-mood-33ccb07d75264f9d9bd1b1ca265f8db3)
- 💡 [피그마: 와이어프레임 & 디자인](https://www.figma.com/file/IXS4UPRbunlz1cI0ka5koi/momoo-design?type=design&node-id=74-2789&mode=design&t=pVd3Uehs4a6wFHNW-0)
<br><br>
<br><br>
