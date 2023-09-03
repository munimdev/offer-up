import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
apiKey: "AIzaSyAcZ1RA36KezAnFWysTVa4MxIU7cXyZHLs",
authDomain: "bargainex-a2e87.firebaseapp.com",
projectId: "bargainex-a2e87",
storageBucket: "bargainex-a2e87.appspot.com",
messagingSenderId: "526306599602",
appId: "1:526306599602:web:f5d2e57bf22016ce92dfab",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// apiKey: "AIzaSyAcZ1RA36KezAnFWysTVa4MxIU7cXyZHLs",
// authDomain: "bargainex-a2e87.firebaseapp.com",
// projectId: "bargainex-a2e87",
// storageBucket: "bargainex-a2e87.appspot.com",
// messagingSenderId: "526306599602",
// appId: "1:526306599602:web:f5d2e57bf22016ce92dfab",


// import { FirebaseOptions, initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// const firebaseConfig: FirebaseOptions = {
//   apiKey: "AIzaSyAcZ1RA36KezAnFWysTVa4MxIU7cXyZHLs",
//   authDomain: "bargainex-a2e87.firebaseapp.com",
//   projectId: "bargainex-a2e87",
//   storageBucket: "bargainex-a2e87.appspot.com",
//   messagingSenderId: "526306599602",
//   appId: "1:526306599602:web:f5d2e57bf22016ce92dfab",
// };

// const app = initializeApp(firebaseConfig);

// export default app;
