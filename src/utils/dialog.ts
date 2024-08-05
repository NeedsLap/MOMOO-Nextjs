const closeDialogOnClick = (e: React.MouseEvent<HTMLDialogElement>, closeDialog: () => void) => {
  if (e.target === e.currentTarget) {
    closeDialog();
  }
};

export default closeDialogOnClick;
