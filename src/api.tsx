import { db } from './credentials'
import { collection, getDoc, getDocs, query, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"

function saveUser () {
    addDoc(collection(db, 'users'), {name})
}