import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export default function FeedbackPage() {
  return (
    <>
      <MainContainer>
        <Header />
        <div className="relative flex flex-col min-h-[60dvh] items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium mb-4 opacity-0 animate-blur-fade-slide-in">Feedback</h1>
            <p className="text-foreground/60 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "100ms" }}>
              Feedback page coming soon
            </p>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
