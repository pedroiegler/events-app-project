import Swal from "sweetalert2";

const UserEventsModal = (userEvents) => {
  if (userEvents.length === 0) {
    Swal.fire("Nenhum evento encontrado!", "Você ainda não tem eventos criados.", "info");
    return;
  }

  const eventsListHtml = userEvents.map(event => `
    <div style="margin-bottom: 10px;">
      <strong>${event.name}</strong><br />
      Categoria: ${event.category}<br />
      Meta: ${event.meta}<br />
      ${event.image ? `<img src="${event.image}" style="width: 100px; height: auto;" />` : ''}
    </div>
  `).join("");

  Swal.fire({
    title: "Meus Eventos",
    html: `<div style="max-height: 400px; overflow-y: auto;">${eventsListHtml}</div>`,
    showCloseButton: true,
    focusConfirm: false,
  });
};

export default UserEventsModal;