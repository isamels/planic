import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './AuthProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={
              <h1>Planic!</h1>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;