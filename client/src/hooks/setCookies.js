import Cookie from 'js-cookie';

const setCookies =  (cookieName, userIn) => {
    Cookie.set(cookieName, userIn, {
        expires : 1,
        secure : true,
        sameSite : 'strict',
        path : '/'
    });
};

export default setCookies;