import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      {/* ========== HERO SECTION ========== */}
      <section id="hero" class="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* WebGL Canvas */}
        <canvas id="heroCanvas" class="absolute inset-0 w-full h-full z-0" />

        {/* Vignette overlay */}
        <div class="absolute inset-0 z-1 pointer-events-none" style="background: radial-gradient(ellipse at center, transparent 30%, rgba(6,6,14,0.85) 100%);" />

        {/* Hero Content */}
        <div class="relative z-10 text-center px-6 select-none">
          {/* Status badge */}
          <div class="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span class="text-cyan-400 text-xs font-mono tracking-widest uppercase">Available for Opportunities</span>
          </div>

          {/* Name scramble */}
          <h1 id="heroName" class="hero-name text-7xl md:text-9xl font-black tracking-tight leading-none mb-6" style="font-family: 'Space Grotesk', sans-serif; background: linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            Ritik Nipane
          </h1>

          {/* Subtitle */}
          <div id="heroSubtitle" class="overflow-hidden mb-10">
            <p class="hero-subtitle text-lg md:text-2xl font-light tracking-[0.15em] text-slate-300" style="font-family: 'Inter', sans-serif;">
              Data Analyst&nbsp;
              <span class="text-cyan-400">|</span>
              &nbsp;Turning Complex Data into Actionable Intelligence
            </p>
          </div>

          {/* CTA Buttons */}
          <div id="heroCtas" class="flex flex-wrap justify-center gap-4">
            <a href="#projects" class="magnetic-btn group relative px-8 py-3 rounded-full border border-cyan-500/60 bg-cyan-500/10 text-cyan-300 font-semibold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <span class="relative z-10">View Projects</span>
            </a>
            <a href="#contact" class="magnetic-btn group relative px-8 py-3 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300 font-semibold text-sm tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:text-white hover:bg-slate-700/50">
              <span class="relative z-10">Get In Touch</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span class="text-slate-500 text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <div class="scroll-line w-px h-16 bg-gradient-to-b from-cyan-500/80 to-transparent" style="animation: scrollLinePulse 2s ease-in-out infinite;" />
        </div>
      </section>

      {/* ========== IMPACT MARQUEE ========== */}
      <section id="marquee-section" class="relative py-5 overflow-hidden border-y border-cyan-500/10" style="background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(8,12,24,1) 100%);">
        {/* Glow edge */}
        <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 80% 100% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%);" />

        <div id="marqueeTrack" class="marquee-track flex gap-0 whitespace-nowrap cursor-pointer select-none">
          {[1, 2, 3].map(() => (
            <div class="marquee-inner flex items-center gap-0 flex-shrink-0">
              {[
                { icon: '📉', label: 'Reduced Discrepancies', value: '25%' },
                { icon: '💰', label: 'Annual Savings', value: '₹5 Lakh' },
                { icon: '📦', label: 'SKUs Centralized', value: '5,000+' },
                { icon: '⚡', label: 'Efficiency Improved', value: '20%' },
                { icon: '📊', label: 'Dashboards Built', value: '15+' },
                { icon: '🎯', label: 'Risk Accuracy', value: '+15%' },
                { icon: '🏭', label: 'Overstocking Reduced', value: '15%' },
                { icon: '👥', label: 'Teams Empowered', value: '50+' },
              ].map((stat) => (
                <div class="marquee-item inline-flex items-center gap-4 px-8 py-1">
                  <span class="text-slate-500 text-xs font-mono">{stat.icon}</span>
                  <span class="text-slate-400 text-sm font-medium tracking-wide">{stat.label}</span>
                  <span class="text-cyan-400 text-lg font-bold font-mono tracking-tight">{stat.value}</span>
                  <span class="text-slate-700 mx-2 text-xl">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ========== ABOUT / SUMMARY ========== */}
      <section id="about" class="relative py-32 px-6" style="background: rgba(6,6,14,1);">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Big number stats */}
          <div class="space-y-12">
            <div class="reveal-up">
              <span class="text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase">// About</span>
              <h2 class="text-5xl md:text-6xl font-black text-white mt-4 leading-tight" style="font-family: 'Space Grotesk', sans-serif;">
                Data-Driven<br />
                <span class="text-gradient-cyan">Decision Maker</span>
              </h2>
            </div>
            <div class="grid grid-cols-2 gap-6">
              {[
                { num: '2+', label: 'Years Experience' },
                { num: '15+', label: 'Dashboards Built' },
                { num: '5K+', label: 'SKUs Managed' },
                { num: '₹5L', label: 'Cost Savings' },
              ].map((stat) => (
                <div class="stat-card reveal-up p-6 rounded-2xl border border-slate-800 bg-slate-900/50 group hover:border-cyan-500/30 transition-all duration-500">
                  <div class="text-4xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">{stat.num}</div>
                  <div class="text-slate-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <div class="reveal-up space-y-6">
            <p class="text-slate-300 text-lg leading-relaxed">
              Data Analyst with <span class="text-cyan-400 font-semibold">2+ years</span> specializing in financial, operational, and supply chain risk analysis. I transform raw, complex datasets into strategic intelligence that drives measurable business outcomes.
            </p>
            <p class="text-slate-400 leading-relaxed">
              Experienced in Python, SQL, and Excel for cleaning, modeling, and analyzing large datasets. Skilled in building dashboards that identify risk patterns, detect anomalies, and support strategic decision-making.
            </p>
            <div class="flex flex-wrap gap-3 pt-4">
              {['Python', 'Excel', 'SQL', 'Power BI', 'Tableau','Looker','Google Sheet'].map((tool) => (
                <span class="skill-tag px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-sm font-mono hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 cursor-default">
                  {tool}
                </span>
              ))}
            </div>
            <div class="flex gap-4 pt-2">
              <a href="mailto:ritiknipane456@gmail.com" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                ritiknipane456@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE TIMELINE ========== */}
      <section id="experience" class="relative py-24 px-6 overflow-hidden" style="background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(4,8,20,1) 100%);">
        <div class="max-w-6xl mx-auto">
          {/* Section header */}
          <div class="text-center mb-20 reveal-up">
            <span class="text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase">// Experience</span>
            <h2 class="text-5xl md:text-6xl font-black text-white mt-4" style="font-family: 'Space Grotesk', sans-serif;">
              The <span class="text-gradient-cyan">Data Pipeline</span>
            </h2>
            <p class="text-slate-500 mt-4 max-w-xl mx-auto">A career journey where each role fed insights forward — like data flowing through a processing pipeline.</p>
          </div>

          {/* Pipeline container */}
          <div class="timeline-container relative">
            {/* SVG Pipeline path */}
            <svg id="pipelineSvg" class="pipeline-svg absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-0" width="4" height="100%" viewBox="0 0 4 800" preserveAspectRatio="none" style="height: 100%; overflow: visible;">
              <defs>
                <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.2" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Track line */}
              <line x1="2" y1="0" x2="2" y2="800" stroke="rgba(6,182,212,0.15)" stroke-width="2" />
              {/* Animated data packet */}
              <circle id="dataPacket" cx="2" cy="0" r="5" fill="#06b6d4" filter="url(#glow)" opacity="0">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
              {/* Glow trail */}
              <line id="pipelineProgress" x1="2" y1="0" x2="2" y2="0" stroke="url(#pipeGrad)" stroke-width="2" />
            </svg>

            {/* Experience Cards */}
            <div class="timeline-cards space-y-24 relative z-10">

              {/* ---- BTIPL ---- */}
              <div class="timeline-entry group relative flex flex-col md:flex-row items-start gap-8 md:gap-16" data-index="0">
                {/* Connector node (center) */}
                <div class="timeline-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-cyan-500 bg-slate-950 z-20 items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {/* Left: Date & meta */}
                <div class="md:w-1/2 md:text-right md:pr-16 pt-2 reveal-left">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span class="text-cyan-400 text-xs font-mono">Apr 2024 – Present</span>
                  </div>
                  <div class="text-slate-500 text-sm font-mono">Mumbai, India</div>
                  <div class="mt-4 flex md:justify-end gap-2 flex-wrap">
                    {['Python', 'Power BI', 'Looker', 'SQL'].map(t => (
                      <span class="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: Card */}
                <div class="md:w-1/2 md:pl-16 reveal-right">
                  <div class="experience-card relative p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group-hover:border-cyan-500/30 transition-all duration-500" style="transform-style: preserve-3d;">
                    {/* Cinematic glow accent */}
                    <div class="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Featured badge */}
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 mb-4">
                      <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span class="text-cyan-400 text-xs font-semibold">Current Role</span>
                    </div>

                    <h3 class="text-2xl font-black text-white mb-1" style="font-family: 'Space Grotesk', sans-serif;">Data Analyst</h3>
                    <p class="text-cyan-400 font-semibold mb-6">BTIPL</p>

                    <ul class="space-y-3">
                      {[
                        { icon: '💹', text: 'Built automated dashboards for revenue, expenses, cash flow & P&L — enabling early detection of loss-making months.' },
                        { icon: '🔍', text: 'Developed Expense Tracking System that cut financial discrepancies by 25% and identified cost leakages across logistics and warehousing.' },
                        { icon: '🌍', text: 'Analyzed supplier risk across Japan, China & Europe — tracking pricing trends, lead times, and duty fluctuations. Result: ₹5 Lakh annual savings.' },
                        { icon: '📦', text: 'Inventory Risk Analysis using 1Y/6M/3M sales trends for MSQ, Safety Stock, and reorder levels — reducing overstocking by 15%.' },
                        { icon: '🎯', text: 'Centralized 5,000+ SKUs in a Bearing Stock & Sales Monitoring Dashboard, cutting manual tracking errors by 20%.' },
                        { icon: '👥', text: 'Standardized reporting systems empowering 50+ employees across sales, purchase, and finance teams.' },
                      ].map((item) => (
                        <li class="exp-bullet flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                          <span class="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ---- Liquiloans ---- */}
              <div class="timeline-entry group relative flex flex-col md:flex-row items-start gap-8 md:gap-16" data-index="1">
                <div class="timeline-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-amber-500 bg-slate-950 z-20 items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-amber-400" />
                </div>

                {/* Left: Card */}
                <div class="md:w-1/2 md:pr-16 reveal-left">
                  <div class="experience-card relative p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group-hover:border-amber-500/30 transition-all duration-500" style="transform-style: preserve-3d;">
                    <div class="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div class="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span class="text-amber-400 text-xs font-semibold">Strategy Intern</span>
                    </div>

                    <h3 class="text-2xl font-black text-white mb-1" style="font-family: 'Space Grotesk', sans-serif;">Strategy Intern</h3>
                    <p class="text-amber-400 font-semibold mb-6">Liquiloans</p>

                    <ul class="space-y-3">
                      {[
                        { icon: '📊', text: 'Developed 5 risk & performance monitoring dashboards using Power BI, Looker Studio, Excel & Python for portfolio trend analysis.' },
                        { icon: '🏅', text: 'Built a unified Gold Loan Risk Dashboard — improving operational risk efficiency by 20%.' },
                        { icon: '🔎', text: 'Analyzed corporate & IFA historical data to identify risk patterns and default trends, improving risk assessment accuracy by 15%.' },
                        { icon: '⚙️', text: 'Streamlined data flows with cross-functional teams, contributing to a 10% reduction in operational turnaround time.' },
                      ].map((item) => (
                        <li class="exp-bullet flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                          <span class="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Date & meta */}
                <div class="md:w-1/2 md:pl-16 pt-2 reveal-right">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span class="text-amber-400 text-xs font-mono">Nov 2023 – Feb 2024</span>
                  </div>
                  <div class="text-slate-500 text-sm font-mono">Mumbai, India</div>
                  <div class="mt-4 flex gap-2 flex-wrap">
                    {['Power BI', 'Looker', 'Python', 'Excel'].map(t => (
                      <span class="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---- FlipRobo ---- */}
              <div class="timeline-entry group relative flex flex-col md:flex-row items-start gap-8 md:gap-16" data-index="2">
                <div class="timeline-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-violet-500 bg-slate-950 z-20 items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-violet-400" />
                </div>

                {/* Left: Date & meta */}
                <div class="md:w-1/2 md:text-right md:pr-16 pt-2 reveal-left">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span class="text-violet-400 text-xs font-mono">Jun 2023 – Nov 2023</span>
                  </div>
                  <div class="text-slate-500 text-sm font-mono">Mumbai, India</div>
                  <div class="mt-4 flex md:justify-end gap-2 flex-wrap">
                    {['Python', 'SQL', 'Looker', 'Excel'].map(t => (
                      <span class="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: Card */}
                <div class="md:w-1/2 md:pl-16 reveal-right">
                  <div class="experience-card relative p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group-hover:border-violet-500/30 transition-all duration-500" style="transform-style: preserve-3d;">
                    <div class="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
                      <span class="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      <span class="text-violet-400 text-xs font-semibold">Data Science Intern</span>
                    </div>

                    <h3 class="text-2xl font-black text-white mb-1" style="font-family: 'Space Grotesk', sans-serif;">Data Science Intern</h3>
                    <p class="text-violet-400 font-semibold mb-6">FlipRobo</p>

                    <ul class="space-y-3">
                      {[
                        { icon: '🧮', text: 'Analyzed financial data using Python, SQL, Looker & Excel — driving insights that boosted operational efficiency by 15%.' },
                        { icon: '⚙️', text: 'Configured and enhanced finance modules within Workday, improving module accuracy by 95%.' },
                        { icon: '🔗', text: 'Collaborated with cross-functional teams to optimize data workflows, reducing processing errors by 20%.' },
                      ].map((item) => (
                        <li class="exp-bullet flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                          <span class="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========== SKILLS SECTION ========== */}
      <section id="skills" class="relative py-32 px-6" style="background: rgba(6,6,14,1);">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20 reveal-up">
            <span class="text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase">// Skills</span>
            <h2 class="text-5xl md:text-6xl font-black text-white mt-4" style="font-family: 'Space Grotesk', sans-serif;">
              Technical <span class="text-gradient-cyan">Arsenal</span>
            </h2>
          </div>

          {/* Radar chart container */}
          <div class="flex flex-col lg:flex-row gap-16 items-center">
            <div class="lg:w-1/2 flex justify-center reveal-left">
              <canvas id="radarChart" width="420" height="420" class="max-w-full" />
            </div>

            {/* Skill tags */}
            <div class="lg:w-1/2 space-y-8 reveal-right">
              {[
                {
                  category: 'Languages',
                  color: 'cyan',
                  skills: ['Python','Excel', 'GoogleSheet', 'SQL']
                },
                {
                  category: 'BI & Visualization Tools',
                  color: 'amber',
                  skills: ['Power BI', 'Tableau', 'Looker Studio']
                },
                {
                  category: 'Core Competencies',
                  color: 'violet',
                  skills: ['Risk Analysis', 'Financial Modeling', 'Supply Chain Analytics']
                },
                {
                  category: 'Frameworks & Libraries',
                  color: 'blue',
                  skills: ['Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn']
                },
              ].map((cat) => (
                <div class="skill-category" data-color={cat.color}>
                  <div class="flex items-center gap-3 mb-3">
                    <div class={`w-2 h-2 rounded-full skill-dot-${cat.color}`} />
                    <span class={`text-sm font-mono tracking-wider uppercase skill-label-${cat.color}`}>{cat.category}</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span class={`skill-tag-interactive px-4 py-2 rounded-full border text-sm font-medium cursor-default select-none skill-chip-${cat.color}`} data-skill={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" class="relative py-24" style="background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(4,8,20,1) 100%);">
        <div class="max-w-6xl mx-auto px-6 mb-16 text-center reveal-up">
          <span class="text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase">// Projects</span>
          <h2 class="text-5xl md:text-6xl font-black text-white mt-4" style="font-family: 'Space Grotesk', sans-serif;">
            Featured <span class="text-gradient-cyan">Work</span>
          </h2>
          <p class="text-slate-500 mt-4 max-w-xl mx-auto">Real-world data solutions built to reduce risk, cut costs, and drive strategic growth.</p>
        </div>

        {/* Pinned scroll container */}
        <div id="projectsPin" class="projects-pin-container">
          {[
            {
              id: 'proj1',
              num: '01',
              title: 'Supply Chain Risk Intelligence',
              subtitle: 'BTIPL — Operational Risk',
              desc: 'End-to-end supply chain risk dashboard tracking import pricing trends, lead times, shipment delays, and duty fluctuations across suppliers in Japan, China, and Europe.',
              metrics: ['₹5L Saved', '25% Fewer Errors', '3 Regions'],
              color: 'cyan',
              tags: ['Python','Excel', 'SQL','Power BI'],
              icon: '🌐'
            },
            {
              id: 'proj2',
              num: '02',
              title: 'Inventory & Stock Optimizer',
              subtitle: 'BTIPL — Inventory Analytics',
              desc: 'Centralized 5,000+ bearing SKUs with automated MSQ, Safety Stock, and reorder level calculations using 1Y/6M/3M sales trend analysis. Cut overstocking by 15%.',
              metrics: ['5K+ SKUs', '15% Less Overstock', '20% Error Reduction'],
              color: 'amber',
              tags: ['Excel', 'Python','SQL' 'Looker'],
              icon: '📦'
            },
            {
              id: 'proj3',
              num: '03',
              title: 'Gold Loan Risk Dashboard',
              subtitle: 'Liquiloans — Credit Risk',
              desc: 'Unified Gold Loan Risk Dashboard providing visibility into credit risk indicators, IFA performance profiles, and portfolio-wide anomaly detection for strategic risk mitigation.',
              metrics: ['20% Efficiency Gain', '15% Better Accuracy', '5 Dashboards'],
              color: 'violet',
              tags: ['Python','Excel', 'SQL', 'Looker|Power BI' ],
              icon: '🏅'
            },
            {
              id: 'proj4',
              num: '04',
              title: 'Financial P&L Automation',
              subtitle: 'BTIPL — Financial Analytics',
              desc: 'Automated revenue, expense, cash flow, and P&L dashboards for early detection of loss-making months, cash shortages, and margin risks across product segments.',
              metrics: ['50+ Users', 'Real-time Alerts', 'Margin Insights'],
              color: 'blue',
              tags: ['Python', 'Excel','SQL','Power BI' ],
              icon: '💹'
            },
          ].map((project, i) => (
            <div class="project-slide relative min-h-screen flex flex-col lg:flex-row items-center gap-0" data-project={project.id}>
              {/* Left: Pinned info */}
              <div class="project-info lg:w-5/12 px-8 lg:px-16 py-16 flex flex-col justify-center min-h-screen">
                <div class="reveal-up">
                  <div class={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 project-badge-${project.color}`}>
                    <span class="text-lg">{project.icon}</span>
                    <span class={`text-xs font-mono project-badge-text-${project.color}`}>{project.subtitle}</span>
                  </div>
                  <div class="text-slate-700 font-black text-8xl mb-2 font-mono leading-none">{project.num}</div>
                  <h3 class={`text-3xl md:text-4xl font-black text-white mb-6 leading-tight project-title-${project.color}`} style="font-family: 'Space Grotesk', sans-serif;">{project.title}</h3>
                  <p class="text-slate-400 leading-relaxed mb-8">{project.desc}</p>
                  <div class="flex flex-wrap gap-2 mb-8">
                    {project.metrics.map(m => (
                      <span class={`px-3 py-1 rounded-full text-xs font-bold font-mono project-metric-${project.color}`}>{m}</span>
                    ))}
                  </div>
                  <div class="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(t => (
                      <span class="px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono">{t}</span>
                    ))}
                  </div>
                  <a href="#contact" class={`magnetic-btn view-btn inline-flex items-center gap-3 px-7 py-3 rounded-full font-semibold text-sm tracking-wider view-btn-${project.color}`}>
                    <span>Explore Project</span>
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>

              {/* Right: Mockup visual */}
              <div class={`project-visual lg:w-7/12 min-h-screen flex items-center justify-center p-8 lg:p-16 project-visual-bg-${project.color}`}>
                <div class="project-mockup w-full max-w-2xl reveal-up">
                  <div class="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl" style="background: rgba(8,12,24,0.95);">
                    {/* Browser bar */}
                    <div class="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                      <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500/60" />
                        <div class="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div class="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <div class="flex-1 mx-4">
                        <div class="h-5 rounded-md bg-slate-800 flex items-center px-3">
                          <span class={`text-xs font-mono project-url-text-${project.color}`}>analytics.btipl.com/{project.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard mockup content */}
                    <div class="p-6 space-y-4" style="min-height: 360px;">
                      {/* Top metric row */}
                      <div class="grid grid-cols-3 gap-3">
                        {project.metrics.map((m, j) => (
                          <div class={`metric-card p-4 rounded-xl metric-card-${project.color}`}>
                            <div class={`text-lg font-black font-mono metric-val-${project.color}`}>{m.split(' ')[0]}</div>
                            <div class="text-slate-500 text-xs mt-1">{m.split(' ').slice(1).join(' ')}</div>
                          </div>
                        ))}
                      </div>

                      {/* Chart area */}
                      <div class={`chart-area rounded-xl p-4 chart-bg-${project.color}`} style="height: 140px; position: relative; overflow: hidden;">
                        <div class="absolute top-3 left-4 right-4 flex justify-between items-center">
                          <span class="text-slate-400 text-xs font-mono">Trend Analysis</span>
                          <span class={`text-xs font-mono chart-label-${project.color}`}>Live</span>
                        </div>
                        {/* Animated bars */}
                        <div class="absolute bottom-4 left-4 right-4 flex items-end gap-1.5" style="height: 80px;">
                          {[60, 75, 45, 90, 65, 80, 55, 95, 70, 85, 50, 88].map((h, j) => (
                            <div class={`flex-1 rounded-sm chart-bar-${project.color}`} style={`height: ${h}%; opacity: ${0.4 + (j % 4) * 0.15}; animation: barGrow 1s ease-out ${j * 0.05}s both;`} />
                          ))}
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div class="grid grid-cols-2 gap-3">
                        <div class={`rounded-xl p-4 row-card-${project.color}`}>
                          <div class="text-slate-500 text-xs font-mono mb-2">Risk Score</div>
                          <div class="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div class={`h-full rounded-full risk-bar-${project.color}`} style="width: 72%; animation: fillBar 1.5s ease-out 0.5s both;" />
                          </div>
                          <div class={`text-xs font-mono mt-1 risk-label-${project.color}`}>72 / 100</div>
                        </div>
                        <div class={`rounded-xl p-4 row-card-${project.color}`}>
                          <div class="text-slate-500 text-xs font-mono mb-2">Data Quality</div>
                          <div class="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div class={`h-full rounded-full quality-bar-${project.color}`} style="width: 94%; animation: fillBar 1.5s ease-out 0.7s both;" />
                          </div>
                          <div class={`text-xs font-mono mt-1 quality-label-${project.color}`}>94 / 100</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== EDUCATION & CERTIFICATIONS ========== */}
      <section id="education" class="relative py-32 px-6" style="background: rgba(6,6,14,1);">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20 reveal-up">
            <span class="text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase">// Education & Certifications</span>
            <h2 class="text-5xl md:text-6xl font-black text-white mt-4" style="font-family: 'Space Grotesk', sans-serif;">
              Built on <span class="text-gradient-cyan">Knowledge</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div class="reveal-left">
              <div class="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 h-full">
                <div class="flex items-start gap-4 mb-8">
                  <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-black text-white" style="font-family: 'Space Grotesk', sans-serif;">B.Sc. Information Technology</h3>
                    <p class="text-cyan-400 font-medium mt-1">University of Mumbai</p>
                    <p class="text-slate-500 text-sm mt-1">CGPA: 7.3 • Mumbai, India</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-slate-500 text-xs font-mono tracking-wider uppercase mb-3">Relevant Coursework</p>
                  {['Machine Learning', 'Data Structures & Algorithms', 'Data Visualization', 'Data Science'].map(c => (
                    <div class="flex items-center gap-3 text-slate-400 text-sm">
                      <div class="w-1 h-1 rounded-full bg-cyan-500" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div class="reveal-right">
              <div class="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 h-full">
                <div class="flex items-center gap-3 mb-8">
                  <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <h3 class="text-xl font-black text-white" style="font-family: 'Space Grotesk', sans-serif;">Certifications</h3>
                </div>
                <div class="space-y-3">
                  {[
                    { name: 'IBM Python for Data Science', org: 'IBM' },
                    { name: 'Data Analytics & Visualization', org: 'Accenture' },
                    { name: 'SQL (Intermediate)', org: 'HackerRank' },
                    { name: 'Microsoft 365 Certified', org: 'Microsoft' },
                    { name: 'Data Science Certification', org: 'Industry' },
                    { name: 'Data Analysis using Excel', org: 'Industry' },
                  ].map((cert) => (
                    <div class="cert-item flex items-center justify-between py-2 border-b border-slate-800 last:border-0 group">
                      <div class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                          <div class="w-2 h-2 rounded-full bg-amber-400" />
                        </div>
                        <span class="text-slate-300 text-sm group-hover:text-white transition-colors">{cert.name}</span>
                      </div>
                      <span class="text-slate-600 text-xs font-mono">{cert.org}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" class="relative py-32 px-6 overflow-hidden" style="background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(2,4,12,1) 100%);">
        {/* Background glow */}
        <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(6,182,212,0.08) 0%, transparent 70%);" />

        <div class="max-w-4xl mx-auto text-center relative z-10">
          <div class="reveal-up">
            <span class="text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase">// Contact</span>
            <h2 class="text-5xl md:text-7xl font-black text-white mt-4 mb-8 leading-tight" style="font-family: 'Space Grotesk', sans-serif;">
              Let's Build<br />
              <span class="text-gradient-cyan">Something Impactful</span>
            </h2>
            <p class="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              I'm actively looking for the next big challenge. If you need someone to transform your data into competitive advantage, let's talk.
            </p>
          </div>

          {/* Contact links */}
          <div class="reveal-up flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="mailto:ritiknipane456@gmail.com" class="magnetic-btn group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-semibold hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ritiknipane456@gmail.com
            </a>
            <a href="tel:+919082116054" class="magnetic-btn flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 9082116054
            </a>
          </div>

          {/* Social links */}
          <div class="reveal-up flex justify-center gap-6">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ritik-nipane-70ab4b1a6/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { name: 'GitHub', url: 'https://github.com/Ritik-Nipane', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
            ].map((social) => (
              <a href={social.url} target="_blank" rel="noopener noreferrer" class="group w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer class="border-t border-slate-900 py-8 px-6" style="background: rgba(2,4,12,1);">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span class="text-slate-600 text-sm font-mono">© 2025 Ritik Nipane. All rights reserved.</span>
          <span class="text-slate-700 text-xs font-mono">Built with precision. Driven by data.</span>
        </div>
      </footer>
    </>
  )
})

export default app
