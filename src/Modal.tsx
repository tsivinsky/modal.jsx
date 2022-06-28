import React, { useEffect, useLayoutEffect, useMemo } from "react";
import ReactDOM from "react-dom";

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
  container?: HTMLElement | null;
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
  container,
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
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (!onEscapeDown) return;

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (isOpen) {
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [isOpen, onEscapeDown, handleKeyPress]);

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    if (enableBodyScroll) return;

    let lastBodyOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (isOpen && !enableBodyScroll) {
        document.body.style.overflow = lastBodyOverflow;
      }
    };
  }, [isOpen, enableBodyScroll]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return ReactDOM.createPortal(
    <div>
      <div
        style={_backdropStyles}
        className={backdropClassName}
        onClick={onClickOutside}
      />
      <div style={_modalStyles} {...props}>
        {children}
      </div>
    </div>,
    container || document.body
  );
};
