// interface AccordionEmoticonData {
//   question: string;
//   answer: { path: string; name: string }[];
// }

interface AlbumIdData {
  albumName: string;
  docId: string;
}

type AccordionDataType = [
  {
    question: '앨범 선택';
    answer: string[];
  },
  { question: '오늘의 날씨'; answer: { path: string; name: string }[] },
  { question: '오늘의 기분'; answer: { path: string; name: string }[] },
];

export type { AlbumIdData, AccordionDataType };

// 공동 커밋 테스트
