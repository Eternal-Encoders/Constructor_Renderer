import classNames from "classnames";
import { Link } from "react-router";
import cls from "./Navbar.module.scss";

interface INavbarProps {
    className?: string;
    marginBottom?: number;
}

export const Navbar = ({ className, marginBottom }: INavbarProps) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])} style={{ marginBottom }}>
            <div className={cls.links}>
                <Link to={'/'} className={cls.mainLink}>Главная</Link>
                <Link to={'/about'} className={cls.aboutLink}>О сайте</Link>
            </div>
        </div>
    );
};
