import type { CSSProperties } from 'react';
import './CoverParticles.scss';

type ParticleType = 'heart' | 'petal';

interface Particle {
  type: ParticleType;
  left: number; // 시작 가로 위치 (%)
  size: number; // px
  fallDuration: number; // 낙하 1회 시간 (s)
  delay: number; // 시작 지연 (s, 음수면 진행 중 상태로 시작)
  swayDuration: number; // 좌우 흔들림 주기 (s)
  drift: number; // 좌우 흔들림 폭 (px)
  opacity: number;
}

// 카카오톡 인앱 웹뷰는 GPU 합성이 약해 입자가 많으면 버벅입니다.
// 해당 환경에서만 입자 수를 줄여 부드럽게 유지합니다. (크롬/사파리는 그대로)
const isKakaoInApp =
  typeof navigator !== 'undefined' && /KAKAOTALK/i.test(navigator.userAgent);

// 모듈 로드 시 1회만 생성 → 리렌더에도 위치가 고정됩니다.
const COUNT = isKakaoInApp ? 10 : 22;
const PARTICLES: Particle[] = Array.from({ length: COUNT }, (_, i) => {
  const r = (n: number) => Math.random() * n;
  return {
    type: i % 9 === 0 ? 'heart' : 'petal', // 흰 꽃잎 위주 (하트는 아주 가끔)
    left: r(100),
    size: 9 + r(11),
    fallDuration: 9 + r(8),
    delay: -r(16), // 처음부터 화면 곳곳에 흩날리는 상태로 시작
    swayDuration: 3 + r(3),
    drift: 14 + r(26),
    opacity: 0.55 + r(0.4),
  };
});

function Shape({ type }: { type: ParticleType }) {
  if (type === 'heart') {
    return (
      <svg
        viewBox='0 0 24 24'
        width='100%'
        height='100%'
        aria-hidden
      >
        <path
          fill='#fdf6f2'
          d='M12 21s-7.6-4.9-10.1-9.6C-.2 8 1.7 3.8 5.5 3.8c2.4 0 4.1 1.7 5.2 3.6 1.1-1.9 2.8-3.6 5.2-3.6 3.8 0 5.7 4.2 3.6 7.6C19.6 16.1 12 21 12 21z'
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox='0 0 20 20'
      width='100%'
      height='100%'
      aria-hidden
    >
      <path
        fill='#ffffff'
        d='M10 0c4 5 4 13 0 20C6 13 6 5 10 0z'
      />
    </svg>
  );
}

/** 커버 위로 떠다니는 하트·꽃잎 파티클 (porto 인트로 연출) */
function CoverParticles() {
  return (
    <div
      className='cover-particles'
      aria-hidden
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className='cover-particles__fall'
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.fallDuration}s`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        >
          <span
            className='cover-particles__sway'
            style={
              {
                animationDuration: `${p.swayDuration}s`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
                '--drift': `${p.drift}px`,
              } as CSSProperties
            }
          >
            <Shape type={p.type} />
          </span>
        </span>
      ))}
    </div>
  );
}

export default CoverParticles;
