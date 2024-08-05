import designToken from '@/constants/designToken';

type Scale = keyof typeof designToken.scale;
type Headline = 's' | 'm' | 'l';
type Title = 's' | 'm' | 'l';
type Text = 'xxs' | 'xs' | 's' | 'm' | 'l';
type FontWeight = 'base' | 'priminent';

export type { Scale, Headline, Title, Text, FontWeight };
