import { useAppDispatch } from "app/providers/StoreProvider/config/hooks";
import classNames from "classnames";
import { getLogin } from "features/AuthByUsername/model/selectors/getLogin/getLogin";
import { loginByEmail } from "features/AuthByUsername/model/services/loginByEmail/loginByEmail";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { loginActions } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";

export interface ILoginFormProps {
  className?: string;
  isOpen?: boolean;
}

const LoginForm = memo(({ className, isOpen }: ILoginFormProps) => {
  const dispatch = useAppDispatch();
  const {email, password, isLoading, error} = useSelector(getLogin);

  const onChangeUsername = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(loginActions.setEmail(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByEmail({ email, password }));
  }, [dispatch, email, password]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title= "Форма авторизации" />
      {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
      <Input
        onChange={onChangeUsername} 
        autoFocus
        value={email}
        type="login" 
        placeholder="Введите email"
        className={cls.input}/>
      <Input 
        onChange={onChangePassword} 
        value={password}
        type="password" 
        placeholder="Введите пароль"
        className={cls.input}/>
      <ButtonText 
        className={cls.loginBtn} 
        onClick={onLoginClick}
        disabled={isLoading}
      >
        Войти
      </ButtonText>
    </div>
  );
});

export default LoginForm;