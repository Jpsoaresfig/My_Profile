import project1 from "../img/discordpage.png";
import project2 from "../img/photogallery.png";
import project3 from "../img/todolist.png";
import project4 from "../img/SistemaSicredi.png"; 

import '../Styles/components/projectcontainer.sass';

const ProjectsContainer = () => {
  return (
    <>
      <h2>Projects</h2>
      <p id="aboutproject">
        Attached, you&apos;ll find my portfolio, which gathers a selection of the academic and
        personal projects I have developed so far.
      </p>
      <br />
      <a href="https://github.com/Jpsoaresfig?tab=repositories" target="_blank" className="bton" id='botaobaixo' rel="noreferrer">
        Click here!
      </a>
      <br />
      <br />
      <br />
      <div className="projects-row"> {/* New container for the images */}
        <div> {/* Individual container for each project*/}
          <h3 className='titup1'>
            <a href="https://github.com/Jpsoaresfig/pagina_discord" target="_blank" rel="noopener noreferrer">
              Discord Page
            </a>
          </h3>
          <img src={project1} className='project1' alt="" />
          <p className='texto1'>A Discord page created to practice HTML and CSS</p>
        </div>
        <div>
          <h3 className='titup2'>
            <a href="https://github.com/Jpsoaresfig/PhotoGallery" target="_blank" rel="noopener noreferrer">
              Photo Gallery
            </a>
          </h3>
          <img src={project2} className='project2' alt="" />
          <p className='texto2'>A web page that consumes an API and displays photos using React</p>
        </div>
        <div>
          <h3 className='titup3'>
            <a href="https://github.com/Jpsoaresfig/To_Do_Listh" target="_blank" rel="noopener noreferrer">
              To Do List
            </a>
          </h3>
          <img src={project3} className='project3' alt="" />
          <p className='texto3'>A to-do list to practice HTML, CSS, and JavaScript</p>
        </div>
        <div>
          <h3 className='titup4'>
            <a href="https://github.com/Jpsoaresfig/SafeMove" target="_blank" rel="noopener noreferrer">
              Safe move for help Sicredi
            </a>
          </h3>
          <img src={project4} className='project4' alt="Sistema Sicredi Project" />
          <p className='texto4'>Inventory control</p>
        </div>
      </div>
      <br />
      <center><h2>End ;)</h2></center>
    </>
  );
};

export default ProjectsContainer;