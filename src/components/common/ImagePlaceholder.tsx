import weddingImg from '@images/wedding.jpeg';
import './ImagePlaceholder.scss';

interface ImagePlaceholderProps {
  /** 표시할 이미지 경로. 없으면 기본 이미지(wedding.jpeg) 사용 */
  src?: string;
  /** CSS aspect-ratio 값 (예: '3 / 4', '1 / 1') — 틀(프레임) 비율 */
  ratio?: string;
  /** 이미지 alt 텍스트 */
  label?: string;
  rounded?: boolean;
  /** object-fit:cover 시 이미지 정렬 기준 (예: 'bottom', 'center') */
  objectPosition?: string;
}

/**
 * 이미지 슬롯. src 가 주어지면 해당 이미지를, 없으면 기본 wedding.jpeg 를 사용합니다.
 * 틀(aspect-ratio)은 유지하고, object-fit:cover 로 이미지 원본 비율을 왜곡 없이 채웁니다.
 */
function ImagePlaceholder({
  src,
  ratio = '3 / 4',
  label = '이미지',
  rounded = false,
  objectPosition,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`image-placeholder${rounded ? ' image-placeholder--rounded' : ''}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src ?? weddingImg}
        alt={label}
        className='image-placeholder__img'
        style={objectPosition ? { objectPosition } : undefined}
        loading='lazy'
      />
    </div>
  );
}

export default ImagePlaceholder;
