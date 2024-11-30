import { useEffect } from "react";
import Swal from "sweetalert2";

const CreateEventModal = ({ onClose, onCreateEvent }) => {
  useEffect(() => {
    Swal.fire({
      title: "Criar Novo Evento",
      html: `
        <div><input type="text" id="name" class="swal2-input" placeholder="Nome do Evento"></div>
        <div style="margin-top: 10px;">
          <select id="category" class="swal2-input">
            <option value="Tecnologia">Tecnologia</option>
            <option value="Esporte">Esporte</option>
            <option value="Música">Música</option>
            <option value="Entretenimento">Entretenimento</option>
          </select>
        </div>
        <div><input type="date" id="date" class="swal2-input"></div>
        <div><input type="time" id="time" class="swal2-input"></div>
        <div><input type="text" id="meta" class="swal2-input" placeholder="Meta"></div>
        <div><input type="number" id="min_support" class="swal2-input" placeholder="Valor mínimo de apoio"></div>
        <div><input type="number" id="goal_percentage" class="swal2-input" placeholder="Percentual da meta para concluir"></div>
        <div style="margin-top: 10px;">
          <p style="font-size: 10px;">Tamanhos ideais: 300x400 ou 600x800.</p>
          <input type="url" id="image" class="swal2-input" style="margin-top: 5px;" placeholder="URL da Imagem">
        </div>
        <div style="margin-top: 10px; text-align: left;">
          <label style="font-size: 14px !important;">
            <input type="checkbox" id="is_ticketed" style="margin-right: 10px;">
            Este evento será na modalidade de ingresso?
          </label>
        </div>
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
        const meta = parseFloat(Swal.getPopup().querySelector("#meta").value);
        const image = Swal.getPopup().querySelector("#image").value;
        const minSupport = parseFloat(Swal.getPopup().querySelector("#min_support").value);
        const goalPercentage = parseFloat(Swal.getPopup().querySelector("#goal_percentage").value);
        const isTicketed = Swal.getPopup().querySelector("#is_ticketed").checked;
      
        if (!name || !category || !date || !time || isNaN(meta) ||
          isNaN(minSupport) || isNaN(goalPercentage)
        ) {
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
          minSupport,
          goalPercentage,
          isTicketed,
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      onClose();
    });
  }, [onCreateEvent, onClose]);

  return null;
};

export default CreateEventModal;