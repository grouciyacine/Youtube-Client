import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC8Vf0caK2sWFS44BhnMchJKMc23Q5_VkY",
  authDomain: "clone1-69a4f.firebaseapp.com",
  projectId: "clone1-69a4f",
  storageBucket: "clone1-69a4f.appspot.com",
  messagingSenderId: "639196583962",
  appId: "1:639196583962:web:edef8f70f19998cf4219a3",
  measurementId: "G-BSW1Q9WWC9"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);
