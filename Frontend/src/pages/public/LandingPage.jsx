import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  ArrowRight,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Flame,
} from 'lucide-react';

const CREAM = '#F5E9D7';
const BG = '#0B0B0B';
const PANEL = '#111111';
const BORDER = 'rgba(255,255,255,0.06)';
const BORDER_STRONG = 'rgba(255,255,255,0.08)';
const MUTED = '#9A9A9A';

const easeOut = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11,11,11,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-bold text-xl tracking-tight" style={{ color: '#F3F3F3' }}>
            Urban<span style={{ color: CREAM }}>Eye</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/map"
            className="hidden sm:inline text-sm text-neutral-300 hover:text-white transition-colors px-3 py-2"
          >
            Explore Map
          </Link>
          <Link
            to="/login"
            className="text-sm text-neutral-200 hover:text-white px-4 py-2 rounded-md transition-colors hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium px-4 py-2 rounded-md transition-all hover:opacity-90"
            style={{ background: CREAM, color: '#0B0B0B' }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* Subtle radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a1a1a 0%, #0B0B0B 70%)' }}
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wide mb-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER_STRONG}`, color: '#D4D4D4' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Live Incident Tracking
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.05] text-white"
          style={{ letterSpacing: '-0.03em' }}
        >
          <span className="font-bold">Urban Intelligence.</span>
          <br />
          <span className="font-bold" style={{ color: CREAM }}>
            Realtime Safety.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: MUTED }}
        >
          Map, report and track civic incidents across your city. Built for citizens. Powered by data.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/map"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all hover:opacity-90"
            style={{ background: CREAM, color: '#0B0B0B' }}
          >
            Explore the Map
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all hover:bg-white/5 text-white"
            style={{ border: `1px solid ${BORDER_STRONG}` }}
          >
            Report Incident
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { label: 'Active Incidents', value: '1,284' },
            { label: 'Cities Covered', value: '38' },
            { label: 'Reports Resolved', value: '11,640' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}
            >
              <span className="text-white font-medium">{s.value}</span>
              <span style={{ color: MUTED }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- SOCIAL PROOF ---------------- */
function SocialProof() {
  const stats = [
    '12,400+ Incidents Reported',
    '94% Resolution Rate',
    '38 Cities Active',
  ];
  return (
    <section
      style={{
        background: PANEL,
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: MUTED }}>
          Trusted by citizens across India
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {stats.map((s, i) => (
            <div key={s} className="flex items-center gap-10">
              <span className="text-sm text-neutral-200 font-light">{s}</span>
              {i < stats.length - 1 && (
                <span className="hidden sm:inline w-px h-5" style={{ background: BORDER_STRONG }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LIVE FEED PREVIEW ---------------- */
function LiveFeed() {
  const cards = [
    {
      category: 'Pothole',
      location: 'MG Road, Agra',
      severity: 'High',
      severityColor: '#ef4444',
      status: 'Pending',
      time: '2 min ago',
    },
    {
      category: 'Road Blockage',
      location: 'Civil Lines, Delhi',
      severity: 'Critical',
      severityColor: '#7f1d1d',
      status: 'Verified',
      time: '7 min ago',
    },
    {
      category: 'Waterlogging',
      location: 'Taj Nagri, Agra',
      severity: 'Medium',
      severityColor: '#f97316',
      status: 'Resolved',
      time: '14 min ago',
    },
  ];

  return (
    <section className="py-24 lg:py-32" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-4" style={{ color: MUTED }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Live
            </div>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white" style={{ letterSpacing: '-0.02em' }}>
              What's happening <span style={{ color: CREAM, fontStyle: 'italic' }}>right now</span>
            </h2>
            <p className="mt-3 text-base" style={{ color: MUTED }}>
              Every incident. Every street. Live.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.location}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="p-6 rounded-xl transition-all hover:-translate-y-1"
              style={{ background: PANEL, border: `1px solid ${BORDER_STRONG}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium uppercase tracking-wider"
                  style={{ background: 'rgba(245,233,215,0.06)', color: CREAM, border: `1px solid rgba(245,233,215,0.15)` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.severityColor }} />
                  {c.severity}
                </span>
                <span className="text-[11px] uppercase tracking-wider" style={{ color: MUTED }}>
                  {c.status}
                </span>
              </div>
              <h3 className="text-xl text-white font-light mb-2">{c.category}</h3>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: '#B5B5B5' }}>
                <MapPin className="w-3.5 h-3.5" />
                {c.location}
              </div>
              <div className="mt-6 pt-4 flex items-center gap-1.5 text-xs" style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}>
                <Clock className="w-3 h-3" />
                {c.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAP PREVIEW ---------------- */
function MapPreview() {
  const dots = [
    { top: '22%', left: '28%', color: '#ef4444' },
    { top: '58%', left: '62%', color: '#f97316' },
    { top: '70%', left: '30%', color: '#22c55e' },
    { top: '38%', left: '74%', color: '#7f1d1d' },
  ];
  return (
    <section className="py-24 lg:py-32" style={{ background: PANEL }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: CREAM }}>
            Realtime Map
          </p>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white" style={{ letterSpacing: '-0.02em' }}>
            See every incident. <span style={{ fontStyle: 'italic', color: CREAM }}>Everywhere.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed max-w-md" style={{ color: MUTED }}>
            One map. Every reported incident across your city, updated the moment it happens. No refresh required.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: MapPin, t: 'Nearby incidents', d: 'Filter what matters within your radius.' },
              { icon: Flame, t: 'Severity heatmap', d: 'See danger zones at a glance.' },
              { icon: Activity, t: 'Live updates', d: 'New reports stream in instantly.' },
            ].map((b) => (
              <li key={b.t} className="flex items-start gap-3">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-md shrink-0"
                  style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER_STRONG}` }}
                >
                  <b.icon className="w-4 h-4" style={{ color: CREAM }} />
                </span>
                <div>
                  <p className="text-white text-sm font-medium">{b.t}</p>
                  <p className="text-sm" style={{ color: MUTED }}>{b.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative aspect-[5/4] rounded-2xl overflow-hidden"
          style={{ background: '#0B0B0B', border: `1px solid ${BORDER_STRONG}` }}
        >
          {/* grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* fake roads */}
          <div className="absolute" style={{ top: '40%', left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.08)' }} />
          <div className="absolute" style={{ top: 0, bottom: 0, left: '55%', width: 2, background: 'rgba(255,255,255,0.08)' }} />
          <div
            className="absolute"
            style={{
              top: '20%',
              left: '10%',
              right: '20%',
              height: 1,
              transform: 'rotate(18deg)',
              background: 'rgba(255,255,255,0.06)',
            }}
          />
          {/* radial focus */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(11,11,11,0.7) 100%)' }}
          />
          {/* markers */}
          {dots.map((d, i) => (
            <div key={i} className="absolute" style={{ top: d.top, left: d.left, transform: 'translate(-50%,-50%)' }}>
              <span className="relative flex h-4 w-4">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping"
                  style={{ background: d.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-4 w-4"
                  style={{ background: d.color, border: '2px solid #0B0B0B' }}
                />
              </span>
            </div>
          ))}
          {/* legend */}
          <div
            className="absolute bottom-4 left-4 right-4 sm:right-auto px-3 py-2.5 rounded-md flex items-center gap-4 text-[11px]"
            style={{ background: 'rgba(17,17,17,0.85)', backdropFilter: 'blur(8px)', border: `1px solid ${BORDER_STRONG}` }}
          >
            {[
              { c: '#22c55e', l: 'Low' },
              { c: '#f97316', l: 'Medium' },
              { c: '#ef4444', l: 'High' },
              { c: '#7f1d1d', l: 'Critical' },
            ].map((s) => (
              <span key={s.l} className="flex items-center gap-1.5" style={{ color: '#D4D4D4' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                {s.l}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- ANALYTICS ---------------- */
function AnalyticsPreview() {
  const stats = [
    { label: 'Total Reports', value: '12,486', icon: Activity },
    { label: 'Resolved Today', value: '342', icon: CheckCircle2 },
    { label: 'Active Incidents', value: '1,284', icon: AlertTriangle },
    { label: 'Dangerous Zones', value: '27', icon: Flame },
  ];
  const bars = [
    { label: 'Pothole', val: 88 },
    { label: 'Waterlogging', val: 64 },
    { label: 'Road Blockage', val: 52 },
    { label: 'Accident', val: 41 },
    { label: 'Signal Failure', val: 28 },
    { label: 'Other', val: 18 },
  ];

  return (
    <section className="py-24 lg:py-32" style={{ background: BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: MUTED }}>
            Analytics
          </p>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white" style={{ letterSpacing: '-0.02em' }}>
            Data that <span style={{ color: CREAM, fontStyle: 'italic' }}>drives action</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className="p-6 rounded-xl"
              style={{ background: PANEL, border: `1px solid ${BORDER_STRONG}` }}
            >
              <s.icon className="w-4 h-4 mb-5" style={{ color: MUTED }} />
              <div className="text-3xl sm:text-4xl font-light" style={{ color: CREAM, letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <p className="mt-2 text-xs uppercase tracking-wider" style={{ color: MUTED }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="p-8 rounded-xl"
          style={{ background: PANEL, border: `1px solid ${BORDER_STRONG}` }}
        >
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-white font-medium">Category distribution</p>
            <p className="text-xs" style={{ color: MUTED }}>Last 30 days</p>
          </div>
          <div className="space-y-5">
            {bars.map((b, i) => (
              <div key={b.label} className="grid grid-cols-[140px_1fr_50px] gap-4 items-center">
                <span className="text-sm" style={{ color: '#C8C8C8' }}>{b.label}</span>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
                    className="h-full rounded-full"
                    style={{ background: CREAM }}
                  />
                </div>
                <span className="text-xs text-right" style={{ color: MUTED }}>{b.val}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: '01', t: 'Spot it', d: 'Notice an incident on your street — a pothole, a flood, a blockage.' },
    { n: '02', t: 'Report it', d: 'Pin the location, add details and severity in under a minute.' },
    { n: '03', t: 'Track it', d: 'Follow status updates live until it is resolved.' },
  ];
  return (
    <section className="py-24 lg:py-32 relative" style={{ background: PANEL }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: MUTED }}>
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white" style={{ letterSpacing: '-0.02em' }}>
            Three steps. <span style={{ color: CREAM, fontStyle: 'italic' }}>Zero friction.</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <div
            className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px"
            style={{ background: BORDER_STRONG }}
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
              className="relative"
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full mb-6 text-sm font-medium"
                style={{
                  background: PANEL,
                  border: `1px solid ${BORDER_STRONG}`,
                  color: CREAM,
                }}
              >
                {s.n}
              </div>
              <h3 className="text-xl text-white font-light mb-3">{s.t}</h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: MUTED }}>
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="py-32 lg:py-40" style={{ background: BG }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white"
          style={{ letterSpacing: '-0.03em' }}
        >
          Your city <span style={{ color: CREAM, fontStyle: 'italic' }}>needs you.</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg" style={{ color: MUTED }}>
          Join thousands reporting incidents that matter.
        </p>
        <div className="mt-10">
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium transition-all hover:opacity-90"
            style={{ background: CREAM, color: '#0B0B0B' }}
          >
            Start Reporting
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer style={{ background: BG, borderTop: `1px solid ${BORDER_STRONG}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-bold text-xl tracking-tight">
              <span style={{ color: '#F3F3F3' }}>Urban</span>
              <span style={{ color: CREAM }}>Eye</span>
            </div>
            <p className="mt-3 text-sm max-w-xs" style={{ color: MUTED }}>
              Realtime civic intelligence for the cities we live in.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
            {[
              { to: '/map', l: 'Map' },
              { to: '/report', l: 'Report' },
              { to: '/nearby', l: 'Nearby' },
              { to: '/login', l: 'Login' },
              { to: '/signup', l: 'Sign Up' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                {l.l}
              </Link>
            ))}
          </div>
          <div className="md:text-right">
            <p className="inline-flex items-center gap-2 text-sm" style={{ color: '#C8C8C8' }}>
              <Eye className="w-4 h-4" style={{ color: CREAM }} />
              Built for safer cities
            </p>
          </div>
        </div>
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: `1px solid ${BORDER}`, color: MUTED }}
        >
          <p>© {new Date().getFullYear()} UrbanEye. All rights reserved.</p>
          <p>Made with intent.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- PAGE ---------------- */
export default function LandingPage() {
  return (
    <div style={{ background: BG, color: '#F3F3F3' }}>
      <Navbar />
      <Hero />
      <SocialProof />
      <LiveFeed />
      <MapPreview />
      <AnalyticsPreview />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}