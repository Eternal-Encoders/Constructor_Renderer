import cls from './StatusActive.module.scss';

export const StatusActive = () => {
  return (
    <aside className={cls.StatusActive}>
      <span className={cls.StatusActive__mode}>Активно</span>
      <div className={cls.circle_green}></div>
    </aside>
  );
}