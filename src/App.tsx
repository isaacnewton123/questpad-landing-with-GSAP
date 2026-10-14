import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PiRocketLaunchBold,
  PiHandCoinsBold,
  PiWalletBold,
  PiGameControllerBold,
  PiCheckSquareOffsetBold,
  PiShieldCheckBold,
  PiCaretDownBold,
  PiTelegramLogoBold,
  PiArrowUpRightBold,
} from 'react-icons/pi'
import phoneImg from './assets/illustrations/phone.webp'
import questpadImg from './assets/brand/questpad.webp'
import gamepadImg from './assets/illustrations/gamepad.webp'
import taskImg from './assets/illustrations/task.webp'
import tonTokenImg from './assets/illustrations/TON_token.webp'
import LegalModal, { type LegalTab } from './components/LegalModal'
import Preloader from './components/Preloader'

gsap.registerPlugin(ScrollTrigger)

interface FaqItem {
  category: string
  question: string
  answer: string
  icon: ComponentType<{ className?: string }>
  iconColor: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Getting Started',
    question: 'What is QuestPad and how do I start playing?',
    answer:
      'QuestPad is a zero-cost gamified Web3 platform built directly as a Telegram Mini App on the TON blockchain. You do not need to download anything from app stores or configure complex seed phrases—simply launch @QuestPadBot in Telegram and start playing in one tap.',
    icon: PiRocketLaunchBold,
    iconColor: 'text-white',
  },
  {
    category: 'Zero Deposit',
    question: 'Do I need any deposit or upfront money to earn crypto?',
    answer:
      'No. QuestPad is 100% free with zero deposit required. You do not need to deposit funds, pay gas fees, or buy NFTs to earn. Every player receives free daily spins, starter resources for Trees Forest, and full access to all partner quest rewards.',
    icon: PiHandCoinsBold,
    iconColor: 'text-white',
  },
  {
    category: 'Withdrawals',
    question: 'How do I withdraw my earned TON cryptocurrency?',
    answer:
      'You can connect any non-custodial TON wallet (such as Tonkeeper, Telegram Wallet, or MyTonWallet) through the official TON Connect protocol. Once you collect TON rewards, you can request an instant on-chain payout directly to your personal wallet.',
    icon: PiWalletBold,
    iconColor: 'text-white',
  },
  {
    category: 'Arcade Minigames',
    question: 'What games are available in the Arcade?',
    answer:
      'QuestPad currently features two flagship minigames: the Lucky Spin Wheel (daily lucky spins with streak multipliers, coin store, and instant TON prizes) and Trees Forest (a competitive PvP farming game where you water trees, scout other players to steal coins, and compete for seasonal TON leaderboards). New games are added regularly.',
    icon: PiGameControllerBold,
    iconColor: 'text-white',
  },
  {
    category: 'Quests & Campaigns',
    question: 'How do Daily Quests and Partner Campaigns work?',
    answer:
      'Complete daily check-ins and verified social tasks from top Web3 projects. Earn instant TON rewards through First-Come First-Served (FCFS) pools or win huge prize shares in exclusive partner Raffle campaigns by submitting simple proof of completion.',
    icon: PiCheckSquareOffsetBold,
    iconColor: 'text-white',
  },
  {
    category: 'Security',
    question: 'Is my wallet and Telegram data safe?',
    answer:
      'Absolutely. QuestPad utilizes the official TON Connect standard. The platform never has access to your private keys or seed phrase. All transactions and token distributions are verified transparently on the public TON blockchain.',
    icon: PiShieldCheckBold,
    iconColor: 'text-white',
  },
]

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [legalModalOpen, setLegalModalOpen] = useState(false)
  const [legalActiveTab, setLegalActiveTab] = useState<LegalTab>('terms')
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null)

  const handleExitStart = () => {
    if (entranceTlRef.current) {
      entranceTlRef.current.play()
    }
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
  }

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#terms') {
        setLegalActiveTab('terms')
        setLegalModalOpen(true)
      } else if (hash === '#privacy') {
        setLegalActiveTab('privacy')
        setLegalModalOpen(true)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  const openLegalModal = (tab: LegalTab) => {
    setLegalActiveTab(tab)
    setLegalModalOpen(true)
    window.history.pushState(null, '', `#${tab}`)
  }

  const closeLegalModal = () => {
    setLegalModalOpen(false)
    if (window.location.hash === '#terms' || window.location.hash === '#privacy') {
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    }
  }

  const handleLegalTabChange = (tab: LegalTab) => {
    setLegalActiveTab(tab)
    window.history.replaceState(null, '', `#${tab}`)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 320)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation Timeline (Hero 1):
      // - PLAY, QUEST: muncul dari atas
      // - EARN: muncul dari dalam
      // - REAL CRYPTO: muncul dari bawah
      // Durasi diperpanjang agar terasa cinematic & megah
      const entranceTl = gsap.timeline({
        paused: true,
      })
      entranceTlRef.current = entranceTl

      entranceTl
        .fromTo(
          '.line-1',
          { opacity: 0, y: -75 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
        )
        .fromTo(
          '.line-2',
          { opacity: 0, scale: 0.18, transformOrigin: 'center center' },
          { opacity: 1, scale: 1, duration: 1.15, ease: 'back.out(1.15)' },
          '-=0.75'
        )
        .fromTo(
          '.line-3',
          { opacity: 0, y: 75 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.75'
        )
        .fromTo(
          '#getStartedBtn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          '-=0.55'
        )
        .fromTo(
          '#scrollDownIndicator',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          '-=0.65'
        )

      // Jika user me-refresh saat posisi scroll sudah di bawah (hero 2), tuntaskan entrance seketika
      if (typeof window !== 'undefined' && window.scrollY > 30) {
        entranceTl.progress(1)
      }

      const mm = gsap.matchMedia()

      // ==========================================
      // 1. WIDESCREEN DESKTOP (min-width: 1280px)
      // Phone di tengah, 3 container mengelilingi secara simetris
      // ==========================================
      mm.add('(min-width: 1280px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#heroSection',
            start: 'top top',
            end: () => `+=${4900 + window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress > 0.02 && entranceTl.isActive()) {
                entranceTl.progress(1)
              }
            },
          },
        })

        scrollTl
          .fromTo(
            '#ctaWrapper',
            {
              autoAlpha: 1,
              pointerEvents: 'auto',
            },
            {
              autoAlpha: 0,
              pointerEvents: 'none',
              duration: 0.15,
              ease: 'power1.in',
            },
            0
          )
          .fromTo(
            '.slogan-typography',
            {
              scale: 1,
              autoAlpha: 1,
            },
            {
              scale: 12,
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power2.in',
            },
            0
          )
          // Phone meluncur dari bawah ke tengah (tiba di center pada t=0.35)
          .fromTo(
            '#phoneWrapper',
            {
              y: '100vh',
            },
            {
              y: '0vh',
              duration: 0.32,
              ease: 'power1.out',
            },
            0.05
          )
          // Latar bertransisi ke putih
          .fromTo(
            document.body,
            {
              backgroundColor: '#0047AB',
            },
            {
              backgroundColor: '#ffffff',
              duration: 0.30,
              ease: 'power1.inOut',
            },
            0.02
          )
          .fromTo(
            '#navLogo, #navGetStartedBtn',
            {
              filter: 'invert(0)',
            },
            {
              filter: 'invert(1)',
              duration: 0.25,
              ease: 'power1.inOut',
            },
            0.05
          )

          // FASE SPOTLIGHT PHONE (t=0.35 - 0.58): Phone sendirian di tengah tanpa container
          .fromTo(
            '#phoneInner',
            {
              scale: 0.94,
            },
            {
              scale: 1.02,
              duration: 0.23,
              ease: 'power1.inOut',
            },
            0.35
          )

          // TAHAP 2 (t=0.58 - 0.72): Container 1 (Play) dari kiri
          .fromTo(
            '#storyCard1',
            {
              x: -45,
              scale: 0.90,
              autoAlpha: 0,
            },
            {
              x: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.58
          )

          // TAHAP 3 (t=0.76 - 0.90): Container 2 (Solved Quest) dari kanan
          .fromTo(
            '#storyCard2',
            {
              x: 45,
              scale: 0.90,
              autoAlpha: 0,
            },
            {
              x: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.76
          )

          // TAHAP 4 (t=0.94 - 1.08): Container 3 (EARN CRYPTO) dari kiri
          .fromTo(
            '#storyCard3',
            {
              x: -45,
              scale: 0.90,
              autoAlpha: 0,
            },
            {
              x: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.94
          )
          // Selang waktu setelah EARN CRYPTO muncul agar Hero 2 dapat dinikmati seutuhnya
          // sebelum Hero 3 mulai meluncur naik
          .to({}, { duration: 0.45 }, 1.08)
      })

      // ==========================================
      // 2. TABLET & MOBILE (max-width: 1279px)
      // Tablet: Phone di kiri, 3 container berjajar vertikal di kanan
      // Mobile: Phone di atas, 3 container berjajar vertikal di bawah
      // ==========================================
      mm.add('(max-width: 1279px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#heroSection',
            start: 'top top',
            end: () => `+=${3100 + window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress > 0.02 && entranceTl.isActive()) {
                entranceTl.progress(1)
              }
            },
          },
        })

        scrollTl
          .fromTo(
            '#ctaWrapper',
            {
              autoAlpha: 1,
              pointerEvents: 'auto',
            },
            {
              autoAlpha: 0,
              pointerEvents: 'none',
              duration: 0.15,
              ease: 'power1.in',
            },
            0
          )
          .fromTo(
            '.slogan-typography',
            {
              scale: 1,
              autoAlpha: 1,
            },
            {
              scale: 9,
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power2.in',
            },
            0
          )
          .fromTo(
            '#phoneWrapper',
            {
              y: '100vh',
            },
            {
              y: '0vh',
              duration: 0.32,
              ease: 'power1.out',
            },
            0.05
          )
          .fromTo(
            document.body,
            {
              backgroundColor: '#0047AB',
            },
            {
              backgroundColor: '#ffffff',
              duration: 0.30,
              ease: 'power1.inOut',
            },
            0.02
          )
          .fromTo(
            '#navLogo, #navGetStartedBtn',
            {
              filter: 'invert(0)',
            },
            {
              filter: 'invert(1)',
              duration: 0.25,
              ease: 'power1.inOut',
            },
            0.05
          )
          // Spotlight Phone
          .fromTo(
            '#phoneInner',
            {
              scale: 0.92,
            },
            {
              scale: 1.0,
              duration: 0.2,
              ease: 'power1.inOut',
            },
            0.35
          )

          // TAHAP 1: Card 1 (Play) muncul
          .fromTo(
            '#storyCard1',
            {
              y: 20,
              scale: 0.94,
              autoAlpha: 0,
            },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.52
          )

          // TAHAP 2: Card 2 (Solved Quest) muncul
          .fromTo(
            '#storyCard2',
            {
              y: 20,
              scale: 0.94,
              autoAlpha: 0,
            },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.70
          )

          // TAHAP 3: Card 3 (EARN CRYPTO) muncul
          .fromTo(
            '#storyCard3',
            {
              y: 20,
              scale: 0.94,
              autoAlpha: 0,
            },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.88
          )
          // Selang waktu setelah EARN CRYPTO muncul agar Hero 2 dapat dinikmati seutuhnya
          // sebelum Hero 3 mulai meluncur naik
          .to({}, { duration: 0.85 }, 1.04)
      })

      // ==========================================
      // HERO 3: FAQ SECTION PARALLAX & SCROLL ENTRANCE
      // ==========================================
      // Parallax content glide as Hero 3 rises up over Hero 2
      gsap.fromTo(
        '#faqContentWrapper',
        { y: 70 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#faqSection',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )

      // ==========================================
      // HERO 3: FAQ CINEMATIC GSAP REVEAL TIMELINE
      // ==========================================
      const faqTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#faqSection',
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      })

      faqTl
        // 1. Title masked reveal: text glides up from hidden baseline with a smooth power4 curve
        .fromTo(
          '.faq-title',
          {
            yPercent: 120,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: 'power4.out',
          }
        )
        // 2. Subtitle: smooth slide up with cinematic focus (blur to crisp)
        .fromTo(
          '.faq-subtitle',
          {
            y: 20,
            autoAlpha: 0,
            filter: 'blur(8px)',
          },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.65'
        )
        // 3. Staggered reveal for each FAQ item row
        .fromTo(
          '.faq-item',
          {
            y: 35,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        // 4. Playful spring icon pop on each item
        .fromTo(
          '.faq-item-icon',
          {
            scale: 0.6,
            rotation: -18,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'back.out(2)',
          },
          '<'
        )
        // 5. Arrow fade & slide in
        .fromTo(
          '.faq-item-arrow',
          {
            x: 15,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '<'
        )

      // ==========================================
      // UNIFIED NAV THEME MANAGER (LOGO & GET STARTED)
      // ==========================================
      const updateNavTheme = (isLight: boolean) => {
        gsap.to('#navLogo, #navGetStartedBtn', {
          filter: isLight ? 'invert(1)' : 'invert(0)',
          duration: 0.25,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      }

      // ==========================================
      // HERO 3 TO HERO 4: RADIAL IRIS / CIRCULAR PORTAL REVEAL
      // ==========================================
      let isHero4Visible = false

      const portalTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#faqSection',
          start: 'bottom bottom',
          end: () => `+=${window.innerHeight * 1.8}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set('#hero4Section', { visibility: 'visible', opacity: 1, pointerEvents: 'auto' })
          },
          onLeaveBack: () => {
            gsap.set('#hero4Section', { visibility: 'hidden', pointerEvents: 'none' })
            isHero4Visible = false
            if (hero4IdleAnim) {
              hero4IdleAnim.pause()
            }
            hero4Tl.pause(0)
            updateNavTheme(false)
          },
          onEnterBack: () => {
            gsap.set('#hero4Section', { visibility: 'visible', opacity: 1, pointerEvents: 'auto' })
            updateNavTheme(true)
          },
          onUpdate: (self) => {
            if (self.progress > 0) {
              gsap.set('#hero4Section', { visibility: 'visible', opacity: 1 })
            } else {
              gsap.set('#hero4Section', { visibility: 'hidden', pointerEvents: 'none' })
            }

            // Sync nav theme: Black when white portal covers navbar (> 0.35), White when on FAQ (<= 0.35)
            if (self.progress > 0.35) {
              updateNavTheme(true)
            } else {
              updateNavTheme(false)
            }

            // Hero 4 text entrance & exit without jitter (clean hysteresis: in at 0.18, out at 0.12)
            if (self.progress > 0.18 && !isHero4Visible) {
              isHero4Visible = true
              hero4Tl.play()
            } else if (self.progress <= 0.12 && isHero4Visible) {
              isHero4Visible = false
              if (hero4IdleAnim) {
                hero4IdleAnim.pause()
              }
              hero4Tl.reverse()
            }
          },
        },
      })

      portalTl
        // 1. FAQ content gently scales down
        .to(
          '#faqContentWrapper',
          {
            scale: 0.94,
            duration: 0.8,
            ease: 'power1.out',
          },
          0
        )
        // 2. 100% SOLID OPAQUE WHITE circle expands from the EXACT DEAD CENTER (no blur, no transparency)
        .fromTo(
          '#hero4Section',
          {
            clipPath: 'circle(0% at 50% 50%)',
            webkitClipPath: 'circle(0% at 50% 50%)',
            opacity: 1,
          },
          {
            clipPath: 'circle(150% at 50% 50%)',
            webkitClipPath: 'circle(150% at 50% 50%)',
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
        // 3. Enable clicks on Hero 4 once the portal is mostly open
        .to(
          '#hero4Section',
          { pointerEvents: 'auto', duration: 0.01 },
          0.3
        )
        // 4. Parallax subtle expansion on Hero 4 content as the portal opens
        .fromTo(
          '#hero4Content',
          { scale: 0.88, y: 30 },
          { scale: 1, y: 0, duration: 1, ease: 'power2.out' },
          0
        )
        // 5. Hold / breathing space on Hero 4 before scrolling into Footer
        .to({}, { duration: 0.6 })

      // ==========================================
      // HERO 4: KINETIC PER-LETTER REVEAL & IDLE WAVE
      // ==========================================
      let hero4IdleAnim: gsap.core.Tween | null = null

      const hero4Tl = gsap.timeline({
        paused: true,
      })

      hero4Tl
        // 1. Eyebrow badge fades in
        .fromTo(
          '#hero4Eyebrow',
          { autoAlpha: 0, y: -15 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        )
        // 2. Per-character rotating domino entrance (R, then e, then a... with rotation)
        .fromTo(
          '.hero4-char',
          {
            autoAlpha: 0,
            y: 55,
            scale: 0.45,
            rotation: (index) => (index % 2 === 0 ? -28 : 28),
            transformOrigin: '50% 100%',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.65,
            stagger: {
              each: 0.022,
              from: 'start',
            },
            ease: 'back.out(2.2)',
            onComplete: () => {
              // Endless kinetic floating wave: characters are never completely static
              if (!hero4IdleAnim) {
                hero4IdleAnim = gsap.to('.hero4-char', {
                  y: -8,
                  rotation: (index) => (index % 2 === 0 ? -3.5 : 3.5),
                  duration: 1.6,
                  ease: 'sine.inOut',
                  stagger: {
                    each: 0.05,
                    repeat: -1,
                    yoyo: true,
                  },
                  repeat: -1,
                  yoyo: true,
                })
              } else {
                hero4IdleAnim.restart()
              }
            },
            onReverseComplete: () => {
              if (hero4IdleAnim) {
                hero4IdleAnim.pause()
              }
            },
          },
          '-=0.2'
        )
        // 3. Subtitle smoothly slides in after letters arrive
        .fromTo(
          '#hero4Desc',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        // 4. CTA button pops in with subtle scale
        .fromTo(
          '#hero4Cta',
          { autoAlpha: 0, scale: 0.85, y: 15 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' },
          '-=0.3'
        )

      // FAQ section: Dark Blue background -> White nav
      ScrollTrigger.create({
        trigger: '#faqSection',
        start: 'top 80px',
        end: 'bottom bottom',
        onEnter: () => updateNavTheme(false),
        onLeaveBack: () => updateNavTheme(true), // returning up to Hero 2 (White bg) -> Black nav
      })

      // ==========================================
      // FOOTER: NORRAV-STYLE GSAP SCROLL ANIMATION
      // ==========================================
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#siteFooter',
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      footerTl
        .from('.footer-top > div, .footer-top a', {
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
        })
        .from(
          '.footer-title span',
          {
            yPercent: 120,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.04,
          },
          '-=0.3'
        )

      // Footer section: Light Gray background -> Black nav
      ScrollTrigger.create({
        trigger: '#siteFooter',
        start: 'top 80px',
        onEnter: () => updateNavTheme(true),
        onLeaveBack: () => updateNavTheme(true), // returning up to Hero 4 (White bg) -> Black nav
      })

      // Refresh ScrollTrigger agar kalkulasi pin dan scroll position akurat saat reload
      ScrollTrigger.refresh()

      // Interactive 3D Cursor Parallax pada Phone Mockup (Desktop mouse move)
      const handleMouseMove = (e: MouseEvent) => {
        const phone = document.getElementById('phoneImg')
        if (!phone) return
        const x = (e.clientX / window.innerWidth - 0.5) * 16 // -8deg to +8deg
        const y = (e.clientY / window.innerHeight - 0.5) * -16

        gsap.to(phone, {
          rotationY: x,
          rotationX: y,
          transformPerspective: 900,
          ease: 'power1.out',
          duration: 0.6,
          overwrite: 'auto',
        })
      }

      const handleMouseLeave = () => {
        const phone = document.getElementById('phoneImg')
        if (!phone) return
        gsap.to(phone, {
          rotationY: 0,
          rotationX: 0,
          ease: 'power2.out',
          duration: 0.8,
          overwrite: 'auto',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, containerRef)

    return () => {
      ctx.revert()
      document.body.style.backgroundColor = ''
    }
  }, [])

  return (
    <>
      {isLoading && (
        <Preloader
          assets={[questpadImg, phoneImg, gamepadImg, taskImg, tonTokenImg]}
          onExitStart={handleExitStart}
          onComplete={handleLoadingComplete}
        />
      )}
      <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 md:px-12 pointer-events-none">
        {/* Brand / Logo area (Left) */}
        <div className="pointer-events-auto">
          <a href="#" className="flex items-center group" aria-label="QuestPad Home">
            <div className="relative w-11 h-11 md:w-12 md:h-12">
              <img
                id="navLogo"
                src={questpadImg}
                alt="QuestPad Logo"
                className="w-full h-full transition-all duration-300"
              />
            </div>
          </a>
        </div>

        {/* Header CTA: Get Started link to Telegram Bot (Right) */}
        <div className="pointer-events-auto">
          <a
            href="https://t.me/QuestPadBot"
            target="_blank"
            rel="noopener noreferrer"
            id="navGetStartedBtn"
            className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-black font-sans font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer text-center"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero 1 & Hero 2 Section (Pinned Scroll Experience) */}
      <div
        id="heroSection"
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Slogan & CTA Button (Layer di belakang phone mockup) */}
        <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 gap-8 md:gap-12 z-10 pointer-events-none">
          <h1
            className="slogan-typography select-none w-full break-words pointer-events-auto"
            id="sloganText"
          >
            <span className="line-1">PLAY, QUEST</span>
            <span className="line-2">EARN</span>
            <span className="line-3">REAL CRYPTO</span>
          </h1>

          {/* Static Get Started Pill Button & Animasi Scroll Down */}
          <div id="ctaWrapper" className="pointer-events-auto flex flex-col items-center gap-6 sm:gap-8">
            <a
              href="https://t.me/QuestPadBot"
              target="_blank"
              rel="noopener noreferrer"
              id="getStartedBtn"
              className="btn-cta inline-block bg-white hover:bg-slate-100 text-black font-sans font-bold text-sm md:text-base tracking-wider uppercase px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer text-center"
            >
              Get Started
            </a>

            {/* Animasi Scroll Down */}
            <div
              id="scrollDownIndicator"
              className="flex flex-col items-center gap-2 cursor-pointer group select-none transition-all duration-300 hover:scale-105"
              onClick={() => {
                window.scrollTo({
                  top: 700,
                  behavior: 'smooth',
                })
              }}
              title="Scroll down to explore"
              aria-label="Scroll down to explore"
            >
              <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-white/60 group-hover:border-white transition-colors duration-200 flex items-start justify-center p-1.5 shadow-xs">
                <span className="w-1.5 h-2 bg-white rounded-full animate-scroll-wheel" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.22em] text-white/70 uppercase group-hover:text-white transition-colors">
                Scroll
              </span>
            </div>
          </div>
        </main>

        {/* Phone Device Mockup Wrapper */}
        <div
          id="phoneWrapper"
          className="phone-mockup-wrapper absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4 md:px-8"
        >
          <div
            id="hero2Container"
            className="relative flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 lg:gap-12 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[720px] lg:max-w-[800px] xl:max-w-[480px]"
          >
            {/* Phone Mockup Center */}
            <div
              id="phoneInner"
              className="relative flex items-center justify-center shrink-0 w-auto"
            >
              <img
                id="phoneImg"
                src={phoneImg}
                alt="QuestPad App Preview"
                className="w-auto h-auto max-h-[28vh] sm:max-h-[32vh] md:max-h-[48vh] lg:max-h-[52vh] xl:max-h-[75vh] object-contain select-none"
              />
            </div>

            {/* Cards Container:
                - Mobile: Berjajar vertikal di bawah phone
                - Tablet: Berjajar vertikal di sisi kanan phone
                - Widescreen Desktop: Mengelilingi phone secara simetris */}
            <div
              id="cardsContainer"
              className="flex flex-col gap-2 sm:gap-2.5 w-full max-w-[340px] sm:max-w-[360px] md:w-[320px] lg:w-[340px] md:max-w-none shrink-0 xl:contents"
            >
              {/* Card 1: Play */}
              <div
                id="storyCard1"
                className="floating-story-card relative w-full xl:absolute xl:-left-[22rem] xl:top-2 xl:w-[320px] z-40 pointer-events-auto"
              >
                <div className="group relative bg-red-600 border border-red-500/80 rounded-xl md:rounded-2xl xl:rounded-3xl p-3 sm:p-3.5 md:p-4 xl:p-6 select-none transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left overflow-hidden cursor-pointer shadow-lg md:shadow-xl">
                  <div className="relative z-10 pr-16 sm:pr-20 md:pr-20 xl:pr-28">
                    <h3 className="text-sm sm:text-base md:text-lg xl:text-3xl font-black text-white tracking-tight leading-none mb-1 xl:mb-2.5">
                      Play
                    </h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs xl:text-sm text-red-100 font-sans leading-tight sm:leading-snug md:leading-snug xl:leading-relaxed">
                      Lucky Spin Wheel, Trees Forest PvP battles, and competitive seasonal arcade minigames.
                    </p>
                  </div>
                  <img
                    src={gamepadImg}
                    alt="Gamepad Illustration"
                    className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 md:-bottom-2 md:-right-2 xl:-bottom-3 xl:-right-3 w-14 sm:w-16 md:w-20 xl:w-32 h-auto object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6"
                  />
                </div>
              </div>

              {/* Card 2: Solved Quest */}
              <div
                id="storyCard2"
                className="floating-story-card relative w-full xl:absolute xl:-right-[22rem] xl:top-1/4 xl:w-[320px] z-40 pointer-events-auto"
              >
                <div className="group relative bg-emerald-600 border border-emerald-500/80 rounded-xl md:rounded-2xl xl:rounded-3xl p-3 sm:p-3.5 md:p-4 xl:p-6 select-none transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left overflow-hidden cursor-pointer shadow-lg md:shadow-xl">
                  <div className="relative z-10 pr-14 sm:pr-18 md:pr-18 xl:pr-24">
                    <h3 className="text-sm sm:text-base md:text-lg xl:text-3xl font-black text-white tracking-tight leading-none mb-1 xl:mb-2.5">
                      Solved Quest
                    </h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs xl:text-sm text-emerald-100 font-sans leading-tight sm:leading-snug md:leading-snug xl:leading-relaxed">
                      Daily check-in streaks, official Web3 partner campaigns, and instant task verifications.
                    </p>
                  </div>
                  <img
                    src={taskImg}
                    alt="Task Quest Illustration"
                    className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 md:-bottom-1.5 md:-right-1.5 xl:-bottom-2 xl:-right-2 w-12 sm:w-14 md:w-16 xl:w-28 h-auto object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6"
                  />
                </div>
              </div>

              {/* Card 3: EARN CRYPTO */}
              <div
                id="storyCard3"
                className="floating-story-card relative w-full xl:absolute xl:-left-[22rem] xl:bottom-2 xl:w-[320px] z-40 pointer-events-auto"
              >
                <div className="group relative bg-blue-600 border border-blue-500/80 rounded-xl md:rounded-2xl xl:rounded-3xl p-3 sm:p-3.5 md:p-4 xl:p-6 select-none transition-all duration-300 hover:scale-[1.02] active:scale-95 text-left overflow-hidden cursor-pointer shadow-lg md:shadow-xl">
                  <div className="relative z-10 pr-14 sm:pr-18 md:pr-18 xl:pr-24">
                    <h3 className="text-sm sm:text-base md:text-lg xl:text-3xl font-black text-white tracking-tight leading-none mb-1 xl:mb-2.5">
                      EARN CRYPTO
                    </h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs xl:text-sm text-blue-100 font-sans leading-tight sm:leading-snug md:leading-snug xl:leading-relaxed">
                      Zero deposit required. Earn real TON cryptocurrency and withdraw directly to your wallet.
                    </p>
                  </div>
                  <img
                    src={tonTokenImg}
                    alt="TON Crypto Token Illustration"
                    className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 md:-bottom-1.5 md:-right-1.5 xl:-bottom-2 xl:-right-2 w-12 sm:w-14 md:w-16 xl:w-28 h-auto object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* HERO 3: FAQ SECTION (Frequently Asked Questions)     */}
      {/* ==================================================== */}
      <section
        id="faqSection"
        className="relative z-30 -mt-[100vh] w-full min-h-[110vh] sm:min-h-[115vh] bg-[#0047AB] text-white pt-28 sm:pt-36 pb-28 sm:pb-36 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col justify-center items-center overflow-hidden border-t border-blue-400/30"
      >
        <div id="faqContentWrapper" className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center will-change-transform">
          {/* FAQ Header */}
          <div id="faqHeader" className="text-center mb-12 sm:mb-16">
            <div className="overflow-hidden mb-4">
              <h2 className="faq-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="faq-subtitle text-sm sm:text-base md:text-lg text-blue-100 font-sans max-w-2xl mx-auto leading-relaxed">
              Have questions about playing minigames, earning real TON crypto, and withdrawing with zero deposit on QuestPad? We’ve got you covered.
            </p>
          </div>

          {/* FAQ Accordion List (Floating, Pembungkus Dihapus) */}
          <div id="faqList" className="w-full flex flex-col divide-y divide-white/20 border-y border-white/20">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index
              const IconComp = item.icon
              return (
                <div
                  key={item.question}
                  className="faq-item group transition-colors duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 sm:py-6 text-left flex items-start sm:items-center justify-between gap-4 sm:gap-6 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      {/* Floating React Icon with spin & spring animation */}
                      <div className="faq-item-icon shrink-0">
                        <IconComp className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 group-hover:text-white transition-transform duration-300 group-hover:scale-115" />
                      </div>
                      <div className="faq-item-text">
                        <div className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-wider text-blue-200 mb-1">
                          {item.category}
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-blue-100 transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    {/* Floating Chevron Arrow */}
                    <div className="faq-item-arrow shrink-0">
                      <PiCaretDownBold
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Expandable Answer (Smooth CSS Grid Transition) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-10 sm:pl-12 pr-4 pb-6 pt-1">
                        <p className="text-sm sm:text-base text-blue-100 font-sans leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* HERO 4: READY TO PLAY, QUEST & EARN (CALL TO ACTION) */}
      {/* ==================================================== */}
      <section
        id="hero4Section"
        className="fixed inset-0 z-40 w-full h-screen bg-white text-slate-900 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-24 sm:py-32 overflow-hidden pointer-events-none will-change-[clip-path]"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
          WebkitClipPath: 'circle(0% at 50% 50%)',
          visibility: 'hidden',
          opacity: 1,
        }}
      >
        <div id="hero4Content" className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <p id="hero4Eyebrow" className="text-xs sm:text-sm md:text-base font-bold font-sans uppercase tracking-[0.25em] text-[#0047AB] mb-4 sm:mb-6">
            Start Earning TON Crypto Today
          </p>

          <h2
            id="hero4Headline"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08] sm:leading-[1.04] uppercase mb-6 sm:mb-8 max-w-4xl select-none"
            style={{ perspective: 1000 }}
          >
            {"Ready to Play, Quest & Earn Real Crypto?".split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="hero4-char inline-block origin-bottom will-change-transform cursor-pointer select-none transition-colors duration-150 hover:text-[#0047AB]"
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.28,
                        y: -14,
                        rotation: (Math.random() - 0.5) * 26,
                        duration: 0.22,
                        ease: 'back.out(3)',
                        yoyo: true,
                        repeat: 1,
                      })
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <p id="hero4Desc" className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 font-sans leading-relaxed mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto">
            Join thousands of Telegram players earning direct TON crypto rewards daily. Zero deposit, zero friction.
          </p>

          <div id="hero4Cta">
            <a
              href="https://t.me/QuestPadBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#0047AB] hover:bg-[#003888] text-white font-sans font-bold text-sm sm:text-base md:text-lg tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-none"
            >
              <PiTelegramLogoBold className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span>Open Telegram App</span>
              <PiArrowUpRightBold className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* FOOTER: NORRAV-STYLE GRAND FOOTER                    */}
      {/* ==================================================== */}
      <footer
        id="siteFooter"
        className="relative z-50 min-h-[90vh] sm:min-h-[85vh] md:min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 pt-12 md:pt-16 pb-4 bg-[#EEEEEE] text-slate-900 overflow-hidden border-t border-slate-300"
      >
        {/* Top footer content (Norrav Layout) */}
        <div className="w-full md:w-4/5 mx-auto footer-top font-sans flex flex-col md:flex-row md:justify-between md:mt-8 gap-10 text-sm text-slate-600">
          <div>
            <p className="font-bold text-black text-base mb-1">General Questions</p>
            <a
              href="https://t.me/Isaacnewton1234"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#0047AB] transition-colors inline-flex items-center gap-1.5"
            >
              <PiTelegramLogoBold className="w-3.5 h-3.5 text-[#0047AB]" />
              <span>@Isaacnewton1234</span>
            </a>
            <p className="mt-5 font-bold text-black text-base mb-1">Business Enquiries</p>
            <a
              href="https://t.me/Isaacnewton1234"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#0047AB] transition-colors inline-flex items-center gap-1.5"
            >
              <PiTelegramLogoBold className="w-3.5 h-3.5 text-[#0047AB]" />
              <span>@Isaacnewton1234</span>
            </a>
          </div>

          <div>
            <p className="font-bold text-black text-base mb-1">Socials</p>
            <ul className="space-y-1.5 font-medium text-slate-600">
              <li>
                <a href="https://t.me/QuestPadBot" target="_blank" rel="noopener noreferrer" className="hover:text-[#0047AB] transition-colors inline-flex items-center gap-1.5">
                  <PiTelegramLogoBold className="w-4 h-4 text-[#0047AB]" />
                  <span>Telegram Mini App</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/QuestPad" target="_blank" rel="noopener noreferrer" className="hover:text-[#0047AB] transition-colors inline-flex items-center gap-1.5">
                  <PiTelegramLogoBold className="w-4 h-4 text-[#0047AB]" />
                  <span>Telegram Community</span>
                </a>
              </li>
              <li>
                <a href="https://ton.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#0047AB] transition-colors">
                  TON Ecosystem
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-black text-base mb-1">Psst Psst. Ready to Earn?</p>
            <p className="text-slate-500 text-xs sm:text-sm mb-3 max-w-xs">
              Play arcade minigames & complete daily Web3 quests with zero deposit.
            </p>
            <a
              href="https://t.me/QuestPadBot"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-black hover:text-[#0047AB] font-bold text-base transition-colors inline-flex items-center gap-1"
            >
              <span>Launch @QuestPadBot</span>
              <PiArrowUpRightBold className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Subtle copyright row (placed above QUESTPAD) */}
        <div className="w-full md:w-4/5 mx-auto pt-6 border-t border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-slate-500 mt-10 md:mt-12">
          <span>© 2026 QuestPad. Built on TON Blockchain.</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => openLegalModal('terms')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => openLegalModal('privacy')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Giant footer text (Norrav Style) */}
        <div className="w-full flex items-end justify-center overflow-hidden pt-4 sm:pt-6">
          <h2 className="footer-title text-[9.8vw] sm:text-[10.2vw] md:text-[10.8vw] font-black text-center text-slate-950 tracking-tighter leading-none select-none uppercase overflow-hidden whitespace-nowrap">
            {"QUESTPAD".split("").map((ch, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h2>
        </div>
      </footer>

      {/* Terms of Service & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalActiveTab}
        onClose={closeLegalModal}
        onTabChange={handleLegalTabChange}
      />
    </div>
    </>
  )
}
