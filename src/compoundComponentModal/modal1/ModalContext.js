import React from 'react';
const ModalContext = React.createContext(null);

const Modal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = [isOpen, setIsOpen];

  return <ModalContext.Provider value={value} {...props} />;
};
