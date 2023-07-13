import SocialNetworkContainer from "./SocialNetworks";
import InformationContainer from "./InformationContainer";

import Avatar from "../img/eu.png";

import "../Styles/components/sidebar.sass";

import profile from "../img/arquivos/Profiles.pdf"


const Sidebar = () => {


  return (
    <aside id="sidebar">
      <img src={Avatar} className="profileimg" alt="João Pedro" />
      <p className="title">Web-Developer</p>
      <SocialNetworkContainer />
      <InformationContainer />
      <a href={profile} target="_blank" className="btn" rel="noreferrer">
        Download currículo
      </a>


      <h2 id="AboutMe">Sobre mim</h2>
      <p>Sendo um nativo digital, desde a infância já nutria interesse por esse tema. Cheguei a criar um canal no YouTube com meu pai, que é publicitário, chamado JPTec. </p>
      <p> Acredito que essa experiência tenha me influenciado significativamente na escolha da minha graduação.</p>
      <p>Ao estudar Ciência da Computação, percebo que estou trilhando o caminho certo. Desfruto do que estudo e faço, o que me proporciona um crescimento contínuo.</p>
      <p> Estou determinado a expandir meus conhecimentos e fazer parte das inovações, maximizando minha experiência por meio de oportunidades de aprendizado de alto impacto.</p>

      <h2 id="AboutMe">Uma curiosidade</h2>
      <iframe id="videojptec" width="500" height="315" src="https://www.youtube.com/embed/tZflWQKvyJw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>



      
    </aside>
  );
};

export default Sidebar;