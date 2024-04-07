'use client';

import { useParams, useRouter } from 'next/navigation';

import EditFeedContents from '@/components/EditFeed/EditFeedContents';

export default function EditFeedModal() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const close = () => {
    router.back();
  };

  return <EditFeedContents close={close} id={id} />;
}
