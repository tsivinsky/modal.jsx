# modal.jsx

Modal component for React

## Install

#### yarn

```bash
yarn add modal.jsx
```

#### npm

```bash
npm i modal.jsx
```

## Usage

```tsx
import { useState } from "react";
import { Modal } from "modal.jsx";

const YourComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open modal</button>

      <Modal isOpen={isModalOpen}>
        {/* Your content here */}
        <h2>Title</h2>
        <p>Some description</p>
        <button onClick={closeModal}>Exit</button>
      </Modal>
    </div>
  );
};
```

## Available props

```tsx
export type ModalProps = JSX.IntrinsicElements["div"] & {
  isOpen: boolean; // React state for describing if modal is open or not
  onClickOutside?: () => void; // Optinal callback, which runs when user clicks on backdrop div
  onEscapeDown?: () => void; // Optional callback, which runs when user presses Escape key and modal is open
  backdropClassName?: string; // add here your className for backdrop div
  zIndex?: number; // change zIndex for modal content div - default: 10010
  backdropZIndex?: number; // change zIndex for backdrop div - default: 10000
  enableBodyScroll?: boolean; // enable scroll on body element when modal is open - default: false
};
```
