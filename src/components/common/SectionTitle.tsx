import './SectionTitle.scss';

interface SectionTitleProps {
  /** 영문 소제목 (예: INVITATION) */
  en: string;
  /** 한글 제목 (예: 모시는 글) */
  ko: string;
}

function SectionTitle({ en, ko }: SectionTitleProps) {
  return (
    <header className='section-title'>
      <p className='section-title__en'>{en}</p>
      <h2 className='section-title__ko'>{ko}</h2>
      <span className='section-title__deco' />
    </header>
  );
}

export default SectionTitle;
