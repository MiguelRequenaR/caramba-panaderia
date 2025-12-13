import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layout/MainLayout';
import Home from '@/pages/home';
import Products from '@/pages/products';
import CategoryProducts from '@/pages/products/components/CategoryProducts';
import About from '@/pages/about';
import Ubication from '@/pages/ubication';
import Contact from '@/pages/contact';
import AOS from 'aos'
import 'aos/dist/aos.css'
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
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/productos' element={<Products />} />
            <Route path='/productos/:categoryId' element={<CategoryProducts />} />
            <Route path='/nosotros' element={<About />} />
            <Route path='/ubicacion' element={<Ubication />} />
            <Route path='/contacto' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
