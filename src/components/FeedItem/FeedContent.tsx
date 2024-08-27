import { ReactNode } from 'react';

import Background from '@/components/FeedItem/Background/Background';
import Carousel from '@/components/FeedItem/Carousel/Carousel';
import Content from '@/components/FeedItem/Content';
import Icons from '@/components/FeedItem/Icons';
import More from '@/components/FeedItem/More';
import Title from '@/components/FeedItem/Title';

export default function FeedContent({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <article>{children}</article>;
}

FeedContent.Carousel = Carousel;
FeedContent.Title = Title;
FeedContent.Content = Content;
FeedContent.Background = Background;
FeedContent.More = More;
FeedContent.Icons = Icons;
