import Cookie from 'js-cookie';

const removeCookies =  (cookieName) => {
   Cookie.remove(cookieName);
};

export default removeCookies;