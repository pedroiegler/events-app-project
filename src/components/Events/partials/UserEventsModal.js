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

  const eventsListHtml = userEvents.map(event => {
    const percentage = ((event.meta_current / event.meta) * 100).toFixed(2);
    
    let status = "Não Iniciado";
    if (event.meta_current > 0 && event.meta_current < event.meta) {
      status = "Em Progresso";
    } else if (event.meta_current >= event.meta) {
      status = "Concluído";
    }
  
    return `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); display: flex; gap: 20px; align-items: center;">
        <div style="flex-shrink: 0; margin-right: 15px;">
          ${event.image ? `<img src="${event.image}" style="width: 100px; height: 100px; object-fit: cover; object-position: center; border-radius: 8px;" />` : ''}
        </div>
        <div style="flex-grow: 1; text-align: left;">
          <strong style="font-size: 18px; color: #333; display: block; margin-bottom: 5px;">${event.name}</strong>
          <span style="font-size: 14px; color: #777; display: block;">Categoria: ${event.category}</span>
          <span style="font-size: 14px; color: #777; display: block;">Meta: R$${event.meta}</span>
          <span style="font-size: 14px; color: #777; display: block;">Arrecadado: R$${event.meta_current}</span>
          <span style="font-size: 14px; color: #777; display: block;">Apoios: ${event.supportersCount || 0}</span>
          <span style="font-size: 14px; color: #777; display: block;">Meta Atingida: ${percentage}%</span>
          <span style="font-size: 14px; color: ${status === "Concluído" ? "#28a745" : status === "Em Progresso" ? "#ffc107" : "#dc3545"}; font-weight: bold; display: block; margin-top: 10px;">
            Status: ${status}
          </span>
        </div>
      </div>
    `;
  }).join("");  
  
  Swal.fire({
    title: "Meus Eventos",
    html: `<div style="max-height: 500px; overflow-y: auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${eventsListHtml}</div>`,
    showCloseButton: true,
    showConfirmButton: false,
    focusConfirm: false,
    customClass: {
      title: 'custom-title',
      confirmButton: 'custom-confirm-btn',
    },
    width: '530px'
  });
};

export default UserEventsModal;