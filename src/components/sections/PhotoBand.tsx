import Reveal from '@components/common/Reveal';
import weddingImg from '@images/wedding.jpeg';
import './PhotoBand.scss';

interface PhotoBandProps {
  ratio?: string;
  label?: string;
}

/** 섹션 사이 전체 폭 이미지 띠 (테스트: wedding.jpeg). 틀 비율 유지 + object-fit:cover */
function PhotoBand({ ratio = '4 / 5', label = '이미지' }: PhotoBandProps) {
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
    </Reveal>
  );
}

export default PhotoBand;
