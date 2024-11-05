import Swal from "sweetalert2";

const UserEventsModal = (userEvents) => {
  if (userEvents.length === 0) {
    Swal.fire({
      title: "Nenhum evento encontrado!",
      text: "Você ainda não tem eventos criados.",
      icon: "info",
      customClass: {
          title: 'custom-title',
          confirmButton: 'custom-confirm-btn',
      },
      width: '430px'
    });
    return;
  }

  const eventsListHtml = userEvents.map(event => `
    <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <strong style="font-size: 18px; color: #333;">${event.name}</strong><br />
      <span style="font-size: 14px; color: #777;">Categoria: ${event.category}</span><br />
      <span style="font-size: 14px; color: #777;">Meta: ${event.meta}</span><br />
      ${event.image ? `<img src="${event.image}" style="width: 100px; height: auto; margin-top: 10px; border-radius: 8px;" />` : ''}
    </div>
  `).join("");
  
  Swal.fire({
    title: "Meus Eventos",
    html: `<div style="max-height: 400px; overflow-y: auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${eventsListHtml}</div>`,
    showCloseButton: true,
    showConfirmButton: false,
    focusConfirm: false,
    customClass: {
      title: 'custom-title',
      confirmButton: 'custom-confirm-btn',
    },
    width: '430px'
  });
};

export default UserEventsModal;