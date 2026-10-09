import { fetchProfile, fetchEducations } from '@/lib/fetchPortfolioData';
import Navigation from '@/components/portfolio/Navigation';
import Education from '@/components/portfolio/Education';
import Footer from '@/components/portfolio/Footer';

export default async function EducationPage() {
  const [profile, educations] = await Promise.all([
    fetchProfile(),
    fetchEducations(),
  ]);

  return (
    <>
      <Navigation profile={profile} />
      <main className="pt-14 min-h-screen bg-white">
        <Education educations={educations} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
