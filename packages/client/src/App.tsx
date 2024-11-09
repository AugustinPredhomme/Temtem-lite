import React from 'react';
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
import useAuthStore from './components/isAuthenticated';

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* User Related Routes */}
            <Route path="/profile" element={
                <ProfileForm />
            }/>
            {/* Features Related Routes */}
            <Route path="/trades" element={
                <Trades />
            }/>
            <Route path="/fights" element={
                <Fights />
            }/>
            {/* Misc Related Routes */}
            <Route path="/resources" element={<Resources />} />
          </Routes>
          <Resources />
        </BrowserRouter>
      </QueryClientProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* User Related Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Features Related Routes */}

            {/* Misc Related Routes */}
            <Route path="/resources" element={<Resources />} />
          </Routes>
          <Resources />
        </BrowserRouter>
      </QueryClientProvider>
    );
  }
}

export default App;