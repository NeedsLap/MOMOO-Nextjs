import { useParams } from 'next/navigation';

export default function useAlbumName() {
  const { albumName } = useParams<{ albumName: string }>();
  return decodeURI(albumName || '.') || '.';
}
