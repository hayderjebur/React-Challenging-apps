function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error(`useModal must be used in or within a Modal Component`);
  }
  return context;
}
