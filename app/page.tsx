import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Navbar from "@/components/landing/navbar"
import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import HowItWorksSection from "@/components/landing/how-it-works-section"
import WhySection from "@/components/landing/why-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import CtaSection from "@/components/landing/cta-section"
import FooterSection from "@/components/landing/footer-section"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="dark min-h-screen w-full bg-background text-foreground overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhySection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </div>
  )
}
