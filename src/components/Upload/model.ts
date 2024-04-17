interface AccordionData {
  question: string;
  answer: { path: string; name: string }[];
}

interface AlbumIdData {
  albumName: string;
  docId: string;
}

export type { AccordionData, AlbumIdData };
