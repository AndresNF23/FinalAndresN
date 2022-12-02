import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

//Al profesor le salen los mismos errores

const firebaseConfig = {
  apiKey: "AIzaSyCpFB-qFfbfbv3aAeMx3CWa9jmfdM1meV0",
  authDomain: "registroinstagram-d6b48.firebaseapp.com",
  projectId: "registroinstagram-d6b48",
  storageBucket: "registroinstagram-d6b48.appspot.com",
  messagingSenderId: "515603409368",
  appId: "1:515603409368:web:ee1b8ac84a9f4decba2aad"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const usersRef = collection(db,"usuarios");

  export const queryUser = async ({
    email,
    clave
  }:{
    email: string;
    clave: string;
  }) => {
    try {
        const q = query(usersRef, where("email", "==", email),where("clave","==",clave));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        querySnapshot.forEach((doc:any) => {
            console.log(doc.id,"=>",doc.data());
        });
        
        return !querySnapshot.empty;
    } catch (error) {
        return false;
    }
  }

  export const addUser = async ({
    email,
    clave
  }:{
    email: string;
    clave: string;
  }) => {
    try {
        if(email != "" && clave != ""){
          const docRef = await addDoc(collection(db,"usuarios"),{
              email,
              clave
          });
          return true;
        }
    } catch (error) {
        return false;
    }
  }

export const addPost = async ({
  username,
  post,
  usercomment,
  hashtag,
}:{
  username: string;
  post: string;
  usercomment: string;
  hashtag: string,
}) => {
  try {
    await addDoc(collection(db,"uploadPost"), {
      username: username,
      ubication: "Colombia",
      profilepic: "https://th.bing.com/th/id/R.fe3c0438ae8360705d18e33e8ef007c0?rik=I01mT9fSSgPJ8g&pid=ImgRaw&r=0.jpg",
      post: post,
      usercomment : usercomment,
      hashtag: hashtag,
      numbercomments:"Ver los 25 comentarios",
      date: "hace 1 minuto",
    });
    return true;
  }catch (error) {
  }
  }

  export const getPost = async () => {
    try{
      const uploadPost = [];
      const querySnapshot = await getDocs(collection(db, 'uploadPost'));
      querySnapshot.forEach((post) => {
        uploadPost.push(post.data());
        console.log(post.data());
      });

      return uploadPost;
    }catch (error) {
      console.error(error);
      alert('Error, intente nuevamente');
    }
    }