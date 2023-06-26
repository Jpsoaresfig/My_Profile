import {
    DiHtml5,
    DiCss3,
    DiJsBadge,
    DiNodejsSmall,
    DiJava,
    DiReact,
  } from "react-icons/di";
  
  import "../styles/components/technologiecontainer.sass";
  
  const technologies = [
    {
      id: "html",
      name: "HTML5",
      icon: <DiHtml5 />,
      paragraphs: [
        "HTML5: Linguagem de marcação para estruturar e exibir conteúdo na web",
        
      ],
    },
    {
      id: "css",
      name: "CSS3",
      icon: <DiCss3 />,
      paragraphs: [
        "CSS3: Linguagem para estilizar e formatar a apresentação dos elementos HTML em uma página da web.",
        
      ],
    },
    {
      id: "js",
      name: "JavaScript",
      icon: <DiJsBadge />,
      paragraphs: [
        "JavaScript: Linguagem de programação que adiciona interatividade e comportamento dinâmico a sites.",
     
      ],
    },
    {
      id: "node",
      name: "Node.js",
      icon: <DiNodejsSmall />,
      paragraphs: [
        "Node.js: Plataforma de tempo de execução do JavaScript do lado do servidor, usada para construir aplicações web escaláveis e de alto desempenho.",
        
      ],
    },
    {
      id: "java",
      name: "Java",
      icon: <DiJava />,
      paragraphs: [
        "Java: Linguagem de programação de propósito geral e orientada a objetos, conhecida por sua portabilidade e ampla aplicação no desenvolvimento de aplicativos empresariais e sistemas.",
        
      ],
    },
    {
      id: "react",
      name: "React",
      icon: <DiReact />,
      paragraphs: [
        "React: Biblioteca JavaScript para construir interfaces de usuário interativas e reativas em aplicações web.",
        
      ],
    },
  ];
  
  const TechnologiesContainer = () => {
    return (
      <section className="technologies-container">
        <h2>Tecnologias</h2>
        <div className="technologies-grid">
          {technologies.map((tech) => (
            <div className="technology-card" id={tech.id} key={tech.id}>
              {tech.icon}
              <div className="technology-info">
                <h3>{tech.name}</h3>
                {tech.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default TechnologiesContainer;
  