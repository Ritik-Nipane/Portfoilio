import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ritik Nipane — Data Analyst</title>
        <meta name="description" content="Data Analyst specializing in financial, operational, and supply chain risk analysis. Turning complex data into actionable intelligence." />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />

        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com" />

        {/* GSAP */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js" />

        {/* Lenis Smooth Scroll */}
        <script src="https://cdn.jsdelivr.net/npm/lenis@latest/dist/lenis.min.js" />

        {/* Three.js */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" />

        {/* Main CSS */}
        <link href="/static/style.css" rel="stylesheet" />

        {/* Tailwind config for custom colors */}
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  onyx: '#06060E',
                  slate: {
                    950: '#020408',
                  }
                }
              }
            }
          }
        `}} />
      </head>
      <body class="bg-onyx text-white overflow-x-hidden" style="background-color: #06060E;">
        {/* Custom cursor */}
        <div id="cursor" class="fixed w-4 h-4 rounded-full border border-cyan-400/70 pointer-events-none z-50 mix-blend-screen transition-transform duration-100" style="transform: translate(-50%, -50%); top: 0; left: 0;" />
        <div id="cursorTrail" class="fixed w-8 h-8 rounded-full border border-cyan-400/20 pointer-events-none z-49 mix-blend-screen" style="transform: translate(-50%, -50%); top: 0; left: 0;" />

        {/* Nav */}
        <nav id="mainNav" class="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-500">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <a href="#hero" class="font-black text-white tracking-tight" style="font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem;">
              RN<span class="text-cyan-400">.</span>
            </a>
            <div class="hidden md:flex items-center gap-8">
              {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a href={`#${item.toLowerCase()}`} class="text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200 tracking-wide">{item}</a>
              ))}
            </div>
            <a href="mailto:ritiknipane456@gmail.com" class="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-wider hover:bg-cyan-500/10 transition-all duration-300">
              Hire Me →
            </a>
          </div>
        </nav>

        {children}

        {/* Main JavaScript */}
        <script src="/static/app.js" />
      </body>
    </html>
  )
})
