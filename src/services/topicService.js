import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const collectionName = "topics"

const collectionRef = collection(db, collectionName)

export const topicService = {
    getAll,
    getArticleOfTopic,
    create,
    addArticle
    // update,
    // delete: _delete,
};

function getAll() {
    return new Promise((resolve, reject) => {
        getDocs(collectionRef)
            .then((data) => {
                resolve(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function getArticleOfTopic(id) {
    // let docRef = doc(db, 'topics', id)
    const subColRef = collection(db, "topics", id, "articles");

    return new Promise((resolve, reject) => {
        getDocs(subColRef)
            .then((data) => {
                resolve(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function create(obj) {
    return new Promise((resolve, reject) => {
        addDoc(collectionRef, obj)
            .then((obj) => {
                resolve(obj.id)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function addArticle(topicId, obj) {
    const subColRef = collection(db, "topics", topicId, "articles");

    return new Promise((resolve, reject) => {
        addDoc(subColRef, obj)
            .then((obj) => {
                resolve(obj.id)
            })
            .catch((err) => {
                reject(err)
            })
    })
}