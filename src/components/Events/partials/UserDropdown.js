import React from "react";
import { Dropdown, DropdownItem } from "../styles";

const UserDropdown = ({ user, wallet, onShowEvents, onLogout }) => {
  return (
    <Dropdown>
      <DropdownItem>{user.displayName || "Usuário"}</DropdownItem>
      <DropdownItem>Carteira: {parseFloat(wallet).toFixed(2)}</DropdownItem>
      <DropdownItem onClick={onShowEvents}>Meus Eventos</DropdownItem>
      <DropdownItem onClick={onLogout}>Sair</DropdownItem>
    </Dropdown>
  );
};

export default UserDropdown;