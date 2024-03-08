import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AlbumDetail from '@/containers/albumDetail/AlbumDetail';
import { getFeeds } from '@/services/feed';

import type { AlbumDetailParams } from '@/app/(albumDetail)/[uid]/[albumName]/model';

export const generateMetadata = ({ params }: { params: AlbumDetailParams }) => {
  return { title: `${decodeURI(params.albumName)} | MOMOO` };
};

export default async function Page({ params }: { params: AlbumDetailParams }) {
  const getFeedsData = async () => {
    try {
      const albumName = params.albumName;
      const uid = params.uid;
      const res = await getFeeds({
        limit: 0,
        skip: 0,
        uid,
        albumName,
        cookie: cookies().toString(),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 404 || res.status === 401) {
          redirect('404');
        }

        throw new Error(await res.text());
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const feeds = await getFeedsData();

  return <AlbumDetail feeds={feeds} />;
}
