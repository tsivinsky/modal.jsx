import { useRef, useState } from "react";
import { Modal } from "../../src";

import "./App.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalRoot = useRef<HTMLDivElement>(null);

  return (
    <div className="root">
      <h1>app w/ modal.jsx</h1>
      <button onClick={openModal}>open modal</button>

      <div ref={modalRoot} />

      <Modal
        className="modal"
        backdropClassName="backdrop"
        isOpen={isOpen}
        onEscapeDown={closeModal}
        onClickOutside={closeModal}
        container={modalRoot.current}
      >
        <h2>modal.jsx</h2>
        <p>just a sample text</p>
        <button onClick={closeModal}>close modal</button>
      </Modal>
    </div>
  );
}
