import { Header } from "@/components/header"
import { Introduction } from "@/components/introduction"
import { AboutMe } from "@/components/about-me"
import { Experiences } from "@/components/experiences"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Introduction />
        <AboutMe />
        <Experiences />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
