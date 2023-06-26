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
    </aside>
  );
};

export default Sidebar;