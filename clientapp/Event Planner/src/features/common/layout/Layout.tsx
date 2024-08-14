import { AuthOutlet } from 'features/authentication/authOutlet/AuthOutlet';
import { Header } from 'features/common/header/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className="bg-primary-light p-20 min-h-screen h-full">
    <Header />
    <AuthOutlet>
      <main className="bg-secondary-light py-5 flex flex-col px-10 border-t border-t-primary-light">
        <Outlet />
      </main>
    </AuthOutlet>
  </div>
);
