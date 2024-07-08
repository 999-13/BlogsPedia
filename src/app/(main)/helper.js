// helper.js
export function hasToken() {
    if(typeof window !== 'undefined'){
    const token = localStorage.getItem('your_token_key');
    return token !== null;
}return false;
}  