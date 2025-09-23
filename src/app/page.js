import AddChatBot from "@/components/AddChatBot";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JoinCommunity from "@/components/JoinCommunity";
import { Navbar } from "@/components/Navbar";
import Partner from "@/components/Partner";
import SeeUs from "@/components/SeeUs";
import ServicesComponent from "@/components/ServicesComponent";
import Team from "@/components/Team";
import TechStackLoop from "@/components/TechStackLoop";

export default function Home() {
  return (
    <>
     
      <main>
    <Navbar />
    <HeroSection />
    <TechStackLoop />
    <ServicesComponent />
    <AddChatBot />
    <SeeUs />
    <Partner />
    <Team />
    <JoinCommunity />
    <Footer />
    <FloatingSocialBar />
      </main>
           
    </>
  );
}
