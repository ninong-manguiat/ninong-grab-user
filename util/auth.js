import axios from "axios";

const API_KEY = "AIzaSyCLMHif6cuDU8xgbvBNpBHMC218KFdjueo"
const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
const SIGN_UP_MODE = 'signUp'
const SIGN_IN_MODE = 'signInWithPassword'
const KEY = '?key='

export function createUser(email, password){
    return authenticate(true, email, password)
}

export function signInUser(email, password){
    return authenticate(false, email, password)
}

export async function authenticate(isSignUp, email, password){
    const concat = API_URL + (isSignUp ? SIGN_UP_MODE : SIGN_IN_MODE) + KEY + API_KEY
    console.log('concat', concat)
    console.log('email', email)
    console.log('password', password)

    const res = await axios.post(
        concat,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )

    const token = res.data.idToken

    return token
}