function decodeJwtToken() {
    const token = sessionStorage.getItem('jwttoken');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload;
      console.log(payload);
    }
    return null;
}
export default decodeJwtToken