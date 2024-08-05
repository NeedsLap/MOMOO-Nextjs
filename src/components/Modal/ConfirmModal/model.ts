export default interface ConfirmModalProps {
  onClose: () => void;
  handleAgreeBtn: () => void;
  title: string;
  text?: string;
  btnNameList: string[];
}
