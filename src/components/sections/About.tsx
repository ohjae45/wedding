import ImagePlaceholder from '@components/common/ImagePlaceholder';
import Reveal from '@components/common/Reveal';
import SectionTitle from '@components/common/SectionTitle';
import type { Profile } from '@constants/wedding';
import { ABOUT } from '@constants/wedding';
import './About.scss';

function ProfileCard({ profile, variant }: { profile: Profile; variant: 'left' | 'right' }) {
  return (
    <Reveal variant={variant}>
      <article className='about__card'>
        <div className='about__photo'>
          <ImagePlaceholder
            ratio='1 / 1'
            label={profile.role}
            rounded
          />
        </div>
        <p className='about__role'>{profile.role}</p>
        <p className='about__name'>{profile.name}</p>
        <p className='about__lines'>
          {profile.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </article>
    </Reveal>
  );
}

function About() {
  return (
    <section className='about section'>
      <SectionTitle
        en='ABOUT US'
        ko='우리를 소개합니다'
      />
      <Reveal variant='fade'>
        <p className='about__intro'>
          {ABOUT.intro.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </Reveal>

      <div className='about__cards'>
        <ProfileCard
          profile={ABOUT.groom}
          variant='left'
        />
        <ProfileCard
          profile={ABOUT.bride}
          variant='right'
        />
      </div>
    </section>
  );
}

export default About;
