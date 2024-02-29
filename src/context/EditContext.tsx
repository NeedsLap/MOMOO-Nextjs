import { createContext, useState } from 'react';

interface ContextType {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  feedIdToEdit: string;
  setFeedIdToEdit: React.Dispatch<React.SetStateAction<string>>;
}

const EditContext = createContext<ContextType>({
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  feedIdToEdit: '',
  setFeedIdToEdit: () => {},
});

export default function EditContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [feedIdToEdit, setFeedIdToEdit] = useState('');

  return (
    <EditContext.Provider
      value={{
        isEditModalOpen,
        setIsEditModalOpen,
        feedIdToEdit,
        setFeedIdToEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export { EditContext };
