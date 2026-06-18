import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '@hooks/useScrollReveal';
import './Reveal.scss';

type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'fade';

interface RevealProps {
  children: ReactNode;
  /** 등장 방향/방식 */
  variant?: RevealVariant;
  /** 등장 지연 (초) */
  delay?: number;
  className?: string;
}

/** 스크롤 진입 시 부드럽게 나타나는 래퍼 (porto 스타일 fade-up/slide/zoom) */
function Reveal({ children, variant = 'up', delay = 0, className }: RevealProps) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[
        'reveal',
        `reveal--${variant}`,
        revealed ? 'reveal--in' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ transitionDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export default Reveal;
