import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OurMenu from "@/components/OurMenu";
import Features from "@/components/Features";
import HighlightDish from "@/components/HighlightDish";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurMenu />
      <HighlightDish />
      <Features />
    </main>
  );
}
