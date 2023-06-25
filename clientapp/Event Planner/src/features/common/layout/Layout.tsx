import { Header } from 'features/common/header/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="bg-primary-light p-20 min-h-screen h-full">
      <Header />
      <main className="bg-secondary-light flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
