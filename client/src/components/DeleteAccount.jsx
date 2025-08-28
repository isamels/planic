import { useAuth } from '../AuthProvider';
import { deleteAccount } from '../api/users';

export default function DeleteAccount() {
  const { setUser } = useAuth();

  const handleDelete = async (e) => {
    await deleteAccount();

    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}