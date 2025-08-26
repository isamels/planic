import './styles/App.css';
import AuthProvider from './AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <h1>Planic!</h1>
      </AuthProvider>
    </div>
  );
}

export default App;