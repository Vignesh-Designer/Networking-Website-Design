import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Scene } from './components/Scene';
import { 
  Network, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bannerY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="relative min-h-[400vh] bg-deep selection:bg-accent selection:text-deep">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <Scene scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass border-none bg-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Network className="text-deep w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter uppercase">Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest opacity-70">
          <a href="#" className="hover:text-accent transition-colors">Protocol</a>
          <a href="#" className="hover:text-accent transition-colors">Nodes</a>
          <a href="#" className="hover:text-accent transition-colors">Governance</a>
          <a href="#" className="hover:text-accent transition-colors">Connect</a>
        </div>
        <button className="px-6 py-2 bg-accent text-deep font-bold rounded-full hover:scale-105 transition-transform">
          LAUNCH APP
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1 rounded-full glass text-accent text-xs font-mono mb-8 uppercase tracking-[0.3em]"
          >
            Web3 Networking Protocol v2.0
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-7xl md:text-9xl font-bold leading-[0.85] tracking-tighter uppercase mb-8"
          >
            The Future <br /> 
            <span className="text-accent italic">Connected</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Decentralized identity, trustless networking, and hyper-scalable infrastructure. 
            Join the next evolution of human connectivity.
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      {/* Futuristic Banner - Follows Scroll */}
      <motion.div 
        style={{ y: bannerY }}
        className="sticky top-1/2 -translate-y-1/2 z-20 pointer-events-none overflow-hidden"
      >
        <div className="flex whitespace-nowrap opacity-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-display text-[20vw] font-black uppercase leading-none tracking-tighter px-4">
              Decentralized • Future • Network •
            </span>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="relative z-10 px-8 md:px-24 space-y-64 pb-64">
        
        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Secure ID", desc: "Zero-knowledge proofs for sovereign identity management." },
            { icon: Zap, title: "Instant Sync", desc: "Real-time state synchronization across global edge nodes." },
            { icon: Globe, title: "Global Mesh", desc: "Resilient peer-to-peer networking without central authority." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-3xl group hover:bg-accent/5 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-2xl font-bold mb-4 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Big Text Section */}
        <section className="max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tighter mb-12"
          >
            Built for the <br />
            <span className="text-accent">New Internet</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-xl text-white/70 leading-relaxed">
              Nexus is more than a protocol. It's a foundation for a world where 
              data is owned by creators, and connectivity is a fundamental right. 
              Our architecture leverages the latest in Web3 technology to ensure 
              privacy, security, and speed.
            </p>
            <div className="space-y-6">
              {[
                { label: "Active Nodes", value: "1.2M+" },
                { label: "Transactions", value: "450M" },
                { label: "Uptime", value: "99.99%" }
              ].map((stat, i) => (
                <div key={i} className="flex items-end justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50">{stat.label}</span>
                  <span className="font-display text-3xl font-bold text-accent">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-16 rounded-[4rem] w-full max-w-4xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px]" />
            
            <Users className="w-16 h-16 text-accent mx-auto mb-8" />
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
              Ready to <br /> Join the Mesh?
            </h2>
            <p className="text-white/60 mb-12 max-w-xl mx-auto">
              Start building on the most advanced networking protocol ever created. 
              Open source, community driven, and future proof.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-12 py-4 bg-accent text-deep font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                GET STARTED <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-12 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                READ DOCS
              </button>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-deep/80 backdrop-blur-md px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Network className="text-deep w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tighter uppercase">Nexus</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              The decentralized networking protocol for the next generation of the internet.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer" />
              <Github className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer" />
              <Linkedin className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer" />
            </div>
          </div>
          
          {[
            { title: "Protocol", links: ["Whitepaper", "Nodes", "Staking", "Governance"] },
            { title: "Developers", links: ["Documentation", "SDKs", "API Reference", "Bug Bounty"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] }
          ].map((col, i) => (
            <div key={i} className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-accent">{col.title}</h4>
              <ul className="space-y-4 text-sm text-white/40">
                {col.links.map((link, j) => (
                  <li key={j} className="hover:text-white cursor-pointer transition-colors">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/20">
          <span>© 2026 Nexus Protocol Foundation</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
