import { BRIDE, GROOM, WEDDING_DATE } from '@constants/wedding';
import { useAdminStore } from '@stores/useAdminStore';
import { formatDotDate } from '@utils/format';
import './Footer.scss';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function Footer() {
  const { isAdmin, setAdmin } = useAdminStore();

  // 시크릿 트리거 — 신랑 이름을 누르면 관리자 모드 토글 (겉으로는 일반 텍스트)
  const handleSecret = () => {
    if (isAdmin) {
      setAdmin(false);
      return;
    }
    if (!ADMIN_PASSWORD) return;
    const input = prompt('관리자 비밀번호를 입력하세요') ?? '';
    if (!input) return;
    if (input === ADMIN_PASSWORD) {
      setAdmin(true);
      alert('관리자 모드가 활성화되었습니다.');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <footer className='footer'>
      <span className='footer__heart'>♡</span>
      <p className='footer__names'>
        {/* 신랑 이름 = 시크릿 관리자 트리거. 링크/버튼 특성 없이 일반 텍스트로 보이게. */}
        <span onClick={handleSecret}>
          {GROOM.lastName}
          {GROOM.firstName}
        </span>
        {' & '}
        {BRIDE.lastName}
        {BRIDE.firstName}
      </p>
      <p className='footer__date'>{formatDotDate(WEDDING_DATE)}</p>
      <p className='footer__thanks'>
        저희의 시작을 함께해 주셔서
        <br />
        진심으로 감사합니다.
      </p>
    </footer>
  );
}

export default Footer;
