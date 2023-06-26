import SocialNetworkContainer from "./SocialNetworks";
import InformationContainer from "./InformationContainer";

import Avatar from "../img/eu.png";

import "../styles/components/sidebar.sass";

import profile from "../img/arquivos/Profile.pdf"


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
    </aside>
  );
};

export default Sidebar;