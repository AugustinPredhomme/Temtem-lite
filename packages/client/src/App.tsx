import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';
import Resources from './components/Resources';
import ProfileForm from './components/ProfileForm';
import Trades from './components/Trades';
import Fights from './components/Fights';
import Inventory from './components/Inventory';
import { UserProvider } from './context/UserContext';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function clearSessionIfTokenExpired() {
  const expiration = localStorage.getItem('tokenExpiration');
  if (expiration && new Date().getTime() > parseInt(expiration, 10)) {
    localStorage.clear();
    window.location.href = '/';
  }
}

function App() {
  useEffect(() => {
    clearSessionIfTokenExpired();
  }, []);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* User Related Routes */}
            <Route path="/profile" element={<ProfileForm />}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Features Related Routes */}
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="/trades" element={<Trades />}/>
            <Route path="/fights" element={<Fights />}/>

            {/* Misc Related Routes */}
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
