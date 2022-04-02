import React from "react";

const backdropStyles: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 10000,
  background: "lightgray",
  opacity: 0.5,
  cursor: "pointer",
};

const modalStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  zIndex: 10010,
};

export type ModalProps = JSX.IntrinsicElements["div"] & {
  isOpen: boolean;
  onClickOutside: () => void;
  backdropClassName?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClickOutside,
  backdropClassName,
  children,
  style,
  ...props
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div
        style={backdropStyles}
        className={backdropClassName}
        onClick={onClickOutside}
      />
      <div style={{ ...style, ...modalStyles }} {...props}>
        {children}
      </div>
    </div>
  );
};
