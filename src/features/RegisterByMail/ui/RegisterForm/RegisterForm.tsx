import { useAppDispatch } from "app/providers/StoreProvider/lib/hooks/useAppDispatch";
import classNames from "classnames";
import { getRegisterEmail } from "features/RegisterByMail/model/selectors/getRegisterEmail/getRegisterEmail";
import { getRegisterError } from "features/RegisterByMail/model/selectors/getRegisterError/getRegisterError";
// eslint-disable-next-line @stylistic/js/max-len
import { getRegisterIsLoading } from "features/RegisterByMail/model/selectors/getRegisterIsLoading/getRegisterIsLoading";
import { getRegisterNickname } from "features/RegisterByMail/model/selectors/getRegisterNickname/getRegisterNickname";
import { getRegisterPassword } from "features/RegisterByMail/model/selectors/getRegisterPassword/getRegisterPassword";
import { registerByEmail } from "features/RegisterByMail/model/services/registerByEmail/registerByEmail";
import { memo, useCallback } from "react";
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
}

const initialReducers: ReducersList = {
  'registerForm': registerReducer
}

const RegisterForm = memo(({ className, onSuccess }: IRegisterFormProps) => {
  const dispatch = useAppDispatch();

  const email = useSelector(getRegisterEmail); 
  const password = useSelector(getRegisterPassword); 
  const nickname = useSelector(getRegisterNickname); 
  const isLoading = useSelector(getRegisterIsLoading);
  const error = useSelector(getRegisterError);

  const onChangeEmail = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(registerActions.setEmail(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string | File) => {
    if (typeof value !== "string") return;
    dispatch(registerActions.setPassword(value));
  }, [dispatch]);

  const onChangeNickname = useCallback((name: string | File) => {
    if (typeof name !== "string") return;
    dispatch(registerActions.setNickname(name));
  }, [dispatch]);

  const onRegisterClick = useCallback(async () => {
    console.log(nickname);
    const result = await dispatch(registerByEmail({ email, password, nickname }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, email, nickname, onSuccess, password]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <div className={classNames(cls.RegisterForm, {}, [className])}>
        <Text title= "Форма регистрации" />
        {error && <Text text={error} theme={TextTheme.ERROR} className={cls.error}/>}
        <Input
          onChange={onChangeEmail} 
          autoFocus
          value={email}
          type="email" 
          placeholder="Введите email *"
          className={cls.input}/>
        <Input 
          onChange={onChangePassword} 
          value={password}
          type="password" 
          placeholder="Введите пароль *"
          className={cls.input}/>
        <Input 
          onChange={onChangeNickname} 
          value={nickname}
          type="nickname" 
          placeholder="Введите имя *"
          className={cls.input}/>
        <ButtonText 
          className={cls.registerBtn} 
          onClick={onRegisterClick}
          disabled={isLoading}
        >
          Зарегистрироваться
        </ButtonText>
      </div>
    </DynamicModuleLoader>
  );
});

export default RegisterForm;