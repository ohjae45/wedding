import './Loading.scss';

interface LoadingProps {
  /** 0~100 진행률 */
  progress: number;
  /** 로딩 완료 → 페이드아웃 시작 */
  done: boolean;
  /** 페이드아웃 트랜지션 종료 시 호출 (언마운트 신호) */
  onExited: () => void;
}

// 차오르는 하트 로딩 화면 (시안 B)
function Loading({ progress, done, onExited }: LoadingProps) {
  const pct = Math.round(progress);

  return (
    <div
      className={`loading${done ? ' loading--out' : ''}`}
      onTransitionEnd={(e) => {
        if (done && e.propertyName === 'opacity') onExited();
      }}
    >
      <div className='loading__heart'>
        <svg
          className='loading__heart-outline'
          viewBox='0 0 100 100'
          aria-hidden
        >
          <path d='M50 86 C12 58 6 36 22 24 C34 15 47 22 50 34 C53 22 66 15 78 24 C94 36 88 58 50 86 Z' />
        </svg>
        <div
          className='loading__heart-fill'
          style={{ clipPath: `inset(${100 - pct}% 0 0 0)` }}
        >
          <svg
            viewBox='0 0 100 100'
            aria-hidden
          >
            <path d='M50 86 C12 58 6 36 22 24 C34 15 47 22 50 34 C53 22 66 15 78 24 C94 36 88 58 50 86 Z' />
          </svg>
        </div>
      </div>

      <p className='loading__pct'>{pct}%</p>
      <p className='loading__cap'>초대장을 준비하고 있어요</p>
    </div>
  );
}

export default Loading;
