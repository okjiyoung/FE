"use client";

import { useEffect, useState } from "react";

export function useBottomSheetTransition(isOpen: boolean, duration = 300) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // isOpen 변화를 렌더링 중에 즉시 반영함 (effect 안에서 동기적으로 setState하지 않는 React 권장 패턴)
  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }
  if (!isOpen && isVisible) {
    setIsVisible(false);
  }

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const timeout = setTimeout(() => setShouldRender(false), duration);
    return () => clearTimeout(timeout);
  }, [isOpen, duration]);

  return { shouldRender, isVisible };
}
