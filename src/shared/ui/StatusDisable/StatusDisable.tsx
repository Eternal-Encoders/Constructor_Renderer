import cls from './StatusDisable.module.scss';

export const StatusDisable = () => {
  return (
    <aside className={cls.StatusDisable}>
      <span className={cls.StatusDisable__mode}>Отключено</span>
      <div className={cls.circle_red}></div>
    </aside>
  );
}