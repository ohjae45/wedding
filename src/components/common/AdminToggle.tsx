import { useAdminStore } from '@stores/useAdminStore';
import './AdminToggle.scss';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

/** 페이지 맨 아래 관리자 모드 토글 — 활성화 시 방명록 글을 비밀번호 없이 삭제 가능 */
function AdminToggle() {
  const { isAdmin, setAdmin } = useAdminStore();

  const handleClick = () => {
    if (isAdmin) {
      setAdmin(false);
      return;
    }
    if (!ADMIN_PASSWORD) {
      alert('관리자 비밀번호가 설정되지 않았습니다. (.env 의 VITE_ADMIN_PASSWORD)');
      return;
    }
    const input = prompt('관리자 비밀번호를 입력하세요') ?? '';
    if (!input) return;
    if (input === ADMIN_PASSWORD) {
      setAdmin(true);
      alert('관리자 모드가 활성화되었습니다.\n방명록 글의 × 를 눌러 삭제할 수 있어요.');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className='admin-toggle'>
      <button
        type='button'
        className={isAdmin ? 'admin-toggle__btn admin-toggle__btn--on' : 'admin-toggle__btn'}
        onClick={handleClick}
      >
        {isAdmin ? '관리자 모드 해제' : '관리자 모드'}
      </button>
    </div>
  );
}

export default AdminToggle;
