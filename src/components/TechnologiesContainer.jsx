import { DiHtml5, DiCss3, DiJsBadge, DiNodejsSmall, DiJava, DiReact } from "react-icons/di";
import { FaPython, FaCode } from "react-icons/fa";

import "../Styles/technologiecontainer.sass";

const technologies = [
  {
    id: "html",
    name: "HTML5",
    icon: <DiHtml5 />,
  },
  {
    id: "css",
    name: "CSS3",
    icon: <DiCss3 />,
  },
  {
    id: "js",
    name: "JavaScript",
    icon: <DiJsBadge />,
  },
  {
    id: "node",
    name: "Node.js",
    icon: <DiNodejsSmall />,
  },
  {
    id: "java",
    name: "Java",
    icon: <DiJava />,
  },
  {
    id: "reactjs",
    name: "React",
    icon: <DiReact />,
  },
  {
    id: "python",
    name: "Python",
    icon: <FaPython />,
  },
  {
    id: "c",
    name: "C",
    icon: <FaCode />,
  },
];

const TechnologiesContainer = () => {
  return (
    <section className="technologies-container">
      <h2>Tecnologias</h2>
      <br />
      <div className="technologies-grid">
        {technologies.map((tech) => (
          <div className="technology-card" id={tech.id} key={tech.id}>
            {tech.icon}
            <h3>{tech.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesContainer;
