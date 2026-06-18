import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import { CONTACTS } from '@constants/wedding';
import './Contact.scss';

function Contact() {
  return (
    <section className='contact section'>
      <SectionTitle
        en='CONTACT'
        ko='연락하기'
      />
      <Reveal>
        <ul className='contact__list'>
          {CONTACTS.map((c) => (
            <li
              key={c.label}
              className='contact__item'
            >
              <div className='contact__who'>
                <span className='contact__label'>{c.label}</span>
                <span className='contact__name'>{c.name}</span>
              </div>
              <div className='contact__actions'>
                <a
                  href={`tel:${c.tel}`}
                  aria-label={`${c.name}에게 전화`}
                >
                  전화
                </a>
                <a
                  href={`sms:${c.tel}`}
                  aria-label={`${c.name}에게 문자`}
                >
                  문자
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export default Contact;
