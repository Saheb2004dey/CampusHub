import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { KnowledgeBase } from "@/components/landing/knowledge-base"
import { AgenticAi } from "@/components/landing/agentic-ai"
import { Roles } from "@/components/landing/roles"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { AnalyticsSection } from "@/components/landing/analytics-section"
import { CtaFooter } from "@/components/landing/cta-footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <KnowledgeBase />
        <AgenticAi />
        <Roles />
        <FeatureGrid />
        <AnalyticsSection />
        <CtaFooter />
      </main>
    </div>
  )
}
