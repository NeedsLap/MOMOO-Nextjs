interface CookieOpt {
  path?: string;
  domain?: string;
  expires?: Date | string;
  'max-age'?: number;
  secure?: 'secure';
  samesite?: 'strict' | 'lax';
}

const setCookie = (name: string, value: string, options: CookieOpt = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const [key, value] of Object.entries(options)) {
    updatedCookie += `; ${key}=${value}`;
  }

  document.cookie = updatedCookie;
};

const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

export { setCookie, deleteCookie };
