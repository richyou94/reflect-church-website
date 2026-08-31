import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import About from "@/components/About";
import PrayerRoom from "@/components/PrayerRoom";
import Messages from "@/components/Messages";
import NewVisitor from "@/components/NewVisitor";
import InstagramSection from "@/components/InstagramSection";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Welcome />
        <About />
        <PrayerRoom />
        <Messages />
        <NewVisitor />
        <InstagramSection />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
