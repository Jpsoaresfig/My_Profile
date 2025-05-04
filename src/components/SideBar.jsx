import SocialNetworkContainer from "./SocialNetworks";
import InformationContainer from "./InformationContainer";

import Avatar from "../img/eu.png";

import "../Styles/components/sidebar.sass";

import profile from "../img/arquivos/curriculo.pdf";

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <img src={Avatar} className="profileimg" alt="João Pedro" />
      <p className="title">Software Engineer</p>
      <SocialNetworkContainer />
      <InformationContainer />
      <a href={profile} target="_blank" className="btn" rel="noreferrer">
        Download CV
      </a>

      <h2 id="AboutMe">About Me</h2>
      <p>
        As a digital native, I&apos;ve had an interest in this area since childhood. I even
        created a YouTube channel with my father, who is an advertising professional, called JPTec.
      </p>
      <p>
        I believe this experience significantly influenced my choice of
        undergraduate studies.
      </p>
      <p>
        While studying Computer Science, I realize I&apos;m on the right path. I enjoy
        what I study and do, which provides me with continuous growth.
      </p>
      <p>
        I am determined to expand my knowledge and be part of innovations, maximizing
        my experience through high-impact learning opportunities.
      </p>

      <h2 id="AboutMe">A Curiosity</h2>
      <iframe
        id="videojptec"
        width="500"
        height="315"
        src="https://youtu.be/tZflWQKvyJw?si=J0YhbBDwI-I5sRpo"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="contact-section">
        <h2>Get in Touch</h2>
        <input type="email" id="email" placeholder="Your email" />
        <br />
        <input type="text" id="message" placeholder="Your message" />
        <br />
        <button>Send</button>
      </div>
    </aside>
  );
};

export default Sidebar;