"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MainContainer } from "@/components/main-container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"

const faqs = [
  {
    question: "What is Hush?",
    answer: "Hush is a local voice-to-text app for Mac. Press Fn, speak, and your words appear as text in any app. Everything runs on your device — no cloud, no account, no subscription.",
  },
  {
    question: "How does Hush work?",
    answer: "Hush uses on-device AI to transcribe your speech in real-time. Hold the Fn key to record, release to transcribe. The text is inserted wherever your cursor is.",
  },
  {
    question: "What platforms does Hush support?",
    answer: "Hush is currently available for macOS 14+ on Apple Silicon Macs.",
  },
  {
    question: "Is Hush free?",
    answer: "Yes, Hush is free to download and use.",
  },
  {
    question: "Does Hush send my audio to any server?",
    answer: "No. All speech recognition happens on your Mac using on-device AI. Your audio never leaves your device. The only exception is the optional AI Polish feature, which sends text (not audio) to Groq if you provide your own API key.",
  },
  {
    question: "What is AI Polish?",
    answer: "AI Polish is an optional feature that cleans up your transcriptions — fixing grammar, punctuation, and tone. It uses Groq and requires you to bring your own API key (BYOK).",
  },
  {
    question: "What is Per-App Tone?",
    answer: "Per-App Tone lets you set different writing styles for different apps. For example, casual in Slack and formal in Mail. Hush automatically adjusts the tone when polishing your transcriptions.",
  },
]

export default function LicensePage() {
  return (
    <>
      <MainContainer>
        <Header />
        <div className="relative flex flex-col">
          {/* Hero Image */}
          <div className="flex relative w-full ring-1 ring-white/[0.06] opacity-0 [animation-delay:300ms] animate-fade-in overflow-hidden">
            <Image
              src="/capture-hero.png"
              alt="Hush App Preview"
              width={4000}
              height={2250}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="ring ring-white/[0.06] p-8">
            <h2 className="text-lg font-medium text-foreground mb-4">
              Free & Local
            </h2>
            <p className="text-sm text-foreground/55 leading-relaxed">
              Hush is free to download and use. No account needed, no subscription, no hidden costs.
              Everything runs locally on your Mac.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="ring ring-white/[0.06] opacity-0 animate-blur-fade-slide-in [animation-delay:400ms]">
            <div className="flex flex-col gap-0">
              <h3 className="text-lg font-medium text-foreground px-8 p-8">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="last:border-b-0">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}
