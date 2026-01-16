const isNameValid = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
const isEmailVaild = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isPasswordVaild = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/


export const checkValidData = (data) => {
    const {name, email, password} = data
    
    if(name !== undefined && !isNameValid.test(name)){
        return "Not a valid User name"
    }

    if(!isEmailVaild.test(email)){
        return "Not a valid email"
    }

    if(!isPasswordVaild.test(password)){
        return "Not a valid password"
    }

    return null
}
