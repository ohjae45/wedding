import './Divider.scss';

/** 섹션 사이 장식 구분선 */
function Divider() {
  return (
    <div
      className='divider'
      aria-hidden
    >
      <span />
      <small>♥</small>
      <span />
    </div>
  );
}

export default Divider;
