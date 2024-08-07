interface MoreModalBtns {
  name: string;
  clickEventHandler: () => void;
}

interface MoreModalProps {
  title: string;
  closeModal: () => void;
  btnList: MoreModalBtns[];
}

export default MoreModalProps;
