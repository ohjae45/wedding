import MusicToggle from '@components/common/MusicToggle';
import About from '@components/sections/About';
import Account from '@components/sections/Account';
import Calendar from '@components/sections/Calendar';
import Contact from '@components/sections/Contact';
import Cover from '@components/sections/Cover';
import Footer from '@components/sections/Footer';
import Gallery from '@components/sections/Gallery';
import Greeting from '@components/sections/Greeting';
import Guestbook from '@components/sections/Guestbook';
import Location from '@components/sections/Location';
import PhotoBand from '@components/sections/PhotoBand';
import QuickNav from '@components/sections/QuickNav';
import Share from '@components/sections/Share';
import Timeline from '@components/sections/Timeline';
import './App.scss';

function App() {
  return (
    <div className='invitation'>
      <MusicToggle />
      <Cover />
      <Greeting />
      <PhotoBand
        ratio='4 / 5'
        label='이미지'
      />
      <QuickNav />
      <Calendar />
      <About />
      <Timeline />
      <Gallery />
      <Location />
      <Account />
      <Contact />
      <Guestbook />
      <Share />
      <Footer />
    </div>
  );
}

export default App;
