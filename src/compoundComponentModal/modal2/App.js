import React, { useState, useEffect, useCallback } from 'react';

function Modal({ toggle, setToggle, children, ...restProps }) {
  return toggle
    ? ReactDOM.createPortal(
        <div>
          <div>
            <Close onClick={() => setToggle(!toggle)} />
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}

Modal.Header = function ModalHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Modal.Body = function ModalBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};

function App() {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <>
      <button type='button' onClick={() => setToggleModal(!toggleModal)}>
        Toggle Modal
      </button>

      <Modal toggle={toggleModal} setToggle={setToggleModal}>
        <Modal.Header>👋 Hello, I am a Header</Modal.Header>
        <Modal.Body>
          Suspendisse potenti. Vivamus ipsum erat, consequat ut dui eget,
          vulputate fermentum ex. Donec luctus libero lacus, nec facilisis odio
          convallis eu. Nunc interdum at ex in ultrices. Suspendisse et ultrices
          ipsum. Integer vitae tristique turpis, congue interdum eros. Aliquam
          dignissim posuere velit eu fermentum.
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
