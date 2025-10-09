import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom hook for common GSAP animations
 */
export const useAnimations = () => {
  return {
    // Fade in animation for page mount
    fadeIn: (element: HTMLElement | null, delay = 0) => {
      if (!element) return;
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
        }
      );
    },

    // Stagger animation for card grids
    staggerCards: (
      elements: HTMLElement[] | NodeListOf<Element>,
      delay = 0
    ) => {
      if (!elements || elements.length === 0) return;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          delay,
          ease: "back.out(1.2)",
        }
      );
    },

    // Slide in from side
    slideInFromLeft: (element: HTMLElement | null, delay = 0) => {
      if (!element) return;
      gsap.fromTo(
        element,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay,
          ease: "power3.out",
        }
      );
    },

    slideInFromRight: (element: HTMLElement | null, delay = 0) => {
      if (!element) return;
      gsap.fromTo(
        element,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay,
          ease: "power3.out",
        }
      );
    },

    // Scale pop animation
    scalePop: (element: HTMLElement | null, delay = 0) => {
      if (!element) return;
      gsap.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay,
          ease: "back.out(1.7)",
        }
      );
    },

    // Hover scale effect (call on mouseenter/mouseleave)
    hoverScale: (element: HTMLElement | null, scale = 1.05) => {
      if (!element) return;
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: "power2.out",
      });
    },

    hoverScaleReset: (element: HTMLElement | null) => {
      if (!element) return;
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },

    // Shake animation
    shake: (element: HTMLElement | null, intensity = 10) => {
      if (!element) return;
      gsap.to(element, {
        x: intensity,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(element, { x: 0 });
        },
      });
    },

    // Pulse animation
    pulse: (element: HTMLElement | null, scale = 1.1) => {
      if (!element) return;
      gsap.to(element, {
        scale,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    },

    // Number counter animation
    countUp: (
      element: HTMLElement | null,
      endValue: number,
      duration = 1
    ) => {
      if (!element) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = Math.round(obj.value).toString();
        },
      });
    },

    // Smooth height transition
    expandHeight: (element: HTMLElement | null, height: number | "auto") => {
      if (!element) return;
      gsap.to(element, {
        height,
        duration: 0.4,
        ease: "power2.inOut",
      });
    },

    // Color transition
    colorTransition: (
      element: HTMLElement | null,
      from: string,
      to: string,
      duration = 0.3
    ) => {
      if (!element) return;
      gsap.fromTo(
        element,
        { backgroundColor: from },
        {
          backgroundColor: to,
          duration,
          ease: "power2.inOut",
        }
      );
    },
  };
};

/**
 * Hook for page fade-in animation on mount
 */
export const usePageAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return containerRef;
};

/**
 * Hook for card grid stagger animation on mount
 */
export const useCardStaggerAnimation = (deps: unknown[] = []) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll("[data-animate-card]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.2)",
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return cardsRef;
};

/**
 * Hook for stat cards animation with number counter
 */
export const useStatCardsAnimation = (values: number[]) => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll("[data-stat-card]");
      
      // Animate cards in
      gsap.fromTo(
        statCards,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.4)",
        }
      );

      // Animate numbers
      statCards.forEach((card, index) => {
        const numberElement = card.querySelector("[data-stat-number]");
        if (numberElement && values[index] !== undefined) {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: values[index],
            duration: 1,
            delay: 0.3 + index * 0.1,
            ease: "power2.out",
            onUpdate: () => {
              numberElement.textContent = Math.round(obj.value).toString();
            },
          });
        }
      });
    }
  }, [values]);

  return statsRef;
};

export default useAnimations;
