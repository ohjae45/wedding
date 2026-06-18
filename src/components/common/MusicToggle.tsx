import { useEffect, useRef } from 'react';
import { useMusicStore } from '@stores/useMusicStore';
import './MusicToggle.scss';

/**
 * 우상단 고정 배경음악 토글.
 * 아직 곡이 정해지지 않아 audio src 는 비어 있습니다.
 * 곡이 정해지면 BGM_SRC 에 파일 경로를 넣으면 바로 재생됩니다.
 */
const BGM_SRC = ''; // 예: '/bgm.mp3'

function MusicToggle() {
  const { playing, toggle, setPlaying } = useMusicStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !BGM_SRC) return;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, setPlaying]);

  return (
    <button
      type='button'
      className={`music-toggle${playing ? ' music-toggle--on' : ''}`}
      onClick={toggle}
      aria-label={playing ? '배경음악 끄기' : '배경음악 켜기'}
    >
      <span className='music-toggle__disc'>
        <svg
          viewBox='0 0 24 24'
          width='16'
          height='16'
          aria-hidden
        >
          <path
            fill='currentColor'
            d='M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z'
          />
        </svg>
      </span>
      {BGM_SRC && (
        <audio
          ref={audioRef}
          src={BGM_SRC}
          loop
        />
      )}
    </button>
  );
}

export default MusicToggle;
