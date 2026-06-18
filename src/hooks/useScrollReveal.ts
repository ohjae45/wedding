import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 뷰포트에 들어오면 한 번 노출 상태로 전환합니다.
 * 섹션 진입 시 페이드/슬라이드 애니메이션 트리거에 사용합니다.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, revealed]);

  return { ref, revealed };
}
