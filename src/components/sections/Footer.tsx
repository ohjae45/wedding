import { BRIDE, GROOM, WEDDING_DATE } from '@constants/wedding';
import { formatDotDate } from '@utils/format';
import './Footer.scss';

function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__heart'>♡</span>
      <p className='footer__names'>
        {GROOM.lastName}
        {GROOM.firstName} &amp; {BRIDE.lastName}
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
