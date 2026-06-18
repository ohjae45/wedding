import ImagePlaceholder from '@components/common/ImagePlaceholder';
import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import { TIMELINE } from '@constants/wedding';
import './Timeline.scss';

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
                ratio='4 / 3'
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
