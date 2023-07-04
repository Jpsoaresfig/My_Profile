import SocialNetworkContainer from "./SocialNetworks";
import InformationContainer from "./InformationContainer";

import Avatar from "../img/eu.png";

import "../Styles/components/sidebar.sass";

import profile from "../img/arquivos/Profiles.pdf"


const Sidebar = () => {

  return (
    <aside id="sidebar">
      <img src={Avatar} alt="Matheus Battisti" />
      <p className="title">Web-Developer</p>
      <SocialNetworkContainer />
      <InformationContainer />
      <a href={profile} className="btn">
        Download currículo
      </a>


      <h2 id="AboutMe">Sobre mim:</h2>
      <p> Desde pequeno, meu interesse pela tecnologia foi crescendo e despertando aos poucos: eu usava o computador do meu pai e fingia programar, apertando botões aleatoriamente.</p>
       <p>Hoje, aos meus 21 anos, estou transformando essa paixão em realidade. Participei e ainda participo de projetos na minha área, sempre buscando meu desenvolvimento pessoal e crescimento tanto como indivíduo quanto como programador.</p>

        <p>Desfruto imensamente do que faço e estou sempre em busca de atualização como programador, para me aprimorar cada vez mais nesse vasto campo que é a Ciência da Computação. </p>

        <p>Através dos meus estudos em Ciências da Computação, estou adquirindo uma base sólida em conceitos fundamentais, como algoritmos e estruturas de dados. </p>

        <p>Acredito que a Ciência da Computação é um campo que permite um crescimento contínuo, tanto pessoal quanto profissionalmente. Estou determinado a expandir meus conhecimentos e ser parte das inovações.</p>

       
      

      
    </aside>
  );
};

export default Sidebar;