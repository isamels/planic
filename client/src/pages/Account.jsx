import { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import Logout from '../components/Logout';
import DeleteAccount from '../components/DeleteAccount';

export default function Account() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Hi {user.username}!</h1>
      <Logout />
      <DeleteAccount />
      <a href="/">Back to main page</a>
    </div>
  );
}