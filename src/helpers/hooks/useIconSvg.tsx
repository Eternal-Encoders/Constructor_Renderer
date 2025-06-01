import Anchor from "assets/Anchor.svg?react";
import Cars from "assets/Cars.svg?react";
import Chair from "assets/Chair.svg?react";
import Compas from "assets/Compas.svg?react";
import House from "assets/House.svg?react";
import Lamp from "assets/Lamp.svg?react";
import Leaf from "assets/Leaf.svg?react";
import Palette from "assets/Palette.svg?react";
import Stats from "assets/Stats.svg?react";
import Tools from "assets/Tools.svg?react";
import { getProjectIcon, Icon } from "entities/Project";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useIconSvg = () => {

  const projectIcon = useSelector(getProjectIcon);

  const getIconSvg = useMemo(
    () => {
      switch (projectIcon) {
        case Icon.CROSS:
          return '';
        case Icon.COMPAS:
          return <Compas fill="#334466"/>;
        case Icon.PALETTE:
          return <Palette fill="#334466"/>;
        case Icon.CHAIR:
          return <Chair fill="#334466"/>;
        case Icon.HOUSE:
          return <House fill="#334466"/>;
        case Icon.LAMP:
          return <Lamp fill="#334466"/>;
        case Icon.LEAF:
          return <Leaf fill="#334466"/>;
        case Icon.CARS:
          return <Cars fill="#334466"/>;
        case Icon.STATS:
          return <Stats fill="#334466"/>;
        case Icon.TOOLS:
          return <Tools fill="#334466"/>;
        case Icon.ANCHOR:
          return <Anchor fill="#334466"/>;
        default:
          return '';
      }
    }, [projectIcon]);

  return getIconSvg;
};