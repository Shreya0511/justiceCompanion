import Cookie from 'js-cookie';

const getCookies =  (cookieName) => {
   return Cookie.get(cookieName);
};

export default getCookies;