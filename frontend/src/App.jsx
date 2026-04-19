import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="petitions" element={<Feed />} />
              <Route path="important" element={<Feed filter="IMPORTANT" />} />
              <Route path="urgent" element={<Feed filter="URGENT" />} />
              <Route path="about" element={<About />} />
              <Route path="help" element={<Help />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
