import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {

  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUSer = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUSer);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUSer = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUSer);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google SignIn</button>
          <br />
          <button onClick={handleGithubSignIn}>GitHub SignIn</button>
          <br />
        </div> :
        <button onClick={handleSignOut}>SignOut</button>
      }
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
