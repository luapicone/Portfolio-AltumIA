import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, Menu, X } from 'lucide-react'
import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from 'shaders/react'
import altumLogo from './assets/altum-logo.webp'

const NAV_LINKS = ['Proyectos', 'Estudio', 'Diario', 'Contacto']

const SMALL_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'
const LARGE_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'

const EASING_CLASS = 'duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

function getLondonTime() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/London',
  }).format(new Date())
}

function TextRoll({ label }: { label: string }) {
  return (
    <span className="flex h-[20px] overflow-hidden">
      <span
        className={`flex flex-col transition-transform ${EASING_CLASS} group-hover:-translate-y-1/2`}
      >
        <span>{label}</span>
        <span>{label}</span>
      </span>
    </span>
  )
}

function PrimaryButton({
  label,
  dark = false,
}: {
  label: string
  dark?: boolean
}) {
  const buttonClass = dark
    ? 'bg-gray-900 text-white'
    : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8]'
  const iconColor = dark ? 'text-gray-900' : 'text-[#2563EB]'

  return (
    <button
      type="button"
      className={`group inline-flex items-center rounded-full ${buttonClass} py-2 pl-5 pr-2 text-[13px] font-medium sm:pl-6 sm:text-[14px]`}
    >
      <TextRoll label={label} />
      <span
        className={`ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform sm:h-8 sm:w-8 ${EASING_CLASS} group-hover:-rotate-45`}
      >
        <ArrowRight className={iconColor} size={16} strokeWidth={2.2} />
      </span>
    </button>
  )
}

function NavCta() {
  return (
    <button
      type="button"
      className="group inline-flex items-center rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] font-medium text-white"
    >
      <TextRoll label="Book a strategy call" />
      <span
        className={`ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform ${EASING_CLASS} group-hover:-rotate-45`}
      >
        <ArrowRight className="text-gray-900" size={14} strokeWidth={2.2} />
      </span>
    </button>
  )
}

function LinkGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px] -rotate-45 transition-transform duration-300 ease-in-out group-hover:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.5 13.5 13.5 10.5" />
      <path d="M7 14.5l-1.2 1.2a3.5 3.5 0 0 0 5 5l1.7-1.7" />
      <path d="m17 9.5 1.2-1.2a3.5 3.5 0 0 0-5-5l-1.7 1.7" />
    </svg>
  )
}

function SectionBadge({
  number,
  label,
  border = 'border-gray-200',
}: {
  number: string
  label: string
  border?: string
}) {
  return (
    <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
        {number}
      </div>
      <div
        className={`rounded-full border ${border} px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]`}
      >
        {label}
      </div>
    </div>
  )
}

function ShaderHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <Shader className="h-full w-full" colorSpace="p3-linear" disableTelemetry>
        <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
          downColor="#2563EB"
          leftColor="#2563EB"
          rightColor="#2563EB"
          upColor="#2563EB"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [londonTime, setLondonTime] = useState(() => getLondonTime())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLondonTime(getLondonTime())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <main className="bg-[#EFEFEF] text-gray-900">
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#EFEFEF]">
        <ShaderHeroBackground />

        <div className="relative z-20 mx-auto w-full max-w-[1440px] p-2 sm:p-3">
          <div className="rounded-full bg-white p-[5px]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 pl-1 sm:gap-6 sm:pl-2">
                <img
                  src={altumLogo}
                  alt="Altum IA logo"
                  className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
                />

                <nav className="hidden items-center gap-6 md:flex">
                  {NAV_LINKS.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="hidden items-center gap-5 pr-1 md:flex lg:pr-2">
                <span className="hidden text-[13px] text-gray-600 lg:inline">
                  Taking on projects for Q1 2026
                </span>
                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                  <Clock3 size={14} strokeWidth={2} />
                  <span>{londonTime} in London</span>
                </div>
                <NavCta />
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="mr-1 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white md:hidden"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div
              className={`rounded-2xl bg-white px-5 pb-5 pt-4 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-[12px] font-medium text-gray-600">
                <Clock3 size={14} strokeWidth={2} />
                <span>{londonTime} in London</span>
              </div>

              <div className="space-y-4">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-[28px] font-medium leading-[32px] text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <PrimaryButton label="Start a project" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex flex-1 flex-col">
          <div className="flex-1" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
              Altum IA
            </p>
            <h1 className="max-w-[16ch] text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:max-w-[18ch] sm:text-[clamp(2.5rem,5vw,4.2rem)]">
              Diseñamos soluciones digitales
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              para negocios que quieren
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              operar mejor y crecer más rápido.
            </h1>

            <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
              <PrimaryButton label="Start a project" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="studio"
        className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <SectionBadge number="1" label="Introducing Altum IA" />

          <div className="px-5 sm:px-8 lg:px-12">
            <h2 className="mb-12 max-w-[13ch] text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 lg:mb-28">
              Strategy-led creatives, delivering results in digital and beyond.
            </h2>
          </div>

          <div className="lg:hidden">
            <div className="px-5 sm:px-8 lg:px-12">
              <p className="max-w-[32rem] text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
                Through research, creative thinking and iteration we help
                growing brands realize their digital full potential.
              </p>
              <div className="mt-6">
                <PrimaryButton label="About our studio" />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 px-5 sm:mt-12 sm:flex-row sm:gap-5 sm:px-8 lg:px-12">
              <img
                src={SMALL_IMAGE}
                alt="Altum IA team workspace"
                className="aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl"
              />
              <img
                src={LARGE_IMAGE}
                alt="Altum IA creative direction session"
                className="aspect-[900/600] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl"
              />
            </div>
          </div>

          <div className="hidden px-5 sm:px-8 lg:grid lg:grid-cols-[26%_1fr_48%] lg:items-end lg:gap-6 lg:px-12 xl:gap-8">
            <div className="self-end">
              <img
                src={SMALL_IMAGE}
                alt="Altum IA team workspace"
                className="aspect-[438/346] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="flex self-start justify-end">
              <div>
                <p className="whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900">
                  Through research, creative thinking
                  <br />
                  and iteration we help growing brands
                  <br />
                  realize their digital full potential.
                </p>
                <div className="mt-8">
                  <PrimaryButton label="About our studio" />
                </div>
              </div>
            </div>

            <div className="self-end">
              <img
                src={LARGE_IMAGE}
                alt="Altum IA creative direction session"
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <SectionBadge
            number="2"
            label="Featured client work"
            border="border-gray-300"
          />

          <div className="px-5 sm:px-8 lg:px-12">
            <h2 className="mb-10 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16">
              Our projects
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
            <article>
              <div className="group relative aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="flex h-9 w-9 items-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-[148px]">
                    <span className="ml-4 whitespace-nowrap text-[13px] font-medium text-gray-900 opacity-0 transition-opacity delay-100 duration-300 ease-in-out group-hover:opacity-100">
                      Learn more
                    </span>
                    <span className="ml-auto mr-3 text-gray-900">
                      <LinkGlyph />
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                Winner of Site of the Month 2025 - an interactive 3D showcase
                driving record engagement
              </p>
              <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
                Narrativ
              </h3>
            </article>

            <article>
              <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#6b6b6b]">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="flex h-9 w-9 items-center overflow-hidden rounded-full bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-[168px]">
                    <span className="ml-4 whitespace-nowrap text-[13px] font-medium text-white opacity-0 transition-opacity delay-100 duration-300 ease-in-out group-hover:opacity-100">
                      View case study
                    </span>
                    <span className="ml-auto mr-3 -rotate-45 text-white transition-transform duration-300 ease-in-out group-hover:rotate-0">
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
                Transforming a dated platform into a conversion-focused brand
                experience
              </p>
              <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
                Luminar
              </h3>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
