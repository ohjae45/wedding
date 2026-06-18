import { useState } from 'react';
import ImagePlaceholder from '@components/common/ImagePlaceholder';
import SectionTitle from '@components/common/SectionTitle';
import { GALLERY_COUNT } from '@constants/wedding';
import './Gallery.scss';

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const items = Array.from({ length: GALLERY_COUNT }, (_, i) => i);

  const close = () => setActive(null);
  const move = (dir: number) =>
    setActive((cur) => {
      if (cur === null) return cur;
      return (cur + dir + GALLERY_COUNT) % GALLERY_COUNT;
    });

  return (
    <section className='gallery section'>
      <SectionTitle
        en='GALLERY'
        ko='갤러리'
      />

      <div className='gallery__grid'>
        {items.map((i) => (
          <button
            key={i}
            type='button'
            className='gallery__item'
            onClick={() => setActive(i)}
            aria-label={`갤러리 이미지 ${i + 1} 크게 보기`}
          >
            <ImagePlaceholder
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
              ratio='3 / 4'
              label={`이미지 ${active + 1} / ${GALLERY_COUNT}`}
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
