import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { getRegisterEmail } from "features/RegisterByMail/model/selectors/getRegisterEmail/getRegisterEmail";
import { getRegisterError } from "features/RegisterByMail/model/selectors/getRegisterError/getRegisterError";
// eslint-disable-next-line @stylistic/js/max-len
import { getRegisterIsLoading } from "features/RegisterByMail/model/selectors/getRegisterIsLoading/getRegisterIsLoading";
import { getRegisterNickname } from "features/RegisterByMail/model/selectors/getRegisterNickname/getRegisterNickname";
import { getRegisterPassword } from "features/RegisterByMail/model/selectors/getRegisterPassword/getRegisterPassword";
import { registerByEmail } from "features/RegisterByMail/model/services/registerByEmail/registerByEmail";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ButtonText } from "shared/ui/ButtonText/ButtonText";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { registerActions, registerReducer } from "../../model/slice/registerSlice";
import cls from "./RegisterForm.module.scss";

export interface IRegisterFormProps {
  className?: string;
  onSuccess: () => void;
  onLoginClicked?: () => void;
}

const initialReducers: ReducersList = {
  'registerForm': registerReducer
}

const RegisterForm = memo(({ className, onSuccess, onLoginClicked }: IRegisterFormProps) => {
  const dispatch = useAppDispatch();

  const email = useSelector(getRegisterEmail); 
  const password = useSelector(getRegisterPassword); 
  const nickname = useSelector(getRegisterNickname); 
  const isLoading = useSelector(getRegisterIsLoading);
  const error = useSelector(getRegisterError);

  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [passwordsNotEqual, setPasswordsNotEqual] = useState<boolean>(false);

  const onChangeEmail = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(registerActions.setEmail(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(registerActions.setPassword(value));
  }, [dispatch]);

  const onChangePasswordRepeat = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    setRepeatPassword(value);
  }, []);

  const onChangeNickname = useCallback((name: string | File) => {
    if (typeof name !== "string") return;
    dispatch(registerActions.setNickname(name));
  }, [dispatch]);

  const onRegisterClick = useCallback(async () => {
    if (repeatPassword !== password) {
      setPasswordsNotEqual(true);
      return;
    }
    setPasswordsNotEqual(false);
    const result = await dispatch(registerByEmail({ email, password, nickname }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, email, nickname, onSuccess, password, repeatPassword]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.RegisterForm, {}, [className])}>
        <header className={cls.RegisterForm__header}>
          <h1 className={cls.RegisterForm__title}>
            Регистрация
          </h1>
          {/* <aside className={cls.RegisterForm__forgotPassword}>
            <u>Забыли пароль?</u>
          </aside> */}
        </header>
        <main className={cls.Form}>
          {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
          {passwordsNotEqual && <Text text='Пароли не совпадают' theme={TextTheme.ERROR} className={cls.error}/>}
          <Text text="Укажите данные пользователя и пароль" className={cls.info} />
          <Input 
            onChange={onChangeEmail} 
            autoFocus
            value={email}
            type="email" 
            placeholder="Электронная почта"
            className={cls.input}/>
          <Input
            onChange={onChangeNickname} 
            value={nickname}
            type="nickname" 
            placeholder="Имя"
            className={cls.input}/>
          <Input 
            iconLeft={isLocked ? '🔒' : '🔓'}
            onChange={onChangePassword} 
            onLeftIconClicked={() => setIsLocked((prev) => !prev)}
            value={password}
            type={isLocked ? 'password' : 'text'}
            placeholder="Пароль"
            className={cls.input}/>
          <Input 
            iconLeft={isLocked ? '🔒' : '🔓'}
            onChange={onChangePasswordRepeat} 
            onLeftIconClicked={() => setIsLocked((prev) => !prev)}
            value={repeatPassword}
            type={isLocked ? 'password' : 'text'}
            placeholder="Подтвердите пароль"
            className={cls.input}/>
          <ButtonText 
            className={cls.loginBtn} 
            onClick={onRegisterClick}
            inverted
            disabled={isLoading}
          >
            Создать аккаунт
          </ButtonText>
        </main>
        <section className={cls.RegisterForm__footer}>
          <span className={cls.RegisterForm__noAccount}>Есть аккаунт?</span>
          <u className={cls.RegisterForm__register} onClick={onLoginClicked}>Войдите!</u>
        </section>
      </div>
    </DynamicModuleLoader>
  );
}); 

export default RegisterForm;