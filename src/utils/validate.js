export const checkValidData = (email, password) => {
    const isEmailVaild = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordVaild = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(password);

    if(!isEmailVaild) return "Not a valid email";
    if(!isPasswordVaild) return "Not a valid password";

    return null;
}