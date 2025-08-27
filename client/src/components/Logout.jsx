import { useAuth } from "../AuthProvider";

export default function Logout() {
  const { setUser } = useAuth();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}