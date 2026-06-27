import { useState } from 'react';
import ImagePlaceholder from '@components/common/ImagePlaceholder';
import SectionTitle from '@components/common/SectionTitle';
import './Gallery.scss';

// src/assets/images 의 모든 .jpg 사진을 갤러리에 로드 (회전된 테스트용 wedding.jpeg 는 .jpeg 라 제외)
// 순서: main → gallery-01..NN → band
const rank = (p: string) => (p.includes('/main.') ? 0 : p.includes('/band.') ? 2 : 1);
const IMAGES = Object.entries(
  import.meta.glob<string>('@images/*.jpg', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
  .map(([, url]) => url);

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const count = IMAGES.length;

  const close = () => setActive(null);
  const move = (dir: number) =>
    setActive((cur) => {
      if (cur === null) return cur;
      return (cur + dir + count) % count;
    });

  return (
    <section className='gallery section'>
      <SectionTitle
        en='GALLERY'
        ko='갤러리'
      />

      <div className='gallery__grid'>
        {IMAGES.map((src, i) => (
          <button
            key={src}
            type='button'
            className='gallery__item'
            onClick={() => setActive(i)}
            aria-label={`갤러리 이미지 ${i + 1} 크게 보기`}
          >
            <ImagePlaceholder
              src={src}
              ratio='1 / 1'
              label={`${i + 1}`}
            />
          </button>
        ))}
      </div>

      <p className='gallery__hint'>사진을 누르면 크게 볼 수 있어요</p>

      {active !== null && (
        <div
          className='gallery__lightbox'
          role='dialog'
          aria-modal='true'
          onClick={close}
        >
          <button
            type='button'
            className='gallery__close'
            onClick={close}
            aria-label='닫기'
          >
            ×
          </button>
          <button
            type='button'
            className='gallery__nav gallery__nav--prev'
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label='이전'
          >
            ‹
          </button>
          <div
            className='gallery__stage'
            onClick={(e) => e.stopPropagation()}
          >
            <ImagePlaceholder
              src={IMAGES[active]}
              ratio='3 / 4'
              label={`이미지 ${active + 1} / ${count}`}
              rounded
            />
          </div>
          <button
            type='button'
            className='gallery__nav gallery__nav--next'
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label='다음'
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
