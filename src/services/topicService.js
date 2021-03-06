import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const collectionName = "topics"

const collectionRef = collection(db, collectionName)

export const topicService = {
    getAll,
    getArticleOfTopic,
    create,
    addArticle,
    updateArticle,
    delete: _delete,
    deleteArticle: deleteArticle,
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

function updateArticle(topicId, obj) {
    const docRef = doc(db, "topics", topicId, "articles", obj.id);

    return new Promise((resolve, reject) => {
        updateDoc(docRef, obj)
            .then(() => {
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function _delete(topicId) {
    const docRef = doc(db, "topics", topicId);

    return new Promise((resolve, reject) => {
        deleteDoc(docRef)
            .then(() => {
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function deleteArticle(topicId, articleId) {
    const docRef = doc(db, "topics", topicId, "articles", articleId);

    return new Promise((resolve, reject) => {
        deleteDoc(docRef)
            .then(() => {
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}