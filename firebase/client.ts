// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjyPTRmCRy9QNpAsIvWO6QWdei-GWa5D4',
  authDomain: 'react-14a95.firebaseapp.com',
  databaseURL: 'https://react-14a95.firebaseio.com',
  projectId: 'react-14a95',
  storageBucket: 'react-14a95.appspot.com',
  messagingSenderId: '64854553186',
  appId: '1:64854553186:web:7a79f6c9765f75448dd73b',
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
