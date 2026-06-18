import './QuickNav.scss';

const ITEMS = [
  { label: '예식 일시', target: 'calendar' },
  { label: '오시는 길', target: 'location' },
  { label: '마음 전하실 곳', target: 'account' },
];

/** 주요 섹션으로 부드럽게 이동하는 퀵 내비게이션 (porto 상단 버튼 영역) */
function QuickNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className='quicknav'>
      {ITEMS.map((item) => (
        <button
          key={item.target}
          type='button'
          onClick={() => scrollTo(item.target)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default QuickNav;
