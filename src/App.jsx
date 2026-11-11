import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  GraduationCap,
  Layers3,
  Lightbulb,
  LoaderCircle,
  Menu,
  MessageCircle,
  MonitorPlay,
  MousePointer2,
  Orbit,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Workflow,
  X,
} from 'lucide-react';
import SilkWaves from './components/SilkWaves.jsx';

const EASE = [0.22, 1, 0.36, 1];
const DEMO_BATCHES = ['07 Dec 2026 (demo)', '11 Jan 2027 (demo)', '08 Feb 2027 (demo)'];

const audiences = [
  { icon: GraduationCap, title: 'College students', text: 'Turn coursework and curiosity into practical AI projects you can explain and add to a portfolio.', outcome: 'Leave with a clearer starting point and a project direction.' },
  { icon: Rocket, title: 'Fresh graduates', text: 'Build confidence with modern tools, practical workflows and digital skills that translate into useful work.', outcome: 'Create examples that help you talk about your skills.' },
  { icon: BriefcaseBusiness, title: 'Working professionals', text: 'Apply AI to research, reporting, content and repetitive workflows without losing human judgement.', outcome: 'Find practical ways to make everyday work more effective.' },
];

const outcomes = [
  { icon: Code2, title: 'Build a website with AI', text: 'Turn a brief into a responsive landing page and refine it with AI-assisted tools.' },
  { icon: Workflow, title: 'Automate boring work', text: 'Map a repeatable task and connect forms, tools and review steps into a workflow.' },
  { icon: Sparkles, title: 'Create content and carousels', text: 'Research a topic, shape a clear story and produce a reusable visual content draft.' },
  { icon: Database, title: 'Analyse data with AI', text: 'Explore a dataset, ask better questions and communicate useful findings.' },
  { icon: Layers3, title: 'Build a portfolio', text: 'Document your process, decisions and finished projects in a shareable format.' },
  { icon: BriefcaseBusiness, title: 'Use AI at work', text: 'Use AI for planning, research, drafting and analysis while checking important outputs.' },
];

const programmes = [
  {
    id: 'foundations', name: 'AI Foundations', duration: '4 weeks', format: 'Live online', level: 'Beginner', price: '₹4,999', early: '₹3,999', popular: false,
    description: 'Build a practical base in AI tools, prompting and responsible use.',
    bullets: ['AI basics and everyday use cases', 'Prompting for research and creation', 'Source checks and responsible AI', 'A guided personal mini-project'],
  },
  {
    id: 'work', name: 'AI for Work & Automation', duration: '6 weeks', format: 'Live online', level: 'Beginner–intermediate', price: '₹8,999', early: '₹7,499', popular: true,
    description: 'Use AI and no-code automation to make repeatable work more efficient.',
    bullets: ['AI-assisted documents and research', 'Workflow mapping and automation', 'Connectors, triggers and review steps', 'A working automation prototype'],
  },
  {
    id: 'build', name: 'Build with AI: Websites & Apps', duration: '8 weeks', format: 'Live online', level: 'Beginner-friendly', price: '₹12,999', early: '₹10,999', popular: false,
    description: 'Shape an idea into a useful website or lightweight app using AI-assisted development.',
    bullets: ['Idea, audience and product scope', 'AI-assisted UI and code workflows', 'Forms, data and interaction basics', 'A portfolio-ready prototype'],
  },
];

const curriculum = [
  {
    id: 'foundations', title: 'AI Foundations · 4 weeks', subtitle: 'Understand the tools, prompt with purpose and build a first project.',
    weeks: [
      ['Week 01', 'AI in everyday life', 'How modern AI works at a useful level, where it helps and where it can fail.'],
      ['Week 02', 'Prompting with purpose', 'Give clear instructions, add context, refine outputs and compare responses.'],
      ['Week 03', 'Research and responsible use', 'Check sources, protect private information and recognise bias or hallucinations.'],
      ['Week 04', 'Build and present', 'Create a guided AI-assisted research or content project and explain your decisions.'],
    ], project: 'An AI-assisted research brief with source checks and a short walkthrough.'
  },
  {
    id: 'work', title: 'AI for Work & Automation · 6 weeks', subtitle: 'Apply AI to repeatable tasks and design a workflow with human review.',
    weeks: [
      ['Week 01', 'Map the work', 'Choose a repetitive task, define the outcome and identify risks or approval points.'],
      ['Week 02', 'Prompting for work', 'Create reusable prompt patterns for research, summaries and structured drafts.'],
      ['Week 03', 'Documents and knowledge', 'Turn scattered information into organised notes, briefs and action lists.'],
      ['Week 04', 'Automation foundations', 'Understand triggers, actions, data hand-offs and simple integrations.'],
      ['Week 05', 'Test and improve', 'Add validation, human review and clear failure handling to a workflow.'],
      ['Week 06', 'Show the system', 'Document the workflow, demonstrate it and explain where human judgement stays.'],
    ], project: 'A documented workflow prototype that turns a sample enquiry into a reviewed follow-up task.'
  },
  {
    id: 'build', title: 'Build with AI: Websites & Apps · 8 weeks', subtitle: 'Move from problem statement to a usable web prototype.',
    weeks: [
      ['Week 01', 'Find the problem', 'Define a user, a need and a small product idea worth testing.'],
      ['Week 02', 'Structure the experience', 'Create a page map, wireframe and clear content hierarchy.'],
      ['Week 03', 'Design with AI', 'Explore visual directions, write design prompts and refine interface patterns.'],
      ['Week 04', 'Build the first version', 'Use AI-assisted development tools to create a responsive page.'],
      ['Week 05', 'Add interactions', 'Create forms, navigation, filters and meaningful interface states.'],
      ['Week 06', 'Work with data', 'Use sample data and understand what a real backend would need to provide.'],
      ['Week 07', 'Test and refine', 'Check usability, accessibility, responsive behaviour and edge cases.'],
      ['Week 08', 'Present the prototype', 'Polish, document and present the project with its limitations clearly stated.'],
    ], project: 'A responsive website or lightweight app prototype, documented for a beginner portfolio.'
  },
];

const tools = ['ChatGPT', 'Claude', 'Gemini', 'Canva', 'Figma', 'Lovable', 'Make', 'n8n', 'Notion'];

const steps = [
  { number: '01', title: 'Explore your path', highlight: 'path', text: 'Find your starting point, compare the learning paths and choose a useful first step. No prior AI experience is needed.', note: 'Browse without creating an account.', action: 'Explore programmes', href: '#programmes', icon: MousePointer2 },
  { number: '02', title: 'Send your enquiry', highlight: 'enquiry', text: 'Share a few details in the two-step form. The demo confirmation explains how a real team could follow up with you.', note: 'The demo form takes about a minute.', action: 'Open the form', href: '#contact', icon: MessageCircle },
  { number: '03', title: 'Get your batch plan', highlight: 'batch plan', text: 'Review the confirmed dates, curriculum, fees and programme format with the team before deciding.', note: 'No payment is taken on this concept page.', action: 'See batch dates', href: '#batches', icon: BadgeCheck },
  { number: '04', title: 'Start building', highlight: 'building', text: 'After enrolment, receive the confirmed onboarding steps, join the live sessions and begin your first practical project.', note: 'Learner login follows confirmed enrolment.', action: 'Reserve my seat', href: '#contact', icon: Rocket },
];

