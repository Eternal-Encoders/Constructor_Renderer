import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { loginByEmail } from "features/AuthByMail/model/services/loginByEmail/loginByEmail";
import { memo, useCallback } from "react";
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
}

const initialReducers: ReducersList = {
  'loginForm': loginReducer
}

const LoginForm = memo(({ className, onSuccess }: ILoginFormProps) => {
  const dispatch = useAppDispatch();

  const email = useSelector(getLoginEmail); 
  const password = useSelector(getLoginPassword); 
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

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
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, email, onSuccess, password]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title= "Форма авторизации" />
        {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
        <Input
          onChange={onChangeEmail} 
          autoFocus
          value={email}
          type="email" 
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;