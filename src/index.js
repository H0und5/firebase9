import { initializeApp } from 'firebase/app';

import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where, 
  orderBy, serverTimestamp,
  getDoc, updateDoc,
} from 'firebase/firestore';

import {
  getAuth
} from 'firebase/auth';

// config credentials
const firebaseConfig = {
  apiKey: "AIzaSyA0QeL9lAeRtzFgHWrkxkukykI7q7NVvx0",
  authDomain: "fir-9-41660.firebaseapp.com",
  projectId: "fir-9-41660",
  storageBucket: "fir-9-41660.appspot.com",
  messagingSenderId: "576339317768",
  appId: "1:576339317768:web:2aa6d17a60c406a996adbd"
};


// init firebase app
initializeApp(firebaseConfig);


// init services
const db = getFirestore();
const auth = getAuth();

// collections ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy('createdAt'))

// get collection data
onSnapshot(q, (snapshot) => {
  let books = [];

  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  
  console.log(books)
})


// adding documents functionality
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // firestore function, addDoc, takes a collection as argument, then passes an object, addDoc is asynchrononous
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  })
    .then(() => {
      addBookForm.reset();
    })

})

// deleting document functionality
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // firebase doc function, which accesses a specific document, takes 3 arguments
  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset();
    });


});

// get a single document
const docRef = doc(db, 'books', 'GFV9UZWUPdY88bmdq4lF');

getDoc(docRef)
  .then((doc) => {
    console.log(doc.data(), doc.id)
  })

  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  })


// updating a document

const updateBookForm = document.querySelector('.update');

updateBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateBookForm.id.value);

  updateDoc(docRef, {
    title: 'title update',
  })
    .then(() => {
      updateBookForm.reset();
    })
  

})