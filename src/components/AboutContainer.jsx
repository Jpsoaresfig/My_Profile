import '../Styles/components/aboutconteiner.sass';
import { useState, useEffect } from 'react';

const AboutContainer = () => {
  const [displayText, setDisplayText] = useState(' ');
  const phrases = ['Welcome, my name is João Pedro', 'This is my website','I\'m a Software Engineer', 'Let\'s code together!'];
  const typingSpeed = 40;
  const erasingSpeed = 40;
  const delayBetweenPhrases = 2000;

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let timer;

    const animate = () => {
      const currentPhrase = phrases[phraseIndex % phrases.length];

      if (isTyping) {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex > currentPhrase.length) {
          isTyping = false;
          timer = setTimeout(animate, delayBetweenPhrases);
          return;
        }
      } else {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex < 0) {
          isTyping = true;
          phraseIndex++;
          charIndex = 0;
          timer = setTimeout(animate, 500);
          return;
        }
      }

      timer = setTimeout(animate, isTyping ? typingSpeed : erasingSpeed);
    };

    timer = setTimeout(animate, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="about-container">
      
      <h1 className='abouth1'>{displayText || '\u00A0'}</h1>

      
      <br />
      <p>Hello, I&apos;m João Pedro, a Computer Science student seeking my first job in the technology field.</p>
      <p>I&apos;m a full-stack developer specializing in JavaScript, React, Java and Spring with advanced data manipulation skills. I have a knack for learning and utilizing technologies quickly.</p>
      <p>I wish to contribute to the development of front-end and back-end projects, aiming to achieve excellent results. My focus is on delivering quality and efficient solutions in web applications.</p>
      <p>Thank you for the opportunity to present my profile, and I&apos;m excited to participate in challenging projects.</p>
    </section>
  );
};

export default AboutContainer;
