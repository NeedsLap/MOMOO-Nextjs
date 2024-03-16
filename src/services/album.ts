const url = 'http://localhost:3000/api';

const postSharing = async (uid: string, albumId: string) => {
  const data = {
    uid,
    permission: 'read',
  };

  const res = await fetch(`${url}/album/${albumId}/sharing`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
};

const getSharedUsers = async (albumId: string) => {
  const res = await fetch(`${url}/album/${albumId}/sharing`);

  return res;
};

export { postSharing, getSharedUsers };
