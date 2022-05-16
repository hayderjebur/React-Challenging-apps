const ModalContents = ({ children }) => {
  const [isOpen, setIsOpen] = useModal();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        padding: '15px',
        boxShadow: '3px 3px 5px 6px #ccc',
        borderRadius: '10px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: `${isOpen ? 'block' : 'none'}`,
      }}
    >
      <button onClick={closeModal}>X</button>
      <div className='modal-content'>{children}</div>
    </div>
  );
};

export { Modal, ModalButton, ModalContents };
