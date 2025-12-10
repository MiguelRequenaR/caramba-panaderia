import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useLenis } from '@/hooks/useLenis';

export default function MainLayout() {
  useLenis();
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}
