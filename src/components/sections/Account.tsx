import { useState } from 'react';
import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import type { Account as AccountType } from '@constants/wedding';
import { BRIDE_ACCOUNTS, GROOM_ACCOUNTS } from '@constants/wedding';
import { copyText } from '@utils/clipboard';
import './Account.scss';

function AccountRow({ account }: { account: AccountType }) {
  const handleCopy = async () => {
    const ok = await copyText(account.number.replace(/[^0-9]/g, ''));
    alert(ok ? '계좌번호가 복사되었습니다.' : '복사에 실패했습니다.');
  };

  return (
    <li className='account__row'>
      <div className='account__row-info'>
        <p className='account__row-bank'>
          {account.bank} <span>{account.label}</span>
        </p>
        <p className='account__row-num'>{account.number}</p>
        <p className='account__row-holder'>예금주 {account.holder}</p>
      </div>
      <button
        type='button'
        onClick={handleCopy}
      >
        복사
      </button>
    </li>
  );
}

function AccountGroup({ title, accounts }: { title: string; accounts: AccountType[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`account__group${open ? ' account__group--open' : ''}`}>
      <button
        type='button'
        className='account__toggle'
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {title}
        <span className='account__chevron'>⌄</span>
      </button>
      {open && (
        <ul className='account__list'>
          {accounts.map((a) => (
            <AccountRow
              key={`${a.label}-${a.holder}`}
              account={a}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function Account() {
  return (
    <section
      className='account section'
      id='account'
    >
      <SectionTitle
        en='ACCOUNT'
        ko='마음 전하실 곳'
      />
      <Reveal>
        <p className='account__desc'>
          참석이 어려운 분들을 위해 계좌번호를 기재하였습니다.
          <br />
          전해주시는 마음 깊이 감사드립니다.
        </p>
        <div className='account__groups'>
          <AccountGroup
            title='신랑측 계좌번호'
            accounts={GROOM_ACCOUNTS}
          />
          <AccountGroup
            title='신부측 계좌번호'
            accounts={BRIDE_ACCOUNTS}
          />
        </div>
      </Reveal>
    </section>
  );
}

export default Account;
