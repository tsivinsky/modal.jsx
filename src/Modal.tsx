import React, { useEffect, useMemo } from "react";

const backdropStyles: React.CSSProperties = {
  position: "fixed",
  inset: 0,
};

const modalStyles: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
};

export type ModalProps = JSX.IntrinsicElements["div"] & {
  isOpen: boolean;
  onClickOutside?: () => void;
  onEscapeDown?: () => void;
  backdropClassName?: string;
  zIndex?: number;
  backdropZIndex?: number;
  enableBodyScroll?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClickOutside,
  onEscapeDown,
  backdropClassName,
  children,
  style,
  zIndex = 10010,
  backdropZIndex = 10000,
  enableBodyScroll = false,
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

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onEscapeDown?.();
    }
  };

  useEffect(() => {
    if (!onEscapeDown) return;

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onEscapeDown, handleKeyPress]);

  if (!isOpen) {
    document.body.style.overflowY = "auto";
    return null;
  }

  if (document.body.style.overflowY !== "hidden") {
    document.body.style.overflowY = "hidden";
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
