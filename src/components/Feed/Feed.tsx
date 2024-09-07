import { ReactNode } from 'react';

import Background from '@/components/Feed/Background/Background';
import Carousel from '@/components/Feed/Carousel/Carousel';
import Content from '@/components/Feed/Content';
import Icons from '@/components/Feed/Icons';
import More from '@/components/Feed/More';
import Title from '@/components/Feed/Title';

function Article({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <article>{children}</article>;
}

const Feed = Object.assign(Article, {
  Carousel,
  Title,
  Content,
  Background,
  More,
  Icons
});

export default Feed;
