import React from "react";
import Swal from "sweetalert2";

const CreateEventModal = ({ onClose, onCreateEvent }) => {
  Swal.fire({
    title: "Criar Novo Evento",
    html: `
      <input type="text" id="name" class="swal2-input" placeholder="Nome do Evento">
      <select id="category" class="swal2-input">
        <option value="Tecnologia">Tecnologia</option>
        <option value="Esporte">Esporte</option>
        <option value="Música">Música</option>
        <option value="Entretenimento">Entretenimento</option>
      </select>
      <input type="date" id="date" class="swal2-input">
      <input type="time" id="time" class="swal2-input">
      <input type="text" id="meta" class="swal2-input" placeholder="Meta">
      <input type="url" id="image" class="swal2-input" placeholder="URL da Imagem">
    `,
    confirmButtonText: "Criar Evento",
    focusConfirm: false,
    showCloseButton: true,
    customClass: {
      title: "custom-title",
      confirmButton: "custom-confirm-btn",
    },
    width: "400px",
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const category = Swal.getPopup().querySelector("#category").value;
      const date = Swal.getPopup().querySelector("#date").value;
      const time = Swal.getPopup().querySelector("#time").value;
      const meta = parseFloat(Swal.getPopup().querySelector("#meta").value); // Converte para número
      const image = Swal.getPopup().querySelector("#image").value;

      if (!name || !category || !date || !time || isNaN(meta)) {
        Swal.showValidationMessage("Por favor, preencha todos os campos corretamente.");
        return;
      }

      const datetime = new Date(`${date}T${time}`);

      return {
        name,
        category,
        datetime,
        meta,
        image,
        meta_current: 0,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onCreateEvent(result.value);
      Swal.fire({
        title: "Sucesso!",
        text: "Evento criado com sucesso.",
        icon: "success",
        showConfirmButton: false,
        customClass: {
          title: "custom-title",
        },
        width: "430px",
      });
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });

  return null;
};

export default CreateEventModal;