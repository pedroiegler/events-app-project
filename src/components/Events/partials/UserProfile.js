import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import { app } from "../../../services/firebase"; 
import LoginButton from './LoginButton';
import UserDropdown from './UserDropdown';
import UserEventsModal from './UserEventsModal';

const db = getFirestore(app);

const UserProfile = ({ wallet, setWallet }) => {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const provider = new GoogleAuthProvider();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (user) {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserEvents(eventsList);
      }
    };

    fetchUserEvents();
  }, [user]);

  if (!user) {
    return <LoginButton onClick={handleLogin} />;
  }

  return (
    <div style={{ position: "relative" }}>
      <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <img src={user.photoURL} alt="User" style={{ width: "45px", height: "45px", borderRadius: "50%", marginLeft: "20px" }} />
      </div>
      {dropdownOpen && (
        <UserDropdown 
          user={user} 
          wallet={wallet} 
          onShowEvents={() => UserEventsModal(userEvents)} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
};

export default UserProfile;