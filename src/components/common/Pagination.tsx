import './Pagination.scss';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const WINDOW = 5;

/** 번호형 페이지네이션 (현재 페이지 주변 최대 5개 + 이전/다음) */
function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  let start = Math.max(1, page - Math.floor(WINDOW / 2));
  const end = Math.min(totalPages, start + WINDOW - 1);
  start = Math.max(1, end - WINDOW + 1);

  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) pages.push(i);

  return (
    <nav
      className='pagination'
      aria-label='방명록 페이지'
    >
      <button
        type='button'
        className='pagination__arrow'
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label='이전 페이지'
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type='button'
          className={`pagination__num${p === page ? ' pagination__num--on' : ''}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        type='button'
        className='pagination__arrow'
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label='다음 페이지'
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;
