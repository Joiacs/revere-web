import { CapabilityPills } from './components/CapabilityPills'
import { ClosingCta } from './components/ClosingCta'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PrivacySection } from './components/PrivacySection'
import { ProblemSection } from './components/ProblemSection'
import { SignupSection } from './components/SignupSection'
import { ValueColumns } from './components/ValueColumns'

function App() {
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-md bg-white px-4 py-2 text-royal-iris">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <SignupSection />
        <ProblemSection />
        <CapabilityPills />
        <ValueColumns />
        <PrivacySection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}

export default App
