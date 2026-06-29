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
            카카오톡 공유
          </button>
        )}
        <button
          type='button'
          onClick={handleShare}
        >
          공유하기
        </button>
        <button
          type='button'
          className='share__copy'
          onClick={handleCopyLink}
        >
          링크 복사
        </button>
      </div>
    </section>
  );
}

export default Share;
