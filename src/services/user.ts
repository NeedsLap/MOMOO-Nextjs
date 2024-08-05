import API_URL from '@/services/constant';

const searchUser = async (email: string) => {
  const res = await fetch(`${API_URL}/user/search?email=${email}`);

  return res;
};

const getUser = async () => {
  const res = await fetch(`${API_URL}/user`);

  return res;
};

const deleteUser = async () => {
  const res = await fetch(`${API_URL}/user`, {
    method: 'DELETE'
  });

  return res;
};

export { searchUser, getUser, deleteUser };
