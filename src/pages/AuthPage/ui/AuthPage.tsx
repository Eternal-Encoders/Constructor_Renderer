import LoginForm from "features/AuthByMail/ui/LoginForm/LoginForm";
import RegisterForm from "features/RegisterByMail/ui/RegisterForm/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RoutePath } from "shared/config/routeConfig/routeConfig.";
import { Logo } from "shared/ui/Logo/Logo";
import cls from './AuthPage.module.scss';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const redirect = () => {
    navigate(RoutePath.project_selection);
  }

  return (
    <div className={cls.AuthPage}>
      <Logo center className={cls.Logo}/>
      {isRegister && <RegisterForm onSuccess={redirect} onLoginClicked={() => setIsRegister(false)}/>}
      {!isRegister && <LoginForm onSuccess={redirect} onRegisterClicked={() => setIsRegister(true)}/>}
    </div>
  ); 
};
      
export default AuthPage;