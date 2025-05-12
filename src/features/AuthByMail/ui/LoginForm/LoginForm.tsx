import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { loginByEmail } from "features/AuthByMail/model/services/loginByEmail/loginByEmail";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginEmail } from "../../model/selectors/getLoginEmail/getLoginEmail";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";

export interface ILoginFormProps {
  className?: string;
  onSuccess: () => void;
  onRegisterClicked?: () => void;
}

const initialReducers: ReducersList = {
  'loginForm': loginReducer
}

const LoginForm = memo(({ className, onSuccess, onRegisterClicked }: ILoginFormProps) => {
  const dispatch = useAppDispatch();

  const email = useSelector(getLoginEmail); 
  const password = useSelector(getLoginPassword); 
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const onChangeEmail = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(loginActions.setEmail(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByEmail({ email, password }));
    if (!onSuccess) return;
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, email, onSuccess, password]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <header className={cls.LoginForm__header}>
          <h1 className={cls.LoginForm__title}>
            Вход
          </h1>
          <aside className={cls.LoginForm__forgotPassword}>
            <u>Забыли пароль?</u>
          </aside>
        </header>
        <main className={cls.Form}>
          {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
          <Input
            iconLeft={'>'}
            onChange={onChangeEmail} 
            autoFocus
            value={email}
            type="email" 
            placeholder="Электронная почта"
            className={cls.input}/>
          <Input 
            iconLeft={isLocked ? '🔒' : '🔓'}
            onChange={onChangePassword} 
            onLeftIconClicked={() => setIsLocked((prev) => !prev)}
            value={password}
            type={isLocked ? 'password' : 'text'}
            placeholder="Пароль"
            className={cls.input}/>
          <ButtonText 
            className={cls.loginBtn} 
            onClick={onLoginClick}
            inverted
            disabled={isLoading}
          >
            Войти
          </ButtonText>
        </main>
        <section className={cls.LoginForm__footer}>
          <span className={cls.LoginForm__noAccount}>Нет аккаунта?</span>
          <u className={cls.LoginForm__register} onClick={onRegisterClicked}>Зарегистрируйтесь!</u>
        </section>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;