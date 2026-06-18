import weddingImg from '@images/wedding.jpeg';
import './ImagePlaceholder.scss';

interface ImagePlaceholderProps {
  /** CSS aspect-ratio 값 (예: '3 / 4', '1 / 1') — 틀(프레임) 비율 */
  ratio?: string;
  /** 이미지 alt 텍스트 */
  label?: string;
  rounded?: boolean;
}

/**
 * 이미지 슬롯. 현재는 테스트용으로 wedding.jpeg 를 모든 자리에 사용합니다.
 * 틀(aspect-ratio)은 유지하고, object-fit:cover 로 이미지 원본 비율을 왜곡 없이 채웁니다.
 * 실제 이미지로 교체할 때는 src 만 바꾸면 됩니다.
 */
function ImagePlaceholder({ ratio = '3 / 4', label = '이미지', rounded = false }: ImagePlaceholderProps) {
  return (
    <div
      className={`image-placeholder${rounded ? ' image-placeholder--rounded' : ''}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={weddingImg}
        alt={label}
        className='image-placeholder__img'
        loading='lazy'
      />
    </div>
  );
}

export default ImagePlaceholder;
