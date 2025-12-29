import "./globals.css";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/footer";

export const metadata = {
  title: "CarePlus Clinic",
  description: "Clinic management demo website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
