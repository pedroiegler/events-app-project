import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";
import { LoginButton, Dropdown, DropdownItem } from "../styles";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const UserProfile = ({ wallet, setWallet }) => {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  if (!user) {
    return (
      <LoginButton onClick={handleLogin}>
        <FaGoogle size={15} style={{ marginRight: "10px" }} />
        Login com Google
      </LoginButton>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="User" style={{ width: "45px", height: "45px", borderRadius: "50%", marginLeft: "20px" }} />
        ) : (
          <HiOutlineUserCircle size={45} />
        )}
      </div>
      {dropdownOpen && (
        <Dropdown>
          <DropdownItem>{user.displayName || "Usuário"}</DropdownItem>
          <DropdownItem>Carteira: {parseFloat(wallet).toFixed(2)}</DropdownItem>
          <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
        </Dropdown>
      )}
    </div>
  );
};

export default UserProfile;