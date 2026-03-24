import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DemoVideo } from "@/components/demo-video"
import { FeaturesGrid } from "@/components/features-grid"
import { VideoDemos } from "@/components/video-demos"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export default function Home() {
  return (
    <>
      <MainContainer>
        <Header />
        <Hero />
        <DemoVideo />
        <FeaturesGrid />
        <VideoDemos />
        <CTASection />
      </MainContainer>
      <Footer />
    </>
  )
}
