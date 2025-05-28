
import { ProjectInfo } from "entities/Project/ui/ProjectInfo/ProjectInfo";
import { ProjectSelection } from "entities/Project/ui/ProjectSelection/ProjectSelection";

const ProjectPage = () => {
  return (
    <div style={{display: 'flex'}}>
      <ProjectSelection/>
      <ProjectInfo/>
    </div>
  );
};

export default ProjectPage;