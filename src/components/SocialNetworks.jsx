import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

import "../Styles/socialnetworks.sass";

const socialNetworks = [
  { name: "linkedin", icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/jo%C3%A3o-pedro-figueiredo-55684420a/" },
  { name: "github", icon: <FaGithub />, link: "https://github.com/Jpsoaresfig" },
  { name: "instagram", icon: <FaInstagram />, link: "https://www.instagram.com/jp.soares.fig/" },
];

const SocialNetworkContainer = () => {
  return (
    <section id="social-networks">
      {socialNetworks.map((network) => (
        <a href={network.link} className="social-btn" id={network.name} key={network.name}>
          {network.icon}
        </a>
      ))}
    </section>
  );
};

export default SocialNetworkContainer;
