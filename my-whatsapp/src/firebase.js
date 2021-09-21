import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAlG9nGQyi1bQVb3rUfgDbyjm5sszEEnAM",
    authDomain: "my-whatsapp-29d46.firebaseapp.com",
    projectId: "my-whatsapp-29d46",
    storageBucket: "my-whatsapp-29d46.appspot.com",
    messagingSenderId: "36588857331",
    appId: "1:36588857331:web:7aea3d348fe5d772679486",
    measurementId: "G-SKXRC990MS"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebaseApp.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export  {auth,provider};
  export default db;
  