import { useScrollReveal } from '@hooks/useScrollReveal';
import Reveal from '@components/common/Reveal';
import weddingImg from '@images/band.jpg';
import './PhotoBand.scss';

interface PhotoBandProps {
  ratio?: string;
  label?: string;
  /** 이미지 위에 흰 글씨로 떠오르는 문구 (줄 단위) */
  caption?: string[];
}

/** 섹션 사이 전체 폭 이미지 띠. 스크롤 진입 시 하단에 흰 문구가 아래→위로 페이드 인 */
function PhotoBand({
  ratio = '4 / 5',
  label = '이미지',
  caption = ['서로 다른 길을 걸어온 두 사람,', '이제 같은 곳을 바라봅니다.'],
}: PhotoBandProps) {
  const { ref, revealed } = useScrollReveal<HTMLParagraphElement>(0.4);

  return (
    <Reveal
      variant='zoom'
      className='photo-band'
    >
      <img
        src={weddingImg}
        alt={label}
        className='photo-band__img'
        style={{ aspectRatio: ratio }}
        loading='lazy'
      />
      {caption.length > 0 && (
        <p
          ref={ref}
          className={`photo-band__caption ${revealed ? 'is-in' : ''}`}
        >
          {caption.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </p>
      )}
    </Reveal>
  );
}

export default PhotoBand;
