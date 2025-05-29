import { BuildingInfo } from "../../../entities/Building/ui/BuildingInfo/BuildingInfo";
import { BuildingSelection } from "../../../entities/Building/ui/BuildingSelection/BuildingSelection";

const BuildingPage = () => {
  return (
    <div style={{display: 'flex'}}>
      <BuildingSelection/>
      <BuildingInfo/>
    </div>
  );
};

export default BuildingPage;
