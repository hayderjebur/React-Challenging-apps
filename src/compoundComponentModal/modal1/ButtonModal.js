const ModalButton = ({ children: child }) => {
  const [, setIsOpen] = useModal();

  return React.cloneElement(child, {
    onClick: () => setIsOpen(true),
  });
};
