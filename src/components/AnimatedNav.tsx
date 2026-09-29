import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const AnimatedNav = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = '';

      for (const link of links) {
        const element = document.querySelector(link.href) as HTMLElement;
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = link.href;
        }
      }

      // If at top, clear active section or set to first
      if (window.scrollY < 100) {
        currentSection = '';
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="animated-nav-container" style={{ display: 'flex', gap: '8px', position: 'relative' }}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={(e) => handleClick(e, link.href)}
          style={{
            position: 'relative',
            padding: '8px 16px',
            color: activeSection === link.href ? '#fff' : 'var(--text-secondary)',
            fontWeight: 500,
            transition: 'color 0.3s ease',
            zIndex: 1,
            outline: 'none',
          }}
        >
          {activeSection === link.href && (
            <motion.div
              layoutId="nav-pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '20px',
                zIndex: -1,
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)',
              }}
            />
          )}
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default AnimatedNav;
