import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis: Lenis | null;
  }
}

export const useLenis = (targetElement?: HTMLElement | string) => {
  useEffect(() => {
    let lenis: Lenis | null = null;

    if (targetElement) {
      const element = typeof targetElement === 'string' 
        ? document.querySelector(targetElement) as HTMLElement
        : targetElement;

      if (element) {
        lenis = new Lenis({
          wrapper: element,
          content: element.firstElementChild as HTMLElement,
          smoothWheel: true,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    } else {
      lenis = new Lenis({
        smoothWheel: true,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    if (lenis) {

      window.__lenis = lenis;
      function raf(time: number) {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis!.destroy();
        if(window.__lenis === lenis) {
          window.__lenis = null;
        }
      };
    }
  }, [targetElement]);
};
