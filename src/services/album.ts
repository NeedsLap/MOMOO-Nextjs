import { API_URL } from '@/services/constant';

import type { GetFeedsOpts } from '@/services/model';

const getAlbum = async (cookie: string) => {
  const opts: GetFeedsOpts = {
    method: 'GET',
  };

  if (cookie) {
    opts.headers = {
      Cookie: cookie,
    };
  }
  const res = await fetch(`${API_URL}/album`, opts);

  return res;
};

const postSharing = async (uid: string, albumId: string) => {
  const data = {
    uid,
    permission: 'read',
  };

  const res = await fetch(`${API_URL}/album/${albumId}/sharing`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
};

const getSharedUsers = async (albumId: string) => {
  const res = await fetch(`${API_URL}/album/${albumId}/sharing`);

  return res;
};

const deleteSharedUser = async (albumId: string, uid: string) => {
  const res = await fetch(`${API_URL}/album/${albumId}/sharing/${uid}`, {
    method: 'DELETE',
  });

  return res;
};

const deleteAlbum = async (albumId: string) => {
  const res = await fetch(`${API_URL}/album/${albumId}`, {
    method: 'DELETE',
  });

  return res;
};

const getSharedAlbums = async () => {
  const res = await fetch(`${API_URL}/album/sharing`);

  return res;
};

export {
  postSharing,
  getSharedUsers,
  deleteSharedUser,
  deleteAlbum,
  getAlbum,
  getSharedAlbums,
};
