import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<p>Planic!</p>} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;