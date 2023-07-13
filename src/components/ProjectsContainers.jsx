

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
      <img src="src\img\DiscordPage.png" className='project1' alt="" />
      <p className='texto1'>Uma página discord feita para treinar HTML e CSS</p>
      <br />
      <h3 className='titup2'>PhotoGallery</h3>
      <img src="src\img\PhotoGallerry.png" className='project2' alt="" />
      <p className='texto2'>Uma página web que consome uma API e exibe as fotos usando react</p>
      <br />
      <h3 className='titup3'>To do List</h3>
      <img src="src\img\ToDoList.png" className='project3' alt="" />
      <p className='texto3'>Uma to do list para treinar HTML, CSS e JAVASCRIPT</p>
      <br />

      <center><h2>Fim</h2></center>
    </>

  );
};

export default ProjectsContainer;
