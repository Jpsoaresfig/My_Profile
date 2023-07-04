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

        <p>Desfruto imensamente do que faço e estou sempre em busca de atualização como programador, para me aprimorar cada vez mais nesse vasto campo que é a Ciência da Computação. Sua combinação única de lógica, criatividade e solução de problemas me encanta.</p>

        <p>Através dos meus estudos em Ciências da Computação, estou adquirindo uma base sólida em conceitos fundamentais, como algoritmos e estruturas de dados. Estou preparado para enfrentar desafios e aproveitar as oportunidades que essa área dinâmica oferece.</p>

        <p>Acredito que a Ciência da Computação é um campo que permite um crescimento contínuo, tanto pessoal quanto profissionalmente. Estou determinado a expandir meus conhecimentos, aprimorar minhas habilidades e ser parte das inovações.</p>

       <p> Estou entusiasmado com o futuro que a Ciência da Computação reserva e estou comprometido em me tornar um profissional exemplar nesse campo em constante evolução.</p>
      

      
    </aside>
  );
};

export default Sidebar;