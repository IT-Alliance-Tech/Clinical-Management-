import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Doctors from "@/components/doctors";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Doctors />
      <Footer />
    </main>
  );
}
