import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import KakaoMap from '@components/sections/KakaoMap';
import { DIRECTIONS, VENUE } from '@constants/wedding';
import { copyText } from '@utils/clipboard';
import './Location.scss';

const q = encodeURIComponent(VENUE.name);

// 길찾기 딥링크 (지도 앱/웹 열기) — 키 없이 동작
const MAP_LINKS = [
  { label: '네이버지도', href: `https://map.naver.com/v5/search/${q}` },
  { label: '카카오맵', href: `https://map.kakao.com/?q=${q}` },
];

function Location() {
  const handleCopy = async () => {
    const ok = await copyText(VENUE.address);
    alert(ok ? '주소가 복사되었습니다.' : '복사에 실패했습니다.');
  };

  return (
    <section
      className='location section'
      id='location'
    >
      <SectionTitle
        en='LOCATION'
        ko='오시는 길'
      />

      <Reveal>
        <div className='location__head'>
          <h3 className='location__name'>{VENUE.name}</h3>
          <p className='location__hall'>{VENUE.hall}</p>
          <p className='location__addr'>{VENUE.address}</p>
          <div className='location__actions'>
            <button
              type='button'
              onClick={handleCopy}
            >
              주소 복사
            </button>
            <a href={`tel:${VENUE.tel}`}>전화 {VENUE.tel}</a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        {/* 카카오맵 임베드 — .env 의 VITE_KAKAO_MAP_KEY 가 있으면 실제 지도,
            없으면 카카오맵으로 열리는 자리표시로 자동 대체됩니다. */}
        <div className='location__map'>
          <KakaoMap />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className='location__maps'>
          {MAP_LINKS.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target='_blank'
              rel='noreferrer'
            >
              {m.label}
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <ul className='location__directions'>
          {DIRECTIONS.map((d) => (
            <li key={d.label}>
              <span className='location__dir-label'>{d.label}</span>
              <span className='location__dir-desc'>{d.desc}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export default Location;
