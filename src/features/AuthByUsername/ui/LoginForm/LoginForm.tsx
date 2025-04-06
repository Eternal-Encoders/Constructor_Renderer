import classNames from "classnames";
import cls from "./LoginForm.module.scss";

interface ILoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: ILoginFormProps) => {
    
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <input type="login" className={cls.input}/>
      <input type="password" className={cls.input}/>
      <button className={cls.loginBtn}>
        Войти
      </button>
    </div>
  );
};
