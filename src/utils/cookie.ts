interface CookieOpt {
  path?: string;
  domain?: string;
  expires?: Date | string;
  'max-age'?: number;
  secure?: 'secure';
  samesite?: 'strict' | 'lax';
  [key: string]: string | number | Date | undefined; // 인덱스 시그니처 추가
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

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];

    if (optionValue) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

export { setCookie, deleteCookie };
