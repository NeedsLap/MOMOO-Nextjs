const url = 'http://localhost:3000/api';

const postSharing = async (uid: string, album: string) => {
  const data = {
    album,
    uid,
  };

  const res = await fetch(`${url}/album/share`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
};

export { postSharing };
