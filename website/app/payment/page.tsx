import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainContainer } from "@/components/main-container"

export const metadata: Metadata = {
  title: "Hush checkout",
  description: "Checkout for your Hush lifetime license.",
}

export default function PaymentPage() {
  return (
    <>
      <MainContainer>
        <Header />
        <div className="relative flex flex-col min-h-[60dvh] items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium mb-4 opacity-0 animate-blur-fade-slide-in">Checkout</h1>
            <p className="text-foreground/60 opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "100ms" }}>
              Checkout is coming soon. Download Hush and start your free 14-day trial in the meantime.
            </p>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
