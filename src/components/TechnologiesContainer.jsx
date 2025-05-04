import React from "react";
import { DiHtml5, DiCss3, DiJsBadge, DiNodejsSmall, DiJava, DiReact } from "react-icons/di";
import { FaPython, FaCode, FaDatabase } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";

import "../Styles/technologiecontainer.sass";

const technologies = [
  {
    id: "html",
    name: "HTML5",
    icon: <DiHtml5 />,
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    id: "css",
    name: "CSS3",
    icon: <DiCss3 />,
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    id: "js",
    name: "JavaScript",
    icon: <DiJsBadge />,
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "node",
    name: "Node.js",
    icon: <DiNodejsSmall />,
    link: "https://nodejs.org/",
  },
  {
    id: "java",
    name: "Java",
    icon: <DiJava />,
    link: "https://www.oracle.com/java/",
  },
  {
    id: "reactjs",
    name: "React",
    icon: <DiReact />,
    link: "https://react.dev/",
  },
  {
    id: "python",
    name: "Python",
    icon: <FaPython />,
    link: "https://www.python.org/",
  },
  {
    id: "c",
    name: "C",
    icon: <FaCode />,
    link: "https://en.cppreference.com/w/c",
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: <FaDatabase />,
    link: "https://www.mysql.com/",
  },
  {
    id: "springboot",
    name: "Spring Boot",
    icon: <SiSpringboot />,
    link: "https://spring.io/projects/spring-boot",
  },
];

const TechnologiesContainer = () => {
  return (
    <section className="technologies-container">
      <h2>Tecnologias</h2>
      <br />
      <div className="technologies-grid">
        {technologies.map((tech) => (
          <a
            href={tech.link}
            target="_blank"
            rel="noopener noreferrer"
            className="technology-card-link"
            key={tech.id}
          >
            <div className="technology-card" id={tech.id}>
              {tech.icon}
              <h3>{tech.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesContainer;