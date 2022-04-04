import React, { useMemo } from "react";

const backdropStyles: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "lightgray",
  opacity: 0.5,
  cursor: "pointer",
};

const modalStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
};

export type ModalProps = JSX.IntrinsicElements["div"] & {
  isOpen: boolean;
  onClickOutside?: () => void;
  backdropClassName?: string;
  zIndex?: number;
  backdropZIndex?: number;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClickOutside,
  backdropClassName,
  children,
  style,
  zIndex = 10010,
  backdropZIndex = 10000,
  ...props
}) => {
  const _backdropStyles = useMemo(
    () => ({
      zIndex: backdropZIndex,
      ...backdropStyles,
    }),
    [backdropZIndex]
  );

  const _modalStyles = useMemo(
    () => ({
      zIndex,
      ...modalStyles,
      ...style,
    }),
    [zIndex]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div
        style={_backdropStyles}
        className={backdropClassName}
        onClick={onClickOutside}
      />
      <div style={_modalStyles} {...props}>
        {children}
      </div>
    </div>
  );
};