const projects = [
  { category: 'AI + PRODUCTIVITY', title: 'A research companion', description: 'Turn a topic into a structured brief, compare sources and keep a clear trail of what needs human verification.', icon: BrainCircuit, tint: 'graphite-a', tag: 'FOUNDATIONS' },
  { category: 'AUTOMATION', title: 'A workflow that saves steps', description: 'Connect a sample form, an AI step and a review queue to reduce repetitive admin work.', icon: Workflow, tint: 'graphite-b', tag: 'AI FOR WORK' },
  { category: 'WEB + APP BUILDING', title: 'A useful little web app', description: 'Shape a simple user problem into a responsive interface with forms and meaningful interactions.', icon: Code2, tint: 'graphite-c', tag: 'BUILD WITH AI' },
];

const demoTestimonials = [
  { quote: 'I finally understood how to turn a broad AI idea into a small project I could actually explain.', name: 'Aarav', role: 'College student · sample persona', initials: 'A' },
  { quote: 'The workflow-first approach made automation feel less intimidating and more connected to everyday tasks.', name: 'Meera', role: 'Recent graduate · sample persona', initials: 'M' },
  { quote: 'I liked the emphasis on checking outputs instead of treating every AI answer as automatically correct.', name: 'Kabir', role: 'Working professional · sample persona', initials: 'K' },
];

const faqs = [
  { question: 'Do I need coding experience?', answer: 'No coding background is needed to explore AI Foundations or the introductory tool workflows. The website and app programme is designed as a beginner-friendly path, with concepts introduced step by step.' },
  { question: 'Do I need my own laptop?', answer: 'A laptop is recommended for hands-on work with browser-based AI tools, design platforms and development environments. A phone alone may limit what you can build. Device and software requirements should be confirmed before enrolment.' },
  { question: 'Are the programmes online or offline?', answer: 'This concept currently presents a live-online format and an Hyderabad + online audience. Actual mode, venue, session timings and cohort availability are demo details and must be confirmed by the programme team.' },
  { question: 'Will I receive a certificate?', answer: 'Certificate availability, issuer, assessment criteria and eligibility have not been confirmed. Ask the programme team for written details before enrolling.' },
  { question: 'Is there job or placement support?', answer: 'No placement or job guarantee is represented here. The proposed learning experience focuses on practical skills and project documentation; any career support should be described only after it is confirmed.' },
  { question: 'What is the refund or cancellation policy?', answer: 'A refund, cancellation and rescheduling policy has not been supplied. Request the full written policy, including timelines and any deductions, before making a payment.' },
  { question: 'How do I get my learner login?', answer: 'You can enquire without an account. In a live programme, the team would share the learning-platform link and login instructions after confirming your enrolment.' },
];

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.16, margin: '0px 0px -15% 0px' });
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;
  return (
    <Component ref={ref} className={`reveal ${className}`} initial={reduceMotion ? false : { opacity: 0, y: 40 }} animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: reduceMotion ? 0 : delay }}>
      {children}
    </Component>
  );
}

function CountUp({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 26, stiffness: 75 });
  const rounded = useTransform(spring, (latest) => `${prefix}${Math.round(latest)}${suffix}`);
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(count, value, { duration: reduceMotion ? 0 : 1.4, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, count, value, reduceMotion]);
  return <motion.strong ref={ref} className="count-up">{rounded}</motion.strong>;
}

function Brand({ footer = false }) {
  return (
    <a href="#top" className={`brand ${footer ? 'brand--footer' : ''}`} aria-label="orbit home">
      <span className="brand-mark" aria-hidden="true"><Orbit size={21} strokeWidth={1.5} /></span>
      <span className="brand-copy"><strong>orbit</strong><small>AI LEARNING STUDIO</small></span>
    </a>
  );
}

