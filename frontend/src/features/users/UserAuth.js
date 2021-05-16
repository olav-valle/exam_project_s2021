import jwt_decode from 'jwt-decode';

export const tokenParse = () => {

    const decoded = decodeToken();

    const userAuths = decoded.authorities.map(auth => auth.authority);
    console.log("user authorities: ", userAuths);

    const userRole = userAuths.find(auth => auth.includes("ROLE"))

    console.log("User role: ", userRole);

    const username = decoded.sub;

    const exp = decoded.exp;
    const isExpired = isTokenExpired();

    const user = {
        username: username,
        authorities: userAuths,
        role: userRole,
        exp: exp,
        isTokenValid: isExpired
    }

    return user;
}

export const isTokenExpired = () => {
    const token = decodeToken();
    //our dumb backend uses Epoc seconds, not milliseconds for some reason, so we have to add 4 0's.
    const exp = (token.exp)*1000;
    console.log("Token exp:", exp);
    const now = Date.now();
    console.log("Current time: ", now);
    return (now < exp);

}

const decodeToken = () => {
    const token = localStorage.getItem("Token");
    console.log("Raw token:", token)
    const decoded = jwt_decode(token);
    console.log("Decoded token:", decoded);
    return decoded;
}


