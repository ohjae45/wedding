import { useEffect, useState } from 'react';
import Loading from '@components/common/Loading';
import About from '@components/sections/About';
import Account from '@components/sections/Account';
import Calendar from '@components/sections/Calendar';
import Contact from '@components/sections/Contact';
import Cover from '@components/sections/Cover';
import Footer from '@components/sections/Footer';
import Gallery from '@components/sections/Gallery';
import Greeting from '@components/sections/Greeting';
import Guestbook from '@components/sections/Guestbook';
import Location from '@components/sections/Location';
import PhotoBand from '@components/sections/PhotoBand';
import QuickNav from '@components/sections/QuickNav';
import Share from '@components/sections/Share';
import Timeline from '@components/sections/Timeline';
import weddingImg from '@images/main.webp';
import './App.scss';

// 로딩 화면 최소 표시 시간(ms) — 캐시된 이미지에서 깜빡이듯 사라지는 것을 방지
const MIN_LOADING_MS = 600;

function App() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false); // 커버 등장(로딩 완료)
  const [loaderGone, setLoaderGone] = useState(false); // 로더 페이드아웃 종료 → 언마운트

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();

    // 로더를 최소 시간만큼은 보여준 뒤 완료 처리
    const finish = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_LOADING_MS - (performance.now() - start));
      setProgress(100);
      window.setTimeout(() => {
        if (!cancelled) setActive(true);
      }, wait);
    };

    // 이미지를 디코딩까지 끝낸 뒤 완료
    const decodeAndFinish = () => {
      const img = new Image();
      img.src = weddingImg;
      const ready = img.decode ? img.decode() : Promise.resolve();
      ready.catch(() => {}).finally(finish);
    };

    // fetch 로 실제 다운로드 진행률을 추적 (가능한 경우)
    fetch(weddingImg)
      .then((res) => {
        const total = Number(res.headers.get('Content-Length')) || 0;
        if (!res.body || !total) {
          setProgress((p) => Math.max(p, 90));
          return;
        }
        const reader = res.body.getReader();
        let received = 0;
        const pump = (): Promise<void> =>
          reader.read().then(({ done, value }) => {
            if (done || !value) return;
            received += value.length;
            if (!cancelled) {
              setProgress(Math.min(95, Math.round((received / total) * 100)));
            }
            return pump();
          });
        return pump();
      })
      .catch(() => {})
      .finally(decodeAndFinish);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className='invitation'>
      {!loaderGone && (
        <Loading
          progress={progress}
          done={active}
          onExited={() => setLoaderGone(true)}
        />
      )}
      <Cover active={active} />
      <Greeting />
      <PhotoBand
        ratio='4 / 5'
        label='이미지'
      />
      <QuickNav />
      <Calendar />
      <About />
      <Timeline />
      <Gallery />
      <Location />
      <Account />
      <Contact />
      <Guestbook />
      <Share />
      <Footer />
    </div>
  );
}

export default App;