function Header({ onOpenLead, onOpenSyllabus }) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const previous = useRef(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const hero = document.querySelector('#hero');
    const threshold = Math.max(360, (hero?.offsetHeight || 720) - 105);
    setScrolled(latest > threshold);
    if (latest < 80) setHidden(false);
    else if (latest - previous.current > 8) setHidden(true);
    else if (previous.current - latest > 6) setHidden(false);
    previous.current = latest;
  });
  const links = [['Programmes', '#programmes'], ['Curriculum', '#curriculum'], ['Outcomes', '#outcomes'], ['FAQ', '#faq']];
  return (
    <motion.header className={`site-header ${scrolled ? 'site-header--scrolled' : ''} ${hidden && !reduceMotion ? 'site-header--hidden' : ''}`} animate={{ y: hidden && !reduceMotion ? -110 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}>
      <div className="header-inner">
        <Brand />
        <nav className={`desktop-nav ${menuOpen ? 'desktop-nav--open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button className="mobile-syllabus-link" onClick={() => { setMenuOpen(false); onOpenSyllabus(); }}>Download syllabus</button>
        </nav>
        <button className="header-cta" onClick={() => onOpenLead()}>Enrol now <span><ArrowUpRight size={15} /></span></button>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </motion.header>
  );
}

function OrbitTools({ reduceMotion }) {
  const chipItems = ['ChatGPT', 'Claude', 'Canva', 'Figma', 'n8n'];
  const rotation = useMotionValue(0);
  const radiusX = 41;
  const radiusY = 27.5;
  const tilt = -24 * Math.PI / 180;
  useEffect(() => {
    if (reduceMotion) {
      rotation.set(0);
      return undefined;
    }

    const controls = animate(rotation, 360, { duration: 54, ease: 'linear', repeat: Infinity });
    return () => controls.stop();
  }, [reduceMotion, rotation]);

  const useOrbitPosition = (index, axis) => useTransform(rotation, (progress) => {
    const angle = (progress + index * 72) * Math.PI / 180;
    const x = radiusX * Math.cos(angle) * Math.cos(tilt) - radiusY * Math.sin(angle) * Math.sin(tilt);
    const y = radiusX * Math.cos(angle) * Math.sin(tilt) + radiusY * Math.sin(angle) * Math.cos(tilt);
    return `calc(var(--orbit-center-${axis}) + ${axis === 'x' ? x : y}%)`;
  });
  const useOrbitDepth = (index) => useTransform(rotation, (progress) => {
    const angle = (progress + index * 72) * Math.PI / 180;
    const depth = radiusX * Math.cos(angle) * Math.sin(tilt) + radiusY * Math.sin(angle) * Math.cos(tilt);
    return depth / Math.hypot(radiusX * Math.sin(tilt), radiusY * Math.cos(tilt));
  });

  const positions = [
    { x: useOrbitPosition(0, 'x'), y: useOrbitPosition(0, 'y'), depth: useOrbitDepth(0) },
    { x: useOrbitPosition(1, 'x'), y: useOrbitPosition(1, 'y'), depth: useOrbitDepth(1) },
    { x: useOrbitPosition(2, 'x'), y: useOrbitPosition(2, 'y'), depth: useOrbitDepth(2) },
    { x: useOrbitPosition(3, 'x'), y: useOrbitPosition(3, 'y'), depth: useOrbitDepth(3) },
    { x: useOrbitPosition(4, 'x'), y: useOrbitPosition(4, 'y'), depth: useOrbitDepth(4) },
  ];
  const scales = [
    useTransform(positions[0].depth, [-1, 1], [0.88, 1.04]),
    useTransform(positions[1].depth, [-1, 1], [0.88, 1.04]),
    useTransform(positions[2].depth, [-1, 1], [0.88, 1.04]),
    useTransform(positions[3].depth, [-1, 1], [0.88, 1.04]),
    useTransform(positions[4].depth, [-1, 1], [0.88, 1.04]),
  ];
  const opacities = [
    useTransform(positions[0].depth, [-1, 1], [0.62, 1]),
    useTransform(positions[1].depth, [-1, 1], [0.62, 1]),
    useTransform(positions[2].depth, [-1, 1], [0.62, 1]),
    useTransform(positions[3].depth, [-1, 1], [0.62, 1]),
    useTransform(positions[4].depth, [-1, 1], [0.62, 1]),
  ];
  const layers = [
    useTransform(positions[0].depth, (value) => value > 0 ? 5 : 2),
    useTransform(positions[1].depth, (value) => value > 0 ? 5 : 2),
    useTransform(positions[2].depth, (value) => value > 0 ? 5 : 2),
    useTransform(positions[3].depth, (value) => value > 0 ? 5 : 2),
    useTransform(positions[4].depth, (value) => value > 0 ? 5 : 2),
  ];
  return (
    <div className="orbit-tools" aria-label="Example tools explored">
      <svg className="orbit-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <ellipse />
      </svg>
      {chipItems.map((item, index) => (
        <motion.span
          key={item}
          className="orbit-chip-position"
          style={{
            left: positions[index].x,
            top: positions[index].y,
            x: '-50%',
            y: '-50%',
            scale: scales[index],
            opacity: opacities[index],
            zIndex: layers[index],
          }}
        >
          <span className="orbit-chip">{item}</span>
        </motion.span>
      ))}
    </div>
  );
}

function HeroVisual({ reduceMotion }) {
  const visualRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 18 });
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start end', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -34]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.65, 1], reduceMotion ? [1, 1, 1] : [0.94, 1.02, 1.06]);
  const orbX = useTransform(smoothX, (value) => reduceMotion ? 0 : value * 0.22);
  const orbY = useTransform(smoothY, (value) => reduceMotion ? 0 : value * 0.22);
  const wordX = useTransform(smoothX, (value) => reduceMotion ? 0 : value * -0.12);
  const wordY = useTransform(smoothY, (value) => reduceMotion ? 0 : value * -0.1);
  const wordScrollX = useTransform([wordX, scrollYProgress], ([pointer, progress]) => pointer + (reduceMotion ? 0 : progress * -34));
  const wordScrollY = useTransform([scrollY, wordY], ([scroll, pointer]) => scroll * 0.35 + pointer);
  const orbScrollY = useTransform([scrollY, orbY], ([scroll, pointer]) => scroll + pointer);
  const handleMove = (event) => {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 18);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 18);
  };
  const resetMove = () => { pointerX.set(0); pointerY.set(0); };
  return (
    <div ref={visualRef} className="hero-visual-wrap" onPointerMove={handleMove} onPointerLeave={resetMove}>
      <motion.div className="hero-ghost-word" initial={reduceMotion ? false : { opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.12, ease: EASE }} style={{ x: wordScrollX, y: wordScrollY }}>ORBIT</motion.div>
      <motion.div className="hero-visual" style={{ x: orbX, y: orbScrollY, scale: scrollScale }}>
        <SilkWaves reduceMotion={reduceMotion} scrollProgress={scrollYProgress} />
        <motion.div className="hero-visual__halo" initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.26, ease: EASE }} />
        <motion.div className="orb-float" initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.34, ease: EASE }}>
          <motion.div className="pearl-sphere" animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 1.2, 0] }} transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}>
            <span className="pearl-sphere__shine" /><span className="pearl-sphere__shadow" />
          </motion.div>
        </motion.div>
        <OrbitTools reduceMotion={reduceMotion} />
        <div className="hero-visual__caption"><span /> A small idea can travel far</div>
      </motion.div>
    </div>
  );
}

function Hero({ onOpenLead, onOpenSyllabus }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const panelOpacity = useTransform(scrollYProgress, [0, 0.86, 1], [1, 1, reduceMotion ? 1 : 0.35]);
  const featureItems = [
    ['01', 'Live mentors', 'Guidance through the build'],
    ['02', 'Real projects', 'Practice with a clear outcome'],
    ['03', 'No coding needed', 'Begin with accessible tools'],
    ['04', 'Certificate', 'Details confirmed by the provider'],
    ['05', 'Community', 'Learn alongside a cohort'],
  ];
  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <motion.div className="hero-panel" style={{ opacity: panelOpacity }}>
        <div className="hero-panel__topline">
          <span className="hero-overline"><span className="pulse-dot" /> LIVE ONLINE · BEGINNER-FRIENDLY · HYDERABAD + ONLINE</span>
          <span className="hero-edition">ORBIT / PRACTICAL AI STUDIO</span>
        </div>
        <div className="hero-copy">
          <motion.p className="eyebrow hero-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: EASE }}>PRACTICAL AI & DIGITAL SKILLS</motion.p>
          <h1>
            <span className="hero-line-mask"><motion.span className="hero-line" initial={reduceMotion ? false : { opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }}>Learn AI.</motion.span></span>
            <span className="hero-line-mask"><motion.span className="hero-line hero-line--accent" initial={reduceMotion ? false : { opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.73, ease: EASE }}>Build real things.</motion.span></span>
          </h1>
          <motion.p className="hero-description" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.92, ease: EASE }}>Hands-on AI programmes. No coding background needed.</motion.p>
          <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 1.06, ease: EASE }}>
            <button className="button button--primary" onClick={() => onOpenLead()}>Reserve my seat <span className="button-arrow"><ArrowUpRight size={16} /></span></button>
            <button className="button button--glass" onClick={onOpenSyllabus}><Download size={15} /> Download syllabus</button>
          </motion.div>
          <motion.div className="hero-batch-strip" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.2 }}><span className="batch-live-dot" /> Next batch starts <strong>07 Dec 2026</strong> <span className="demo-inline">(demo date)</span> · Seats filling fast <span className="demo-inline">(demo)</span></motion.div>
          <motion.div className="hero-learners" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.32 }}><span className="avatar-stack"><i>AI</i><i>+</i><i>YOU</i></span><span>Active learners <CountUp value={323} prefix="+" /> <em>(demo)</em></span></motion.div>
        </div>
        <motion.div className="hero-art-wrap" initial={reduceMotion ? false : { opacity: 0, scale: 0.84, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.05, ease: EASE }}><HeroVisual reduceMotion={reduceMotion} /></motion.div>
        <div className="hero-bottom-label"><span>01 / ORBIT</span><span>LEARN · EXPERIMENT · CREATE</span><span>SCROLL TO EXPLORE ↓</span></div>
      </motion.div>
      <motion.div className="hero-feature-strip section-wrap" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 1.0, ease: EASE }}>
        <div className="hero-feature-grid">
          {featureItems.map(([number, title, text], index) => <motion.div className="hero-feature" key={number} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 1.08 + index * 0.1, ease: EASE }}><span className="feature-dot" aria-hidden="true" /><div><strong>{title}</strong><small>{text}</small></div></motion.div>)}
        </div>
        <motion.div className="hero-media-card" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 1.32, ease: EASE }}>
          <div className="media-swirl" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="hero-media-copy"><small>A QUICK LOOK</small><strong>See how orbit works</strong><span>Explore the learning journey</span></div>
          <button type="button" className="media-play" aria-label="Explore how Orbit works" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}><Play size={15} fill="currentColor" /></button>
        </motion.div>
        <p className="hero-feature-note">Certificate availability, instructor details, dates and cohort information are demonstration content and must be confirmed before enrolment.</p>
      </motion.div>
      <div className="hero-note"><span className="note-star">✳</span> Your ideas are the starting point. AI is one of the tools. <span className="demo-inline">Programme details are demo.</span></div>
    </section>
  );
}

function AudienceSection() {
  return <section className="audience-section section-wrap" id="who-its-for">
    <Reveal className="section-heading-block"><span className="eyebrow">MADE FOR YOUR NEXT STEP</span><h2>Wherever you're starting, <em>there's a way in.</em></h2><p>Orbit is a concept for practical AI and digital-skills learning for students and young professionals in India.</p></Reveal>
    <div className="audience-grid">{audiences.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 0.12} className="audience-card glass-card"><span className="audience-icon"><Icon size={23} /></span><span className="card-index">0{index + 1} / WHO IT'S FOR</span><h3>{item.title}</h3><p>{item.text}</p><div className="audience-outcome"><Check size={15} />{item.outcome}</div></Reveal>; })}</div>
  </section>;
}

function OutcomesSection() {
  return <section className="outcomes-section section-wrap" id="outcomes">
    <Reveal className="section-title-row"><div><span className="eyebrow">SKILLS YOU CAN PUT TO WORK</span><h2>What you'll be able to <em>do with AI.</em></h2></div><p>Move beyond tool demos. Practice useful tasks and learn to review the work AI helps you produce.</p></Reveal>
    <div className="outcomes-grid">{outcomes.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 0.075} className="outcome-card glass-card"><span className="outcome-number">0{index + 1}</span><span className="outcome-icon"><Icon size={22} /></span><h3>{item.title}</h3><p>{item.text}</p></Reveal>; })}</div>
  </section>;
}

function PinnedPoint({ item, index, progress, total }) {
  const reduceMotion = useReducedMotion();
  const start = index / total;
  const end = (index + 1) / total;
  const inputRange = index === 0 ? [0, 0.08, end - 0.08, end] : [Math.max(0, start - 0.08), start, end - 0.08, end];
  const opacity = useTransform(progress, inputRange, index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(progress, inputRange, index === 0 ? [0, 0, 0, -20] : [24, 0, 0, -20]);
  const Icon = item.icon;
  return <motion.article className="pinned-point" style={reduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}><span className="pinned-point__icon"><Icon size={24} /></span><span className="eyebrow eyebrow--light">ORBIT LEARNING PRINCIPLE / 0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></motion.article>;
}

function PinnedSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const points = [
    { icon: BrainCircuit, title: 'Start with a real question.', text: 'Use AI to explore a question, not to replace your own thinking. Define the goal before opening another tool.' },
    { icon: Workflow, title: 'Make the process repeatable.', text: 'Turn one useful result into a workflow you can explain, test and improve—not a one-off prompt trick.' },
    { icon: ShieldCheck, title: 'Keep judgement in the loop.', text: 'Check important facts, handle sensitive information carefully and know when a human must decide.' },
    { icon: Rocket, title: 'Finish with something you can show.', text: 'Build a small project, document how it works and communicate what you learned along the way.' },
  ];
  return <section className="pinned-section" ref={ref} aria-label="How Orbit approaches practical AI learning"><div className="pinned-stage section-wrap"><div className="pinned-intro"><span className="eyebrow eyebrow--light">THE ORBIT APPROACH</span><h2>Don't collect tools.<br /><em>Build capability.</em></h2><p>A practical learning mindset, one useful step at a time.</p><span className="pinned-scroll-hint"><ArrowDown size={15} /> Keep scrolling to explore</span></div><div className="pinned-stack">{points.map((item, index) => <PinnedPoint key={item.title} item={item} index={index} progress={scrollYProgress} total={points.length} />)}<div className="pinned-pagination">{points.map((point, index) => <span key={point.title} className="pinned-dot" />)}</div></div></div></section>;
}

function ProgrammeCard({ programme, onEnquire }) {
  const reduceMotion = useReducedMotion();
  return <motion.article className={`programme-card glass-card ${programme.popular ? 'programme-card--featured' : ''}`} whileHover={reduceMotion ? undefined : { y: -7, rotateX: 1.5, rotateY: -1.5 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }} style={{ transformStyle: 'preserve-3d' }}>
    {programme.popular && <span className="programme-popular">POPULAR PATH · DEMO</span>}
    <div className="programme-top"><span className="programme-duration">{programme.duration}</span><span className="programme-level">{programme.level}</span></div>
    <h3>{programme.name}</h3><p>{programme.description}</p>
    <div className="programme-facts"><span><MonitorPlay size={15} /> {programme.format}</span><span><GraduationCap size={15} /> {programme.level}</span></div>
    <ul>{programme.bullets.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
    <div className="programme-price"><div><small>Demo fee</small><strong>{programme.price}</strong><span>Early-bird demo: {programme.early}</span></div><span className="demo-stamp">DEMO<br />PRICE</span></div>
    <button className="button button--primary programme-enquire" onClick={() => onEnquire(programme.name)}>Enquire <ArrowUpRight size={16} /></button>
  </motion.article>;
}

function ProgrammesSection({ onEnquire }) {
  return <section className="programmes-section section-wrap" id="programmes"><Reveal className="section-title-row"><div><span className="eyebrow">CHOOSE YOUR LEARNING PATH</span><h2>Three ways to <em>move forward.</em></h2></div><p>Choose a focused starting point. Durations, fee examples and delivery details below are mock values for this prototype.</p></Reveal><div className="programmes-grid">{programmes.map((programme, index) => <Reveal key={programme.id} delay={index * 0.1}><ProgrammeCard programme={programme} onEnquire={onEnquire} /></Reveal>)}</div><p className="fine-print">All course titles, fees, early-bird figures, formats and included items are demo content and require confirmation before publication.</p></section>;
}

function CurriculumSection() {
  const [active, setActive] = useState('foundations');
  const reduceMotion = useReducedMotion();
  return <section className="curriculum-section section-wrap" id="curriculum"><div className="curriculum-layout"><Reveal className="curriculum-intro"><span className="eyebrow">A CLEAR LEARNING ROADMAP</span><h2>Know what you'll <em>work on.</em></h2><p>Example week-by-week module outlines show the shape of a practical programme. Final lesson plans can be tailored to the confirmed cohort.</p><div className="curriculum-side-note"><Lightbulb size={19} /><span>Learn a concept. Try a tool. Build a small outcome. Review what worked.</span></div></Reveal><div className="curriculum-accordion">{curriculum.map((module) => { const open = active === module.id; return <div className={`curriculum-item ${open ? 'curriculum-item--open' : ''}`} key={module.id}><button className="curriculum-trigger" aria-expanded={open} onClick={() => setActive(open ? '' : module.id)}><span><small>MODULE ROADMAP</small><strong>{module.title}</strong><em>{module.subtitle}</em></span><span className="accordion-plus"><ChevronDown size={19} /></span></button><AnimatePresence initial={false}><motion.div className="curriculum-body" initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE }} style={{ overflow: 'hidden' }}>{open && <div className="curriculum-body-inner"><ol>{module.weeks.map(([week, title, text]) => <li key={week}><span>{week}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol><div className="final-project"><Sparkles size={17} /><div><small>FINAL PROJECT · DEMO OUTLINE</small><strong>{module.project}</strong></div></div></div>}</motion.div></AnimatePresence></div>; })}</div></div></section>;
}

function ToolsMarquee() {
  return <section className="tools-section" aria-label="Example tools"><div className="section-wrap tools-heading"><span className="eyebrow">TOOLS YOU MAY EXPLORE</span><p>Tool access and licensing depend on the provider and programme. Names shown are examples.</p></div><div className="marquee-mask"><div className="tools-marquee">{[0, 1].map((copy) => <div className="tools-track" key={copy} aria-hidden={copy === 1}><span className="tools-label">PRACTICAL TOOLKIT</span>{tools.map((tool) => <span className="tool-chip" key={`${copy}-${tool}`}>{tool}</span>)}</div>)}</div></div></section>;
}

function StepArtwork({ index }) {
  if (index === 0) return <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="step-art"><g fill="none" stroke="currentColor">{Array.from({ length: 15 }, (_, i) => <path key={i} d={`M -40 ${90 + i * 24} C 180 ${-40 + i * 22}, 300 ${250 + i * 13}, 480 ${180 + i * 18} S 740 ${80 + i * 19}, 960 ${220 + i * 23}`} strokeWidth={i % 4 === 0 ? 1.4 : 0.7} opacity={0.16 + (i % 5) * 0.055} />)}</g></svg>;
  if (index === 1) return <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="step-art"><g fill="none" stroke="currentColor">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -60 ${170 + i * 18} C 110 ${-80 + i * 35}, 300 ${460 - i * 22}, 485 ${200 + i * 9} S 730 ${-20 + i * 29}, 970 ${240 + i * 16}`} strokeWidth={i % 3 === 0 ? 2 : 0.9} opacity={0.2 + i * 0.045} />)}</g></svg>;
  if (index === 2) return <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="step-art"><g fill="none" stroke="currentColor">{Array.from({ length: 13 }, (_, i) => <ellipse key={i} cx="610" cy="280" rx={110 + i * 31} ry={34 + i * 16} transform={`rotate(-18 610 280)`} strokeWidth={i % 4 === 0 ? 1.5 : 0.8} opacity={0.18 + (i % 4) * 0.06} />)}</g></svg>;
  return <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="step-art"><g fill="none" stroke="currentColor"><circle cx="620" cy="190" r="105" strokeWidth="1.5" opacity=".44"/><circle cx="620" cy="190" r="145" strokeWidth="1" opacity=".3"/><circle cx="620" cy="190" r="185" strokeWidth=".8" opacity=".2"/>{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -30 ${335 + i * 19} C 220 ${200 + i * 14}, 390 ${410 + i * 13}, 620 ${330 + i * 16} S 830 ${270 + i * 15}, 960 ${345 + i * 21}`} strokeWidth=".9" opacity=".24" />)}</g></svg>;
}

function ProcessSection({ onOpenLead }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inSection = useInView(sectionRef, { amount: 0.08 });
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const jumpToStep = (index) => document.getElementById(`orbit-step-${index + 1}`)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  const handleAction = (step) => {
    if (step.number === '02' || step.number === '04') onOpenLead();
    else document.querySelector(step.href)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <section ref={sectionRef} className="process-section" id="how-it-works">
      <div className="process-heading section-wrap"><Reveal><span className="eyebrow">SIMPLE FROM THE FIRST STEP</span><h2>From curious to creating, <em>in four steps.</em></h2><p>A clear path from exploring a programme to starting your first practical build.</p></Reveal></div>
      <div className="chevron-progress" aria-label="How it works step navigation" style={{ opacity: inSection ? 1 : 0, pointerEvents: inSection ? 'auto' : 'none' }}>
        {steps.map((step, index) => <button key={step.number} type="button" className={active === index ? 'chevron-progress__dot is-active' : 'chevron-progress__dot'} aria-label={`Go to step ${step.number}: ${step.title}`} aria-current={active === index ? 'step' : undefined} onClick={() => jumpToStep(index)}><span>{step.number}</span></button>)}
      </div>
      <div className="chevron-stack">
        <motion.span className="chevron-connector" style={{ scaleY: reduceMotion ? 1 : lineScale }} />
        {steps.map((step, index) => {
          const Icon = step.icon;
          const titleParts = step.title.split(step.highlight);
          return (
            <motion.article
              id={`orbit-step-${index + 1}`}
              key={step.number}
              className={`chevron-panel chevron-panel--${index + 1} ${index % 2 ? 'chevron-panel--reverse' : ''}`}
              onViewportEnter={() => setActive(index)}
              viewport={{ amount: 0.6 }}
              initial={reduceMotion ? false : { opacity: 0, y: 30, clipPath: 'polygon(0 0, 50% 0, 100% 0, 100% 100%, 0 100%)' }}
              whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, clipPath: 'polygon(0 var(--cut), 50% 0, 100% var(--cut), 100% 100%, 0 100%)' }}
              transition={{ duration: reduceMotion ? 0 : 0.95, ease: EASE }}
            >
              <motion.div className="step-art-wrap" initial={reduceMotion ? false : { opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0 : 1, ease: EASE }}><StepArtwork index={index} /></motion.div>
              <motion.span className={`chevron-ghost-number ${active === index ? 'chevron-ghost-number--active' : ''}`} aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.12, ease: EASE }}>{step.number}</motion.span>
              <motion.span className="chevron-icon-badge" initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.08, ease: EASE }}><Icon size={20} /></motion.span>
              <div className="chevron-content section-wrap">
                <motion.span className="chevron-kicker" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.16, ease: EASE }}>STEP {step.number} / 04</motion.span>
                <motion.h3 initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.85, delay: 0.25, ease: EASE }}>{titleParts[0]}<em>{step.highlight}</em>{titleParts[1]}</motion.h3>
                <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.36, ease: EASE }}>{step.text}</motion.p>
                <motion.small initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.45, ease: EASE }}><Check size={14} /> {step.note}</motion.small>
                <motion.button className="chevron-action" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.55, ease: EASE }} onClick={() => handleAction(step)}>{step.action}<ArrowUpRight size={16} /></motion.button>
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="login-note section-wrap"><span className="login-note-icon"><ShieldCheck size={18} /></span><p><strong>How learner login works</strong> — You don't need an account to enquire. After confirmed enrolment in a live programme, the team would share the learning-platform link, account setup and login instructions. This demo page does not create learner accounts.</p></div>
    </section>
  );
}

function ProjectsSection() {
  return <section className="projects-section section-wrap" id="projects"><Reveal className="section-title-row"><div><span className="eyebrow">LEARNING YOU CAN SHOW</span><h2>Make something <em>worth sharing.</em></h2></div><p>These sample project briefs show the kind of practical work learners could create after guided practice.</p></Reveal><span className="sample-project-label">SAMPLE PROJECTS · DEMO CONCEPTS</span><div className="projects-grid">{projects.map((project, index) => { const Icon = project.icon; return <Reveal key={project.title} delay={index * 0.11} className={`project-card project-${project.tint}`}><div className="project-card__visual"><div className="project-orbit project-orbit--outer" /><div className="project-orbit project-orbit--inner" /><div className="project-icon"><Icon size={35} strokeWidth={1.4} /></div><span className="project-float project-float--one">{index === 0 ? 'SOURCE CHECK' : index === 1 ? 'TRIGGER' : 'RESPONSIVE UI'}</span><span className="project-float project-float--two">{index === 0 ? 'SUMMARY' : index === 1 ? 'AI STEP' : 'PROTOTYPE'}</span></div><div className="project-card__body"><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><small>{project.tag} · SAMPLE BRIEF</small></div></Reveal>; })}</div><p className="fine-print">Example concepts only—not completed learner work, verified outcomes or guaranteed deliverables.</p></section>;
}

function InstructorSection() {
  return <section className="instructor-section section-wrap" id="instructor"><Reveal className="instructor-card glass-card"><div className="instructor-profile"><div className="instructor-photo"><UserRound size={64} strokeWidth={1.1} /><span>PHOTO<br />PLACEHOLDER</span></div><div><span className="eyebrow">MEET YOUR GUIDE</span><h3>Founder / Programme Lead</h3><p>Profile and introduction to be added by the Orbit team.</p><span className="demo-stamp">PLACEHOLDER</span></div></div><div className="instructor-details"><h2>Built around <em>learning by doing.</em></h2><p>This profile is intentionally a placeholder. Add the founder's real background, teaching experience and relevant work before publishing.</p><div className="credibility-list"><span><Check size={15} />Practical, project-led learning focus <em>(planned)</em></span><span><Check size={15} />Tool demonstrations and guided practice <em>(planned)</em></span><span><Check size={15} />Clear feedback and project walkthroughs <em>(planned)</em></span></div></div></Reveal></section>;
}

function TestimonialsSection() {
  return <section className="testimonials-section section-wrap"><Reveal className="section-title-row"><div><span className="eyebrow">LEARNER VOICES</span><h2>Imagine what <em>you could build.</em></h2></div><p>Illustrative sample quotes are included only to demonstrate testimonial layout. They are not real learner reviews.</p></Reveal><span className="sample-project-label">DEMO TESTIMONIALS · NOT REAL REVIEWS</span><div className="testimonials-grid">{demoTestimonials.map((item, index) => <Reveal key={item.name} delay={index * 0.1} className="testimonial-card glass-card"><div className="testimonial-stars" aria-label="Illustrative five-star visual only">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div><blockquote>“{item.quote}”</blockquote><div className="testimonial-person"><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.role}</small></div></div><em className="demo-quote-stamp">DEMO QUOTE</em></Reveal>)}</div></section>;
}

function PricingSection({ onEnquire }) {
  return <section className="pricing-section section-wrap" id="batches"><div className="pricing-header"><Reveal><span className="eyebrow">BATCHES & FEES</span><h2>Plan your <em>next step.</em></h2><p>Upcoming dates, early-bird figures and availability below are fictional placeholders for this concept.</p></Reveal><div className="batch-highlight glass-card"><span className="batch-highlight__dot" /><div><small>NEXT BATCH · DEMO DATE</small><strong>07 December 2026</strong><span>Illustrative schedule · Hyderabad + online</span></div></div></div><div className="pricing-grid">{programmes.map((p, index) => <Reveal key={p.id} delay={index * 0.09} className="pricing-card glass-card"><span className="pricing-card__name">{p.name}</span><strong className="pricing-amount">{p.early}</strong><span className="pricing-was">Demo standard fee: {p.price}</span><div className="pricing-meta"><span>{p.duration}</span><span>{p.format}</span></div><button onClick={() => onEnquire(p.name)} className="button button--glass pricing-enquire">Enquire about this batch <ArrowUpRight size={15} /></button></Reveal>)}</div><div className="capacity-note glass-card"><div><strong>Seats filling fast <em>(demo indicator)</em></strong><p>Sample cohort capacity display. Actual availability must be confirmed by the programme team.</p></div><div className="capacity-meter"><div className="capacity-meter__track"><span /></div><small><CountUp value={68} suffix="%" /> illustrative interest</small></div></div><p className="pricing-footnote">Student discounts and EMI options are not confirmed. Ask the provider whether any verified concession or payment plan is available before enrolling. All prices and dates are mock values.</p></section>;
}

function FAQSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  return <section className="faq-section section-wrap" id="faq"><Reveal className="faq-heading"><span className="eyebrow">GOOD QUESTIONS, CLEAR ANSWERS</span><h2>Before you <em>begin.</em></h2><p>Important details to consider before choosing a programme.</p><span className="demo-stamp">PROGRAMME POLICIES TO BE CONFIRMED</span></Reveal><div className="faq-list">{faqs.map((item, index) => { const open = active === index; return <div className={`faq-item ${open ? 'faq-item--open' : ''}`} key={item.question}><button type="button" className="faq-question" onClick={() => setActive(open ? -1 : index)} aria-expanded={open}><span><small>0{index + 1}</small>{item.question}</span><span className="faq-chevron"><ChevronDown size={18} /></span></button><AnimatePresence initial={false}><motion.div className="faq-answer" initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }} style={{ overflow: 'hidden' }}>{open && <p>{item.answer}</p>}</motion.div></AnimatePresence></div>; })}</div></section>;
}

function LeadModal({ modal, onClose, onLeadComplete, onSyllabusComplete }) {
  const reduceMotion = useReducedMotion();
  const isSyllabus = modal?.type === 'syllabus';
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', role: 'College student',
    programme: modal?.programme || 'Not sure yet', batch: DEMO_BATCHES[0], goal: '',
  });
  const [syllabus, setSyllabus] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    const prior = document.activeElement;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape' && !loading) onClose();
    };
    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prior?.focus?.();
    };
  }, [onClose, loading]);

  function validStepOne(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(form.phone)) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep(2);
  }

  function finishLead(event) {
    event.preventDefault();
    setLoading(true);
    const record = { ...form, submittedAt: new Date().toISOString(), source: 'Orbit demo landing page' };
    window.setTimeout(() => {
      console.log('[orbit demo lead submission]', record);
      onLeadComplete(record);
      setLoading(false);
      setComplete(true);
    }, 650);
  }

  function finishSyllabus(event) {
    event.preventDefault();
    const validName = Boolean(syllabus.name.trim());
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(syllabus.email);
    if (!validName || !validEmail) return;
    setLoading(true);
    window.setTimeout(() => {
      const record = { ...syllabus, source: 'Orbit demo syllabus capture', submittedAt: new Date().toISOString() };
      console.log('[orbit demo syllabus capture]', record);
      onSyllabusComplete(record);
      setLoading(false);
      setComplete(true);
    }, 500);
  }

  const downloadLink = (
    <a className="button button--primary modal-download" href="/orbit-demo-syllabus.html" download>
      <Download size={16} /> Download syllabus
    </a>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !loading) onClose();
        }}
      >
        <motion.div
          className="lead-modal glass-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          tabIndex={-1}
          ref={dialogRef}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close form" disabled={loading}>
            <X size={19} />
          </button>

          {!complete && (
            <>
              <div className="modal-brand">
                <span className="brand-mark" aria-hidden="true"><Orbit size={21} strokeWidth={1.5} /></span>
                <span><strong>orbit</strong><small>AI LEARNING STUDIO</small></span>
              </div>
              <span className="eyebrow">
                {isSyllabus ? 'A CLEARER LOOK AT THE PROGRAMMES' : 'YOUR NEXT STEP STARTS HERE'}
              </span>
              <h2 id="lead-modal-title">
                {isSyllabus ? 'Get the sample syllabus.' : "Let's find your orbit."}
              </h2>
              <p className="modal-intro">
                {isSyllabus
                  ? 'Share your name and email to unlock the illustrative syllabus.'
                  : 'A couple of details will help us understand what you want to learn.'}
              </p>

              {!isSyllabus && (
                <div className="modal-progress">
                  <span style={{ width: step === 1 ? '50%' : '100%' }} />
                  <small>STEP {step} OF 2</small>
                </div>
              )}

              {isSyllabus ? (
                <form onSubmit={finishSyllabus} className="modal-form">
                  <label>
                    Full name
                    <input
                      autoFocus
                      required
                      value={syllabus.name}
                      onChange={(event) => setSyllabus({ ...syllabus, name: event.target.value })}
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      required
                      type="email"
                      value={syllabus.email}
                      onChange={(event) => setSyllabus({ ...syllabus, email: event.target.value })}
                      placeholder="you@example.com"
                    />
                  </label>
                  <button className="button button--primary modal-submit" type="submit" disabled={loading}>
                    {loading ? <><LoaderCircle className="spin" size={17} /> Preparing...</> : <>Continue to syllabus <ArrowRight size={16} /></>}
                  </button>
                </form>
              ) : step === 1 ? (
                <form onSubmit={validStepOne} className="modal-form">
                  <label>
                    Full name
                    <input autoFocus required value={form.name} onChange={(event) => setField('name', event.target.value)} placeholder="Your full name" />
                    {errors.name && <small className="field-error">{errors.name}</small>}
                  </label>
                  <label>
                    WhatsApp number
                    <div className="phone-input">
                      <span>+91</span>
                      <input
                        required
                        inputMode="numeric"
                        type="tel"
                        maxLength={10}
                        value={form.phone}
                        onChange={(event) => setField('phone', event.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && <small className="field-error">{errors.phone}</small>}
                  </label>
                  <label>
                    Email address
                    <input required type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} placeholder="you@example.com" />
                    {errors.email && <small className="field-error">{errors.email}</small>}
                  </label>
                  <button className="button button--primary modal-submit" type="submit">Continue <ArrowRight size={16} /></button>
                </form>
              ) : (
                <form onSubmit={finishLead} className="modal-form">
                  <label>
                    I am a…
                    <select value={form.role} onChange={(event) => setField('role', event.target.value)}>
                      <option>College student</option>
                      <option>Fresh graduate</option>
                      <option>Working professional</option>
                    </select>
                  </label>
                  <label>
                    Programme of interest
                    <select value={form.programme} onChange={(event) => setField('programme', event.target.value)}>
                      <option>Not sure yet</option>
                      {programmes.map((programme) => <option key={programme.id}>{programme.name}</option>)}
                    </select>
                  </label>
                  <label>
                    Preferred batch
                    <select value={form.batch} onChange={(event) => setField('batch', event.target.value)}>
                      {DEMO_BATCHES.map((batch) => <option key={batch}>{batch}</option>)}
                    </select>
                  </label>
                  <label>
                    What do you want to learn? <span className="optional">OPTIONAL</span>
                    <textarea rows="3" value={form.goal} onChange={(event) => setField('goal', event.target.value)} placeholder="Tell us what you hope to build or improve..." />
                  </label>
                  <div className="modal-form-actions">
                    <button type="button" className="button button--glass" onClick={() => setStep(1)} disabled={loading}>Back</button>
                    <button className="button button--primary" type="submit" disabled={loading}>
                      {loading ? <><LoaderCircle className="spin" size={17} /> Submitting...</> : <>Submit interest <ArrowRight size={16} /></>}
                    </button>
                  </div>
                </form>
              )}
              <p className="modal-privacy"><ShieldCheck size={14} /> Demo form only. Details stay in local React state and the browser console; no message, email or CRM record is sent.</p>
            </>
          )}

          {complete && (
            <div className="modal-thanks">
              <span className="thanks-icon"><Check size={28} /></span>
              <span className="eyebrow">{isSyllabus ? 'SYLLABUS READY' : 'INTEREST RECORDED · DEMO'}</span>
              <h2 id="lead-modal-title">{isSyllabus ? `Thanks, ${syllabus.name.split(' ')[0]}.` : "We'll WhatsApp you within 24 hours."}</h2>
              <p>
                {isSyllabus
                  ? 'Your sample syllabus is ready to download. This capture is local and does not send an email.'
                  : 'This is the requested demo confirmation. No WhatsApp message will be sent until a real CRM and WhatsApp integration is connected.'}
              </p>
              {isSyllabus ? downloadLink : (
                <>
                  <a className="button button--primary modal-download" href="https://wa.me/?text=Hi%20Orbit%2C%20I%20submitted%20a%20demo%20enquiry.%20Please%20share%20the%20WhatsApp%20community%20invite." target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> Join our WhatsApp community
                  </a>
                  <a className="button button--glass modal-download" href="/orbit-demo-syllabus.html" download>
                    <Download size={16} /> Download syllabus
                  </a>
                </>
              )}
              <small className="modal-demo-note">Demo-only links and confirmation. Replace with the official WhatsApp group invite and live integrations before launch.</small>
              <button className="modal-done" onClick={onClose}>Back to orbit</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FinalCTA({ onOpenLead, onOpenSyllabus }) {
  const [showFlow, setShowFlow] = useState(false);
  return <section className="final-cta-section" id="contact"><div className="final-cta-glow final-cta-glow--one" /><div className="final-cta-glow final-cta-glow--two" /><div className="section-wrap final-cta-layout"><Reveal className="final-cta-copy"><span className="eyebrow eyebrow--light">YOUR NEXT STEP STARTS HERE</span><h2>Curiosity looks<br /><em>good on you.</em></h2><p>Tell us what you're interested in and review the confirmed programme details before making a decision.</p><div className="final-assurance"><span><Check size={15} /> No commitment to enquire</span><span><Check size={15} /> Clear next steps</span><span><Check size={15} /> Beginner-friendly starting options</span></div><button className="button button--light" onClick={() => onOpenSyllabus()}><Download size={15} /> Download syllabus</button></Reveal><Reveal className="final-form-card glass-card" delay={0.12}><span className="eyebrow">START A CONVERSATION</span><h3>Find the right programme for you.</h3><p>Submit a two-step enquiry with your contact details and preferred batch.</p><div className="final-form-points"><span><UserRound size={16} /> Your details</span><ArrowRight size={15} /><span><GraduationCap size={16} /> Your learning goals</span></div><button className="button button--primary final-reserve" onClick={() => onOpenLead()}>Reserve my seat <span className="button-arrow"><ArrowUpRight size={16} /></span></button><details className="lead-flow"><summary>How the lead flow works</summary><p>Form → Google Sheet / CRM → WhatsApp and email confirmation → follow-up call → payment link → onboarding. This is a proposed workflow only; the integrations are not connected in this demo.</p></details></Reveal></div></section>;
}

function Footer() {
  return <footer className="site-footer" id="privacy"><div className="footer-main section-wrap"><div className="footer-brand-block"><Brand footer /><p>Practical AI and digital-skills learning<br />for students and young professionals.</p><span className="footer-demo-pill">CONCEPT BRAND · DEMO CONTENT</span></div><div className="footer-links"><div><span>EXPLORE</span><a href="#programmes">Programmes</a><a href="#curriculum">Curriculum</a><a href="#outcomes">Outcomes</a><a href="#how-it-works">How it works</a></div><div><span>GET STARTED</span><a href="#contact">Enquire / reserve a seat</a><a href="#faq">FAQs</a><a href="/orbit-demo-syllabus.html" download>Download syllabus</a><a href="#privacy-note">Privacy</a></div><div><span>CONNECT</span><a href="https://wa.me/?text=Hi%20Orbit%2C%20I%27d%20like%20to%20know%20more." target="_blank" rel="noreferrer">WhatsApp us</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <em>(placeholder)</em></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <em>(placeholder)</em></a></div></div></div><div className="footer-bottom section-wrap"><span>© 2026 ORBIT · AI LEARNING STUDIO · CONCEPT PROTOTYPE</span><span>Demo data only · Privacy and contact details to be finalised</span></div><p className="backend-note section-wrap" id="privacy-note"><strong>Privacy for this prototype:</strong> form entries remain in local page state and are logged in the browser console only; they are not sent to a server. A real launch needs a published privacy notice, consent and retention rules, secure lead storage, Google Sheets / CRM integration, WhatsApp and email automation, payment processing and learner onboarding. Prices, dates, learner counts, seat indicators, instructor information and testimonials are mock.</p></footer>;
}

// DEMO DATA / INTEGRATION NOTE:
// Mock: batch dates, pricing, discounts, learner count, seat-interest percentage,
// instructor bio/photo, testimonials, sample projects and all form submissions.
// A real launch needs secure form storage, Google Sheets/CRM sync, email + WhatsApp
// automation, payment processing, official community links and learner onboarding.
export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [modal, setModal] = useState(null);
  const [leads, setLeads] = useState([]);
  const [syllabusCaptures, setSyllabusCaptures] = useState([]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -260]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.85, anchors: true, syncTouch: false });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, [reduceMotion]);

  const openLead = (programme = 'Not sure yet') => setModal({ type: 'lead', programme });
  const openSyllabus = () => setModal({ type: 'syllabus' });
  const closeModal = () => setModal(null);

  return <div className="app-shell" id="top">
    <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
    <motion.div className="ambient-blob" style={{ y: blobY }} />
    <Header onOpenLead={openLead} onOpenSyllabus={openSyllabus} />
    <main>
      <Hero onOpenLead={openLead} onOpenSyllabus={openSyllabus} />
      <ProcessSection onOpenLead={openLead} />
      <OutcomesSection />
      <AudienceSection />
      <PinnedSection />
      <ProgrammesSection onEnquire={openLead} />
      <CurriculumSection />
      <ToolsMarquee />
      <ProjectsSection />
      <InstructorSection />
      <TestimonialsSection />
      <PricingSection onEnquire={openLead} />
      <FAQSection />
      <FinalCTA onOpenLead={openLead} onOpenSyllabus={openSyllabus} />
    </main>
    <Footer />
    <div className="mobile-bottom-bar"><button onClick={() => openLead()}>Reserve my seat <ArrowUpRight size={15} /></button><a href="https://wa.me/?text=Hi%20Orbit%2C%20I%27d%20like%20to%20know%20about%20the%20AI%20programmes." target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp us</a></div>
    <AnimatePresence>{modal && <LeadModal key={`${modal.type}-${modal.programme || ''}`} modal={modal} onClose={closeModal} onLeadComplete={(record) => setLeads((current) => [...current, record])} onSyllabusComplete={(record) => setSyllabusCaptures((current) => [...current, record])} />}</AnimatePresence>
    <span className="sr-only" aria-live="polite">{leads.length} demo enquiries and {syllabusCaptures.length} demo syllabus captures stored in local page state.</span>
  </div>;
}
