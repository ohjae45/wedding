import ImagePlaceholder from '@components/common/ImagePlaceholder';
import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import { TIMELINE } from '@constants/wedding';
import storyLove from '@images/story-love.jpeg';
import storyPropose from '@images/story-propose.jpeg';
import storyWedding from '@images/story-wedding.jpeg';
import './Timeline.scss';

// 타임라인 항목별 사진 (없는 항목은 기본 이미지 사용)
const IMAGE_BY_TITLE: Record<string, string> = {
  '연애 시작': storyLove,
  프로포즈: storyPropose,
  결혼식: storyWedding,
};

function Timeline() {
  return (
    <section className='timeline section'>
      <SectionTitle
        en='OUR TIMELINE'
        ko='두 사람의 이야기'
      />

      <ul className='timeline__list'>
        {TIMELINE.map((item, i) => (
          <li
            key={item.title}
            className={`timeline__item${i % 2 === 1 ? ' timeline__item--alt' : ''}`}
          >
            <Reveal
              variant={i % 2 === 0 ? 'left' : 'right'}
              className='timeline__photo'
            >
              <ImagePlaceholder
                src={IMAGE_BY_TITLE[item.title]}
                ratio='3 / 4'
                label={item.date}
                rounded
              />
            </Reveal>
            <div className='timeline__text'>
              <span className='timeline__date'>{item.date}</span>
              <h3 className='timeline__title'>{item.title}</h3>
              <p className='timeline__desc'>{item.desc}</p>
            </div>
            <span
              className='timeline__dot'
              aria-hidden
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Timeline;
