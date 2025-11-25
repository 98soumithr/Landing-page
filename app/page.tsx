'use client'

import { useAttribution } from '@/hooks/useAttribution'
import { useEffect } from 'react'

// Type declaration for Cal.com
declare global {
  interface Window {
    Cal?: any
  }
}

export default function Home() {
  const { demoUrl } = useAttribution()
  
  // Load Cal.com embed script exactly as provided
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[data-cal-embed]')) {
      return
    }
    
    // Create and inject the Cal.com embed script exactly as provided
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.setAttribute('data-cal-embed', 'true')
    script.textContent = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "secret", { origin: "https://app.cal.com" });

      Cal.ns.secret("inline", {
        elementOrSelector: "#my-cal-inline-secret",
        config: { "layout": "month_view" },
        calLink: "growwith-lokii-do9let/secret",
      });

      Cal.ns.secret("ui", {
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    `
    
    document.body.appendChild(script)
    
    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[data-cal-embed]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])
  
  // Function to scroll to calendar
  const scrollToCalendar = () => {
    const calendarSection = document.getElementById('booking-section')
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="w-full border-b border-gray-100/50 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#253C80]">keel</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="https://saykeel.com"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                About
              </a>
              <button
                onClick={scrollToCalendar}
                className="bg-[#253C80] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#1e2f66] transition-all shadow-sm hover:shadow-md"
              >
                Book Demo
              </button>
            </nav>
            <div className="md:hidden">
              <button
                onClick={scrollToCalendar}
                className="bg-[#253C80] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1e2f66] transition-colors text-sm"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#253C80]/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#253C80]/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#253C80] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#253C80]">Never Miss a Call Again</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Stop Losing Revenue to
              <span className="block text-[#253C80] mt-2">Missed Calls</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto">
              Every voicemail is a lost customer. Every missed call is money walking out the door.
            </p>
            <p className="text-lg sm:text-xl text-gray-700 mb-12 font-medium max-w-2xl mx-auto">
              Keel's AI receptionists answer instantly, 24/7, so you never lose a lead again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToCalendar}
                className="group bg-[#253C80] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#1e2f66] transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Book Your Demo
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <a
                href="https://saykeel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-300 transition-all hover:shadow-md"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The Hidden Cost of Missed Calls
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every time a customer calls and gets voicemail, you're losing money. Here's what's really happening:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lost Revenue</h3>
              <p className="text-gray-600 leading-relaxed">
                Studies show <strong>80% of callers hang up</strong> when they reach voicemail. That's 4 out of 5 potential customers gone before you even know they called.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Poor Customer Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Customers expect instant answers. When they get voicemail, they feel ignored. <strong>They'll call your competitor instead.</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can't Scale Manually</h3>
              <p className="text-gray-600 leading-relaxed">
                Hiring more staff is expensive and slow. You can't be available 24/7. <strong>Your business growth is limited by your availability.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How Keel Solves This
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One AI receptionist that works around the clock, never takes breaks, and never misses a call.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#253C80]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#253C80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Response, Every Time</h3>
              <p className="text-gray-600 leading-relaxed">
                Keel answers in seconds, not hours. No voicemails. No missed opportunities. Every caller gets a professional, human-like response immediately.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#253C80]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#253C80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Setup, Maximum Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Get started in minutes. No training. No hiring. No downtime. Just plug it in and start capturing every call that comes in.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#253C80]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#253C80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scales With You, Instantly</h3>
              <p className="text-gray-600 leading-relaxed">
                Handle 10 calls or 10,000 calls. Keel never gets overwhelmed, never needs a break, and never costs more per call as you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Hooks / Features Section */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Makes Keel Different
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not just another chatbot. A complete AI receptionist that thinks, responds, and books like a human.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#253C80]/20 transition-all">
              <div className="text-3xl font-bold text-[#253C80] mb-2">24/7</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Available</h3>
              <p className="text-gray-600 text-sm">
                Never close. Never take a break. Every caller gets answered, even at 3 AM on holidays.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#253C80]/20 transition-all">
              <div className="text-3xl font-bold text-[#253C80] mb-2">&lt;5s</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Response</h3>
              <p className="text-gray-600 text-sm">
                No waiting. No hold music. Customers get answers before they even think about hanging up.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#253C80]/20 transition-all">
              <div className="text-3xl font-bold text-[#253C80] mb-2">0</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Missed Calls</h3>
              <p className="text-gray-600 text-sm">
                Capture every single call. Every lead. Every opportunity. Nothing falls through the cracks.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#253C80]/20 transition-all">
              <div className="text-3xl font-bold text-[#253C80] mb-2">100%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated</h3>
              <p className="text-gray-600 text-sm">
                Fully automated booking, scheduling, and lead capture. No manual work required.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#253C80]/20 transition-all">
              <div className="text-3xl font-bold text-[#253C80] mb-2">∞</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlimited Scale</h3>
              <p className="text-gray-600 text-sm">
                Handle any volume. From 10 calls a day to 10,000. No additional cost per call.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#253C80]/20 transition-all">
              <div className="text-3xl font-bold text-[#253C80] mb-2">5min</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Setup Time</h3>
              <p className="text-gray-600 text-sm">
                Go from signup to live in 5 minutes. No complex integrations. No technical knowledge needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253C80]/5 to-transparent rounded-3xl p-12 border border-[#253C80]/10">
            <div className="text-center">
              <svg className="w-12 h-12 text-[#253C80] mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-3.312.734-5.996 3.888-5.996 7.558 0 4.089 3.134 7.092 6.912 7.201v2.09h-10.895zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-3.313.734-5.996 3.888-5.996 7.558 0 4.089 3.134 7.092 6.912 7.201v2.09h-10.916z"/>
              </svg>
              <p className="text-xl sm:text-2xl text-gray-900 font-medium mb-6 leading-relaxed">
                "Keel helped us cut call handling time by 70% and never miss a lead again. It's like having a receptionist that never sleeps."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-[#253C80] rounded-full flex items-center justify-center text-white font-semibold">
                  SC
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-600">Operations Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking/Calendar Section */}
      <section id="booking-section" className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Ready to Never Miss a Call Again?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Book a 15-minute demo and see how Keel can transform your call handling. No commitment, just answers.
              </p>
            </div>

            {/* Cal.com Inline Embed */}
            <div 
              id="my-cal-inline-secret" 
              style={{ width: '100%', height: '100%', overflow: 'scroll', minHeight: '600px' }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-semibold text-white">keel</span>
            </div>
            <nav className="flex items-center gap-6 mb-4 md:mb-0">
              <a
                href="https://saykeel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
              >
                About
              </a>
              <button
                onClick={scrollToCalendar}
                className="text-sm hover:text-white transition-colors"
              >
                Book Demo
              </button>
            </nav>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm">
            <p>© Keel 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
