//modal context
const ModalContext = React.createContext(null);

//modal parent
const Modal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = [isOpen, setIsOpen];

  return <ModalContext.Provider value={value} {...props} />;
};

//useModal Hook
function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used in or within a Modal Component');
  }
  return context;
}

//Modal Button
const ModalButton = ({ children: child }) => {
  const [, setIsOpen] = useModal();

  return React.cloneElement(child, {
    onClick: () => setIsOpen(true),
  });
};

//Modal Contentx
const ModalContents = ({ children }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useModal();

  return (
    <div
      style={{
        padding: '15px',
        boxShadow: '3px 3px 5px 6px #ccc',
        borderRadius: '10px',
        position: 'absolute',
        background: 'var(--bg)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: isOpen ? 'block' : 'none',
      }}
    >
      <button onClick={closeModal}>X</button>
      <div className='modal-content'>{children}</div>
    </div>
  );
};

render(
  <Modal>
    <ModalButton>
      <button>Click Me!</button>
    </ModalButton>
    <ModalContents>
      <p>I am a content inside a Modal hooray!</p>
    </ModalContents>
  </Modal>
);
