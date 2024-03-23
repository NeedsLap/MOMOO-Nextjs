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

const deleteSharedUser = async (albumId: string, uid: string) => {
  const res = await fetch(`${url}/album/${albumId}/sharing/${uid}`, {
    method: 'DELETE',
  });

  return res;
};

const deleteAlbum = async (albumId: string) => {
  const res = await fetch(`${url}/album/${albumId}`, {
    method: 'DELETE',
  });

  return res;
};

export { postSharing, getSharedUsers, deleteSharedUser, deleteAlbum };
