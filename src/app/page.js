import Navbar from "@/components/homepage/Navbar";
import Hero from "@/components/homepage/hero";
import Services from "@/components/homepage/services";
import Doctors from "@/components/homepage/doctors";
import Footer from "@/components/homepage/footer";
import WhyChooseUs from "@/components/homepage/whyChooseUs";
import Testimonials from "@/components/homepage/testimonials";

export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <Hero />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Testimonials />
      {/* <Footer /> */}
    </main>
  );
}
