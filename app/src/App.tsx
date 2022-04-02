import React, { useState } from "react";
import { Modal } from "../../src";

const modalStyles: React.CSSProperties = {
  background: "#ffffff",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 0 18px rgba(0, 0, 0, 0.2)",
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <h1>app w/ modal.jsx</h1>
      <button onClick={openModal}>open modal</button>

      <Modal style={modalStyles} isOpen={isOpen} onClickOutside={closeModal}>
        <h2>modal.jsx</h2>
        <p>just a sample text</p>
        <button onClick={closeModal}>close modal</button>
      </Modal>
    </div>
  );
}
