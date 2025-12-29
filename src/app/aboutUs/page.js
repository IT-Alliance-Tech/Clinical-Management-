import AboutHero from "@/components/aboutUs/aboutHero";
import WhoWeAre from "@/components/aboutUs/whoWeAre";
import MissionVision from "@/components/aboutUs/missionVision";
import Values from "@/components/aboutUs/values";
import Stats from "@/components/aboutUs/stats";
import AboutCTA from "@/components/aboutUs/aboutCTA";
import ClinicJourney from "@/components/aboutUs/clinicJourney";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <Values />
      <Stats />
      {/* <ClinicJourney /> */}
      <AboutCTA />
    </main>
  );
}
