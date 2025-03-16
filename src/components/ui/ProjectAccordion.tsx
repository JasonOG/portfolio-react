import React from 'react';
import { Project } from 'types';

interface ProjectAccordionProps {
  projects: Project[];
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({ projects }) => {
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {projects.map((project, index) => (
        <div className="accordion-item" key={project.id}>
          <h2 className="accordion-header" id={`flush-heading-${project.id}`}>
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target={`#flush-collapse-${project.id}`} 
              aria-expanded="false" 
              aria-controls={`flush-collapse-${project.id}`}
            >
              <strong>{project.title}</strong>
            </button>
          </h2>
          <div 
            id={`flush-collapse-${project.id}`} 
            className="accordion-collapse collapse" 
            aria-labelledby={`flush-heading-${project.id}`} 
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p3">
              <strong>{project.description}</strong>
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
              <div>
                <strong>Learning Outcomes:</strong>
                {project.learningOutcomes.map((outcome, idx) => (
                  <p key={`outcome-${project.id}-${idx}`}>{idx + 1}. {outcome}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectAccordion;