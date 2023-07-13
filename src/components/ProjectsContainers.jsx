import projet1 from "../img/discordpage.png"
import projet2 from "../img/photogallery.png"
import projet3 from "../img/todolist.png"

import '../Styles/components/projectcontainer.sass';

const ProjectsContainer = () => {
  return (
    <>
      <h2>Projetos</h2>
      <p id="aboutproject">
        Anexo, encontra-se meu portfólio, que reúne uma seleção dos projetos acadêmicos e autorais que desenvolvi até o momento.
      </p>
      <br />
      <a href="https://github.com/Jpsoaresfig?tab=repositories" target="_blank" className="bton" id='botaobaixo' rel="noreferrer">
        clique aqui!
      </a>
      <br />
      <br />
      <br />
      <h3 className='titup1'>Página Discord</h3>
      <img src={projet1} className='project1' alt="" />
      <p className='texto1'>Uma página discord feita para treinar HTML e CSS</p>
      <br />
      <h3 className='titup2'>PhotoGallery</h3>
      <img src={projet2} className='project2' alt="" />
      <p className='texto2'>Uma página web que consome uma API e exibe as fotos usando React</p>
      <br />
      <h3 className='titup3'>To do List</h3>
      <img src={projet3} className='project3' alt="" />
      <p className='texto3'>Uma to-do list para treinar HTML, CSS e JavaScript</p>
      <br />
      <center><h2>Fim ;)</h2></center>
    </>
  );
};

export default ProjectsContainer;
