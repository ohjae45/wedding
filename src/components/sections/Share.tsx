import SectionTitle from '@components/common/SectionTitle';
import { BRIDE, GROOM } from '@constants/wedding';
import { copyText } from '@utils/clipboard';
import './Share.scss';

function Share() {
  const shareTitle = `${GROOM.lastName}${GROOM.firstName} ♥ ${BRIDE.lastName}${BRIDE.firstName} 결혼합니다`;

  const handleCopyLink = async () => {
    const ok = await copyText(window.location.href);
    alert(ok ? '청첩장 링크가 복사되었습니다.' : '복사에 실패했습니다.');
  };

  const handleShare = async () => {
    // 모바일 기본 공유 시트 (지원 시). 카카오 공유는 Kakao SDK 키 발급 후 연동.
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
      <p className='share__note'>카카오톡 공유는 Kakao SDK 키 발급 후 연동 예정입니다.</p>
    </section>
  );
}

export default Share;
