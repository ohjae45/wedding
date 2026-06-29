import { useEffect, useState } from 'react';
import SectionTitle from '@components/common/SectionTitle';
import { BRIDE, GROOM, VENUE } from '@constants/wedding';
import { copyText } from '@utils/clipboard';
import './Share.scss';

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const SDK_ID = 'kakao-js-sdk';
// 공유 카드 썸네일 — index.html 의 og:image 와 동일
const SHARE_IMAGE = 'https://ohjae45.github.io/wedding/og-image.jpg';

/** 카카오 JS SDK(kakao.min.js)를 1회만 동적 로드 후 init */
function loadKakaoSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    const init = () => {
      if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_KEY);
      resolve();
    };
    if (window.Kakao) return init();
    const existing = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', init);
      existing.addEventListener('error', () => reject(new Error('SDK load error')));
      return;
    }
    const script = document.createElement('script');
    script.id = SDK_ID;
    script.async = true;
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    script.crossOrigin = 'anonymous';
    script.onload = init;
    script.onerror = () => reject(new Error('SDK load error'));
    document.head.appendChild(script);
  });
}

/** 카카오톡 말풍선 (currentColor 채움) */
function KakaoIcon() {
  return (
    <svg
      className='share__icon'
      viewBox='0 0 24 24'
      width='16'
      height='16'
      fill='currentColor'
      aria-hidden
    >
      <path d='M12 3C6.48 3 2 6.58 2 11c0 2.83 1.88 5.31 4.71 6.71-.2.71-.72 2.62-.83 3.03-.13.5.18.5.39.36.16-.11 2.6-1.77 3.66-2.49.67.09 1.36.14 2.07.14 5.52 0 10-3.58 10-8s-4.48-8-10-8Z' />
    </svg>
  );
}

/** 공유(위로 내보내기) — 선 아이콘 */
function ShareIcon() {
  return (
    <svg
      className='share__icon'
      viewBox='0 0 24 24'
      width='16'
      height='16'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d='M12 3v13' />
      <path d='m8 7 4-4 4 4' />
      <path d='M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7' />
    </svg>
  );
}

/** 링크(체인) — 선 아이콘 */
function LinkIcon() {
  return (
    <svg
      className='share__icon'
      viewBox='0 0 24 24'
      width='16'
      height='16'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d='M9 13a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7' />
      <path d='M15 11a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7' />
    </svg>
  );
}

function Share() {
  const shareTitle = `${GROOM.lastName}${GROOM.firstName} ♥ ${BRIDE.lastName}${BRIDE.firstName} 결혼합니다`;
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    if (!KAKAO_KEY) return;
    loadKakaoSdk()
      .then(() => setKakaoReady(true))
      .catch(() => setKakaoReady(false));
  }, []);

  const handleCopyLink = async () => {
    const ok = await copyText(window.location.href);
    alert(ok ? '청첩장 링크가 복사되었습니다.' : '복사에 실패했습니다.');
  };

  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized?.()) return handleShare();
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: `2026.10.03 SAT PM 1:20 · ${VENUE.name}`,
        imageUrl: SHARE_IMAGE,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const handleShare = async () => {
    // 모바일 기본 공유 시트 (지원 시), 미지원 시 링크 복사로 대체.
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: window.location.href });
      } catch {
        /* 사용자가 취소한 경우 */
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <section className='share section'>
      <SectionTitle
        en='SHARE'
        ko='청첩장 공유하기'
      />
      <div className='share__buttons'>
        {kakaoReady && (
          <button
            type='button'
            className='share__kakao'
            onClick={handleKakaoShare}
          >
            <KakaoIcon />
            카카오톡 공유
          </button>
        )}
        <button
          type='button'
          onClick={handleShare}
        >
          <ShareIcon />
          공유하기
        </button>
        <button
          type='button'
          className='share__copy'
          onClick={handleCopyLink}
        >
          <LinkIcon />
          링크 복사
        </button>
      </div>
    </section>
  );
}

export default Share;
