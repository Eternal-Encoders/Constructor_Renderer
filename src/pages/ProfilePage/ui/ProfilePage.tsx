import classNames from "classnames";
import cls from "./ProfilePage.module.scss";

interface IProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: IProfilePageProps) => {
  return (
    <div className={classNames(cls.ProfilePage, {}, [className])}>
      
    </div>
  );
};

export default ProfilePage;
