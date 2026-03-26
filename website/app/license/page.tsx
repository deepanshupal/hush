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

const PAYMENT_URL = "/payment"

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
    question: "Is there a subscription?",
    answer: "No. Hush is a one-time purchase of $19. You pay once and own it forever — no recurring fees, no account required.",
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
          <div
            className="flex relative w-full opacity-0 [animation-delay:300ms] animate-fade-in overflow-hidden"
            style={{ borderBottom: "1px solid #C4BCA8" }}
          >
            <Image
              src="/capture-hero.png"
              alt="Hush App Preview"
              width={4000}
              height={2250}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ border: "1px solid #C4BCA8" }}>
            <div className="w-full p-8" style={{ borderRight: "1px solid #C4BCA8" }}>
              <h2 className="text-lg font-medium flex items-center gap-2" style={{ color: "#1A1410" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" style={{ color: "#8B3030" }} aria-hidden="true">
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                One-Time Purchase
              </h2>
              <div className="my-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="font-[380] py-1 transition-colors px-2 h-5 text-xs rounded-full flex items-center gap-1"
                    style={{ background: "#F0E0DC", color: "#8B3030" }}
                  >
                    Pay once, own forever
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-medium tracking-tight" style={{ color: "#8B3030" }}>$19</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                One-time payment. No account needed, no subscription, no hidden costs.
                Everything runs locally on your Mac.
              </p>
              <a href={PAYMENT_URL} className="mt-6 block">
                <button
                  className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap outline-none gap-2 w-full"
                  style={{
                    borderRadius: "9999px",
                    padding: "16px 32px",
                    background: "#8B3030",
                    color: "#F7F2EA",
                    fontWeight: 600,
                    fontSize: "16px",
                    border: "none",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 -1px 0 rgba(0,0,0,0.20) inset, 0 3px 10px rgba(139,48,48,0.30)",
                  }}
                >
                  Get Early Supporter License
                </button>
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: "#8B7860" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline size-3.5 mr-1 -mt-0.5">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Secure checkout via Polar
              </p>
            </div>
            <div className="w-full p-8">
              <p className="mb-8 text-sm text-left" style={{ color: "#5A5040" }}>
                Everything included, no strings attached.
              </p>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" style={{ color: "#8B3030" }} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.53 7.15214C16.9983 7.44485 17.1407 8.0618 16.848 8.53013L11.848 16.5301C11.6865 16.7886 11.4159 16.9592 11.1132 16.9937C10.8104 17.0282 10.5084 16.9227 10.2929 16.7072L7.29289 13.7072C6.90237 13.3167 6.90237 12.6836 7.29289 12.293C7.68342 11.9025 8.31658 11.9025 8.70711 12.293L10.8182 14.4042L15.152 7.47013C15.4447 7.0018 16.0617 6.85943 16.53 7.15214Z" fill="currentColor"></path>
                  </svg>
                </div>
                <p className="text-sm leading-6" style={{ color: "#5A5040" }}>Lifetime updates</p>
              </div>
              <div className="flex items-start gap-4 mt-3">
                <div className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" style={{ color: "#8B3030" }} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.53 7.15214C16.9983 7.44485 17.1407 8.0618 16.848 8.53013L11.848 16.5301C11.6865 16.7886 11.4159 16.9592 11.1132 16.9937C10.8104 17.0282 10.5084 16.9227 10.2929 16.7072L7.29289 13.7072C6.90237 13.3167 6.90237 12.6836 7.29289 12.293C7.68342 11.9025 8.31658 11.9025 8.70711 12.293L10.8182 14.4042L15.152 7.47013C15.4447 7.0018 16.0617 6.85943 16.53 7.15214Z" fill="currentColor"></path>
                  </svg>
                </div>
                <p className="text-sm leading-6" style={{ color: "#5A5040" }}>Local on-device AI</p>
              </div>
              <div className="flex items-start gap-4 mt-3">
                <div className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" style={{ color: "#8B3030" }} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.53 7.15214C16.9983 7.44485 17.1407 8.0618 16.848 8.53013L11.848 16.5301C11.6865 16.7886 11.4159 16.9592 11.1132 16.9937C10.8104 17.0282 10.5084 16.9227 10.2929 16.7072L7.29289 13.7072C6.90237 13.3167 6.90237 12.6836 7.29289 12.293C7.68342 11.9025 8.31658 11.9025 8.70711 12.293L10.8182 14.4042L15.152 7.47013C15.4447 7.0018 16.0617 6.85943 16.53 7.15214Z" fill="currentColor"></path>
                  </svg>
                </div>
                <p className="text-sm leading-6" style={{ color: "#5A5040" }}>No account required</p>
              </div>
              <div className="flex items-start gap-4 mt-3">
                <div className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" style={{ color: "#8B3030" }} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.53 7.15214C16.9983 7.44485 17.1407 8.0618 16.848 8.53013L11.848 16.5301C11.6865 16.7886 11.4159 16.9592 11.1132 16.9937C10.8104 17.0282 10.5084 16.9227 10.2929 16.7072L7.29289 13.7072C6.90237 13.3167 6.90237 12.6836 7.29289 12.293C7.68342 11.9025 8.31658 11.9025 8.70711 12.293L10.8182 14.4042L15.152 7.47013C15.4447 7.0018 16.0617 6.85943 16.53 7.15214Z" fill="currentColor"></path>
                  </svg>
                </div>
                <p className="text-sm leading-6" style={{ color: "#5A5040" }}>No subscription</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            className="opacity-0 animate-blur-fade-slide-in [animation-delay:400ms]"
            style={{ border: "1px solid #C4BCA8", borderTop: "none" }}
          >
            <div className="flex flex-col gap-0">
              <h3 className="text-lg font-medium px-8 p-8" style={{ color: "#1A1410" }}>
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
