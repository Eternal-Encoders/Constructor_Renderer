import { ProjectInfo } from "../ProjectInfo/ProjectInfo";
import { ProjectSelection } from "../ProjectSelection/ProjectSelection";

export const Project = () => {
  return (
    <div style={{display: 'flex'}}>
      <ProjectSelection/>
      <ProjectInfo/>
    </div>
  );
};
