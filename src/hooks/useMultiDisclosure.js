import { useState } from "react";

export function useMultiDisclosure() {
  const [modalState, setModalState] = useState({});

  const onOpen = (modalKey) => {
    setModalState((prevState) => ({ ...prevState, [modalKey]: true }));
  };

  const onClose = (modalKey) => {
    setModalState((prevState) => ({ ...prevState, [modalKey]: false }));
  };

  const isOpen = (modalKey) => !!modalState[modalKey];

  return { onOpen, onClose, isOpen };
}
