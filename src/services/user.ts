const url = 'http://localhost:3000/api';

const getUserByEmail = async (email: string) => {
  const res = await fetch(`${url}/user?email=${email}`);

  return res;
};

const deleteUser = async () => {
  const res = await fetch(`${url}/user`, {
    method: 'DELETE',
  });

  return res;
};

export { getUserByEmail, deleteUser };
