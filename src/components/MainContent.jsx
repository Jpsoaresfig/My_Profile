import "../styles/components/maincontent.sass";

import TechnologiesContainer from "./TechnologiesContainer";
import AboutContainer from "./AboutContainer";
import ProjectsContainer from "./ProjectsContainers";



const MainContent = () => {
  return (
    <main id="main-content">
      <AboutContainer />
      <TechnologiesContainer />
      <ProjectsContainer />
    </main>
  );
};

export default MainContent;