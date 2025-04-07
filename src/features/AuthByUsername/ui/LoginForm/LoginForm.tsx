import classNames from "classnames";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import cls from "./LoginForm.module.scss";

interface ILoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: ILoginFormProps) => {
    
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input type="login" className={cls.input}/>
      <Input type="password" className={cls.input}/>
      <ButtonText className={cls.loginBtn} >
        Войти
      </ButtonText>
    </div>
  );
};
