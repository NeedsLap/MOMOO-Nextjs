import { createContext, useState } from 'react';

interface ContextType {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  albumNameListToAdd: string[];
  setAlbumNameListToAdd: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadContext = createContext<ContextType>({
  isUploadModalOpen: false,
  setIsUploadModalOpen: () => {},
  albumNameListToAdd: ['전체 보기'],
  setAlbumNameListToAdd: () => {},
});

export default function UploadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [albumNameListToAdd, setAlbumNameListToAdd] = useState(['전체 보기']);

  return (
    <UploadContext.Provider
      value={{
        isUploadModalOpen,
        setIsUploadModalOpen,
        albumNameListToAdd,
        setAlbumNameListToAdd,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export { UploadContext };
