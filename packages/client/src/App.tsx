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

const queryClient = new QueryClient();

function App() {

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
            <Routes>
              {/* Base Route */}
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
            </Routes>
          <Resources />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
