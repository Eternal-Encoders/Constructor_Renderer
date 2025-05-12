import { BuildingInfo } from "../BuildingInfo/BuildingInfo";
import { BuildingSelection } from "../BuildingSelection/BuildingSelection";

export const Building = () => {
  return (
    <div style={{display: 'flex'}}>
      <BuildingSelection/>
      <BuildingInfo/>
    </div>
  );
};
