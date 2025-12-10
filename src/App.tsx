import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layout/MainLayout';
import Home from '@/pages/home';
import AOS from 'aos'
import 'aos/dist/aos.css'

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
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
