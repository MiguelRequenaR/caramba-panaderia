import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layout/MainLayout';
import AdminLayout from '@/layout/AdminLayout';
import Home from '@/pages/public/home';
import Products from '@/pages/public/products';
import CategoryProducts from '@/pages/public/products/components/CategoryProducts';
import ProductDetail from '@/pages/public/products/components/ProductDetail';
import About from '@/pages/public/about';
import Ubication from '@/pages/public/ubication';
import Contact from '@/pages/public/contact';
import Checkout from '@/pages/public/checkout';
import PoliticaCambiosDevoluciones from '@/pages/public/politica-cambios-devoluciones';
import PoliticaPrivacidad from '@/pages/public/politica-privacidad';
import TerminosCondiciones from '@/pages/public/terminos-condiciones';
import Login from '@/pages/(auth)/Login';
import Dashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/products/AdminProducts';
import AdminCategories from '@/pages/admin/products/CategoryProducts';
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from '@/utils/ScrollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    }
  }
});

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
      offset: 120,
      easing: 'ease-in-out',
    })
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/productos' element={<Products />} />
            <Route path='/productos/:slug' element={<CategoryProducts />} />
            <Route path='/productos/:slug/:productId' element={<ProductDetail />} />
            <Route path='/nosotros' element={<About />} />
            <Route path='/ubicacion' element={<Ubication />} />
            <Route path='/contacto' element={<Contact />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/politica-cambios-devoluciones' element={<PoliticaCambiosDevoluciones />} />
            <Route path='/politica-privacidad' element={<PoliticaPrivacidad />} />
            <Route path='/terminos-condiciones' element={<TerminosCondiciones />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='productos' element={<AdminProducts />} />
            <Route path='categorias' element={<AdminCategories />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
