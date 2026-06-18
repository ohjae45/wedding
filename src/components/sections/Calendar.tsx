import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import { BRIDE, GROOM, VENUE, WEDDING_DATE } from '@constants/wedding';
import { useCountdown } from '@hooks/useCountdown';
import { formatFullKoDate, formatKoTime, WEEKDAYS_KO } from '@utils/format';
import './Calendar.scss';

/** 예식 월의 달력 셀(앞쪽 빈칸 포함)을 만든다. */
function buildCells(date: Date): (number | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = Array.from({ length: firstWeekday }, () => null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  return cells;
}

function Calendar() {
  const cells = buildCells(WEDDING_DATE);
  const weddingDay = WEDDING_DATE.getDate();
  const { days, hours, minutes, seconds, isPast } = useCountdown(WEDDING_DATE);

  const goGuestbook = () => document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className='calendar section'
      id='calendar'
    >
      <SectionTitle
        en='WEDDING DAY'
        ko='예식 일시'
      />

      <Reveal>
        <p className='calendar__date'>{formatFullKoDate(WEDDING_DATE)}</p>
        <p className='calendar__time'>{formatKoTime(WEDDING_DATE)}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className='calendar__grid'>
          {WEEKDAYS_KO.map((w, i) => (
            <span
              key={w}
              className={`calendar__head${i === 0 ? ' calendar__head--sun' : ''}`}
            >
              {w}
            </span>
          ))}
          {cells.map((d, i) => {
            const isWedding = d === weddingDay;
            const isSunday = i % 7 === 0;
            return (
              <span
                key={i}
                className={[
                  'calendar__cell',
                  d === null ? 'calendar__cell--empty' : '',
                  isSunday ? 'calendar__cell--sun' : '',
                  isWedding ? 'calendar__cell--wedding' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {d}
              </span>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className='calendar__countdown'>
          {[
            { label: 'DAYS', value: days },
            { label: 'HOUR', value: hours },
            { label: 'MIN', value: minutes },
            { label: 'SEC', value: seconds },
          ].map((item) => (
            <div
              key={item.label}
              className='calendar__count-item'
            >
              <strong>{String(item.value).padStart(2, '0')}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <p className='calendar__dday'>
          {isPast ? (
            '두 사람의 새로운 시작을 축복해 주셔서 감사합니다.'
          ) : (
            <>
              {GROOM.firstName}, {BRIDE.firstName}의 결혼식이 <b>{days}일</b> 남았습니다.
            </>
          )}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className='calendar__info'>
          <li>
            <span
              className='calendar__info-icon'
              aria-hidden
            >
              🕐
            </span>
            <span>
              {formatFullKoDate(WEDDING_DATE)} {formatKoTime(WEDDING_DATE)}
            </span>
          </li>
          <li>
            <span
              className='calendar__info-icon'
              aria-hidden
            >
              📍
            </span>
            <span>
              {VENUE.name} {VENUE.hall}
            </span>
          </li>
        </ul>

        <button
          type='button'
          className='calendar__guestbook-btn'
          onClick={goGuestbook}
        >
          방명록 남기기
        </button>
      </Reveal>
    </section>
  );
}

export default Calendar;
