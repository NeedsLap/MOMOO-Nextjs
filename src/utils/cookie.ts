interface CookieOpt {
  path?: string;
  domain?: string;
  expires?: Date | string;
  'max-age'?: number;
  secure?: 'secure';
  samesite?: 'strict' | 'lax';
}

const setCookie = (name: string, value: string, options: CookieOpt = {}) => {
  const cookieOpts = {
    path: '/',
    ...options
  };

  if (cookieOpts.expires instanceof Date) {
    cookieOpts.expires = cookieOpts.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.entries(cookieOpts).forEach(([key, v]) => {
    updatedCookie += `; ${key}=${v}`;
  });

  document.cookie = updatedCookie;
};

const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1
  });
};

export { setCookie, deleteCookie };
