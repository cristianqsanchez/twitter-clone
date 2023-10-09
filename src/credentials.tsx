// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpcuWoFxKleUT_7nfrnh4f_YWGI_XaEa0',
  authDomain: 'restaurantjuana-18908.firebaseapp.com',
  projectId: 'restaurantjuana-18908',
  storageBucket: 'restaurantjuana-18908.appspot.com',
  messagingSenderId: '793005470666',
  appId: '1:793005470666:web:418329be94990c8d5e9533',
  measurementId: 'G-CJ8RSY7JZ5'
}

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig)
export const db = getFirestore()
export default appFirebase
