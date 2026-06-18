import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Pagination from '@components/common/Pagination';
import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import { useAdminStore } from '@stores/useAdminStore';
import type { GuestEntry } from '@utils/guestbook';
import { addGuestEntry, removeGuestEntry, subscribeGuestbook } from '@utils/guestbook';
import './Guestbook.scss';

const PAGE_SIZE = 5;

function Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const isAdmin = useAdminStore((s) => s.isAdmin);

  useEffect(() => subscribeGuestbook(setEntries), []);

  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));

  // 글이 줄어들어 현재 페이지가 사라지면 보정
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const visible = entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;
    setSubmitting(true);
    try {
      await addGuestEntry({ name: name.trim(), message: message.trim() });
      setName('');
      setMessage('');
      setPage(1);
    } catch (err) {
      console.error(err);
      alert('등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entry: GuestEntry) => {
    if (!confirm('이 글을 삭제할까요?')) return;
    try {
      await removeGuestEntry(entry);
    } catch (err) {
      console.error(err);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <section
      className='guestbook section'
      id='guestbook'
    >
      <SectionTitle
        en='GUESTBOOK'
        ko='축하 메시지'
      />

      <Reveal>
        <form
          className='guestbook__form'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='이름'
            value={name}
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder='축하의 마음을 남겨주세요'
            value={message}
            maxLength={200}
            rows={3}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            disabled={submitting}
          >
            {submitting ? '등록 중...' : '메시지 남기기'}
          </button>
        </form>
      </Reveal>

      <ul className='guestbook__list'>
        {entries.length === 0 && <li className='guestbook__empty'>첫 번째 축하 메시지를 남겨주세요 🤍</li>}
        {visible.map((entry) => (
          <li
            key={entry.id}
            className='guestbook__entry'
          >
            <div className='guestbook__entry-head'>
              <strong>{entry.name}</strong>
              {isAdmin && (
                <button
                  type='button'
                  onClick={() => handleDelete(entry)}
                  aria-label='삭제'
                >
                  ×
                </button>
              )}
            </div>
            <p>{entry.message}</p>
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </section>
  );
}

export default Guestbook;
