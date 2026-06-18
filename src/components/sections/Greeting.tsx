import Reveal from '@components/common/Reveal';
import { BRIDE, BRIDE_PARENTS, GREETING, GROOM, GROOM_PARENTS } from '@constants/wedding';
import './Greeting.scss';

function Greeting() {
  return (
    <section className='greeting section'>
      <Reveal>
        <div className='greeting__poem'>
          {GREETING.poem.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className='greeting__body'>
          {GREETING.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className='greeting__parents'>
          <p>
            <span className='greeting__pname'>
              {GROOM_PARENTS.father} · {GROOM_PARENTS.mother}
            </span>
            <span className='greeting__rel'>의 {GROOM.relation}</span>
            <span className='greeting__child'>
              {GROOM.lastName}
              {GROOM.firstName}
            </span>
          </p>
          <p>
            <span className='greeting__pname'>
              {BRIDE_PARENTS.father} · {BRIDE_PARENTS.mother}
            </span>
            <span className='greeting__rel'>의 {BRIDE.relation}</span>
            <span className='greeting__child'>
              {BRIDE.lastName}
              {BRIDE.firstName}
            </span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export default Greeting;
