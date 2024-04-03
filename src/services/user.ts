import { API_URL } from '@/services/constant';

const getUserByEmail = async (email: string) => {
  const res = await fetch(`${API_URL}/user?email=${email}`);

  return res;
};

const deleteUser = async () => {
  const res = await fetch(`${API_URL}/user`, {
    method: 'DELETE',
  });

  return res;
};

export { getUserByEmail, deleteUser };
