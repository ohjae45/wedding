import { useEffect, useRef, useState } from 'react';
import ImagePlaceholder from '@components/common/ImagePlaceholder';
import { VENUE } from '@constants/wedding';
import './KakaoMap.scss';

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const SDK_ID = 'kakao-map-sdk';

/** 카카오맵 JS SDK 를 1회만 동적 로드 */
function loadKakaoSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve();
    const existing = document.getElementById(SDK_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('SDK load error')));
      return;
    }
    const script = document.createElement('script');
    script.id = SDK_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('SDK load error'));
    document.head.appendChild(script);
  });
}

function KakaoMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!KAKAO_KEY) return;
    let cancelled = false;

    loadKakaoSdk()
      .then(() => {
        window.kakao.maps.load(() => {
          if (cancelled || !containerRef.current) return;
          const kakao = window.kakao;
          const map = new kakao.maps.Map(containerRef.current, {
            center: new kakao.maps.LatLng(37.3387, 127.1066),
            level: 4,
          });
          map.setZoomable(false); // 페이지 스크롤 방해 방지

          const place = (lat: number, lng: number) => {
            const pos = new kakao.maps.LatLng(lat, lng);
            map.relayout(); // 컨테이너 크기 확정 후 재계산 (초기 레이아웃 타이밍 보정)
            map.setCenter(pos);

            // 하트 마커 + 글자 크기에 맞는 말풍선 (커스텀 오버레이)
            const content = document.createElement('div');
            content.className = 'map-pin';
            content.innerHTML = `
              <div class="map-pin__label">${VENUE.name}</div>
              <div class="map-pin__heart">
                <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#e0808f" d="M12 21s-7.6-4.9-10.1-9.6C-.2 8 1.7 3.8 5.5 3.8c2.4 0 4.1 1.7 5.2 3.6 1.1-1.9 2.8-3.6 5.2-3.6 3.8 0 5.7 4.2 3.6 7.6C19.6 16.1 12 21 12 21z"/>
                </svg>
              </div>`;
            new kakao.maps.CustomOverlay({
              map,
              position: pos,
              content,
              xAnchor: 0.5,
              yAnchor: 1, // 하트 끝(아래)이 좌표를 가리키도록
            });
          };

          // 좌표가 있으면 그대로, 없으면 주소 → 실패 시 장소명으로 검색
          if (VENUE.lat && VENUE.lng) {
            place(VENUE.lat, VENUE.lng);
            return;
          }
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(VENUE.address, (res: { x: string; y: string }[], status: string) => {
            if (status === kakao.maps.services.Status.OK && res[0]) {
              place(Number(res[0].y), Number(res[0].x));
            } else {
              const places = new kakao.maps.services.Places();
              places.keywordSearch(VENUE.name, (r: { x: string; y: string }[], st: string) => {
                if (st === kakao.maps.services.Status.OK && r[0]) {
                  place(Number(r[0].y), Number(r[0].x));
                }
              });
            }
          });
        });
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  // 키가 없거나 로드 실패 → 카카오맵에서 열리는 자리표시 (graceful fallback)
  if (!KAKAO_KEY || failed) {
    return (
      <a
        className='kakao-map kakao-map--fallback'
        href={`https://map.kakao.com/?q=${encodeURIComponent(VENUE.name)}`}
        target='_blank'
        rel='noreferrer'
        aria-label={`${VENUE.name} 지도에서 보기`}
      >
        <ImagePlaceholder
          ratio='4 / 3'
          label='지도 (탭하여 열기)'
          rounded
        />
      </a>
    );
  }

  return (
    <div
      ref={containerRef}
      className='kakao-map'
    />
  );
}

export default KakaoMap;
