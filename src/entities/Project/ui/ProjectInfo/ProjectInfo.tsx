import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import Anchor from "assets/Anchor.svg?react";
import ArrowDownMini from "assets/ArrowDownMini.svg?react";
import Cars from "assets/Cars.svg?react";
import Chair from "assets/Chair.svg?react";
import Compas from "assets/Compas.svg?react";
import Cross from "assets/Cross.svg?react";
import House from "assets/House.svg?react";
import Lamp from "assets/Lamp.svg?react";
import Leaf from "assets/Leaf.svg?react";
import Palette from "assets/Palette.svg?react";
import Stats from "assets/Stats.svg?react";
import Tools from "assets/Tools.svg?react";
import classNames from "classnames";
import { deleteProject } from "entities/Project/api/deleteProject/deleteProject";
import { patchProject } from "entities/Project/api/patchProject/patchProject";
import { getProjectDescription } from "entities/Project/model/selectors/getProjectDescription/getProjectDescription";
import { getProjectError } from "entities/Project/model/selectors/getProjectError/getProjectError";
import { getProjectIcon } from "entities/Project/model/selectors/getProjectIcon/getProjectIcon";
import { getProjectId } from "entities/Project/model/selectors/getProjectId/getProjectId";
import { getProjectIsLoading } from "entities/Project/model/selectors/getProjectIsLoading/getProjectIsLoading";
import { getProjectName } from "entities/Project/model/selectors/getProjectName/getProjectName";
import { getProjectURL } from "entities/Project/model/selectors/getProjectURL/getProjectURL";
import { projectActions } from "entities/Project/model/slice/projectSlice";
import { Icon } from "entities/Project/model/types/icon";
import { fetchProjectsSummary } from "entities/ProjectsSummary";
import { useIconSvg } from "helpers/hooks/useIconSvg";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { Toggle } from "shared/ui/Toggle/Toggle";
import cls from "./ProjectInfo.module.scss";

interface IProjectInfoProps {
  className?: string;
}

export const ProjectInfo = ({ className }: IProjectInfoProps) => {
  const dispatch = useAppDispatch();
  
  const [isDroplistActive, setIsDroplistActive] = useState(false);

  const projectId = useSelector(getProjectId);
  const projectName = useSelector(getProjectName);
  const projectDescription = useSelector(getProjectDescription);
  const projectIcon = useSelector(getProjectIcon);
  const projectURL = useSelector(getProjectURL);
  const errorProjectInfo = useSelector(getProjectError);
  const isLoadingProjectInfo = useSelector(getProjectIsLoading);

  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);
  const [url, setURL] = useState(projectURL);
  const [icon, setIcon] = useState(projectIcon);

  const onChangeName = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(projectActions.setName(value));
  }, [dispatch]);

  const onChangeDescription = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(projectActions.setDescription(value));
  }, [dispatch]);

  const onChangeURL = useCallback((value: string | File) => {
    if (typeof value !== 'string') return;
    if (value.length < 1) return;
    dispatch(projectActions.setURL(value));
  }, [dispatch]);

  const onChangeIcon = useCallback((value: Icon | File) => {
    if (typeof value !== 'string') return;
    dispatch(projectActions.setIcon(value));
  }, [dispatch]);

  const onClickSaveHandle = useCallback(async () => {
    if (name !== projectName || url !== projectURL || description !== projectDescription || icon !== projectIcon) {
      const result = await dispatch(
        patchProject({
          id: projectId, 
          name: projectName, 
          description: projectDescription, 
          url: projectURL,
          icon: projectIcon
        }));
      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchProjectsSummary());
        setName(projectName);
        setURL(projectURL);
        setDescription(projectDescription);
        setIcon(projectIcon);
      }
    } else {
      console.log('Данные не изменились. Измените поля');
    }
  },[description, dispatch, icon, name, projectDescription, projectIcon, projectId, projectName, projectURL, url]);

  const onClickDeleteHandle = useCallback(async () => {
    await dispatch(deleteProject(projectId));
    dispatch(projectActions.clearProject());
  },[dispatch, projectId]);

  const getIconName = useMemo(
    () => projectIcon ? projectIcon.length ? projectIcon : 'Иконки нет' : 'Иконки нет', [projectIcon]);

  const getIconSvg = useIconSvg();

  return (
    <div className={classNames(cls.ProjectInfo, {}, [className])}>
      {isLoadingProjectInfo && <div><Skeleton width={360} card/></div>}
      {!isLoadingProjectInfo && projectId && 
      <Card title="Информация о проекте">
        <div style={{padding: '5px 12px'}}>
          {errorProjectInfo && !projectName && 
            <Text text={errorProjectInfo} theme={TextTheme.ERROR} className={cls.error}/>}
          <section className={classNames(cls.ProjectInfo__section)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              Название
            </h5>
            <Input value={projectName} onChange={onChangeName} />
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              Описание
            </h5>
            <Input value={projectDescription} onChange={onChangeDescription} />
          </section>
          <section className={classNames(cls.ProjectInfo__section, cls.Icons)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              Иконка
            </h5>
            <div className={classNames(cls.Icons__content)}>
              <div className={cls.Icons__chosen} onClick={() => setIsDroplistActive(!isDroplistActive)}>
                <div style={{marginRight: 10}}>{getIconSvg}</div>
                <h6 className={classNames(cls.Icons__name)}>{getIconName}</h6>
                <ArrowDownMini style={{display: 'flex', flexShrink: 0, marginLeft: 'auto'}}/>
              </div>
              {isDroplistActive &&
              <ul className={classNames(cls.Icons__droplist, cls.Droplist)}>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.CROSS)}>
                  <Cross fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.COMPAS)}>
                  <Compas fill="#334466"/>
                </li> 
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.ANCHOR)}>
                  <Anchor fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.LEAF)}>
                  <Leaf fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.PALETTE)}>
                  <Palette fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.LAMP)}>
                  <Lamp fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.CHAIR)}>
                  <Chair fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.CARS)}>
                  <Cars fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.HOUSE)}>
                  <House fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.STATS)}>
                  <Stats fill="#334466"/>
                </li>
                <li className={classNames(cls.Droplist__item)} onClick={() => onChangeIcon(Icon.TOOLS)}>
                  <Tools fill="#334466"/>
                </li>
              </ul>}
            </div>
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <h5 className={classNames(cls.ProjectInfo__title)}>
              URL
            </h5>
            <TextArea 
              placeholder="Описание здания в пользовательском представлении"
              value={projectURL}
              onChange={onChangeURL} 
            />
          </section>
          <section>
            <Toggle text="Активно для пользователя" className={classNames(cls.ProjectInfo__toggle)}/>
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <ButtonText 
              size="medium" 
              style={{marginTop: '8px'}}
              onClick={onClickSaveHandle}
            >
              Сохранить
            </ButtonText>
          </section>
          <section className={classNames(cls.ProjectInfo__section)}>
            <ButtonText 
              size="medium" 
              style={{marginTop: '8px', backgroundColor: 'red', color: 'white'}}
              onClick={onClickDeleteHandle}
            >
              Удалить
            </ButtonText>
          </section>
        </div>
      </Card>}
    </div>
  );
};
