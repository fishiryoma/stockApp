import Swal from "sweetalert2";

export function popupMsg(title, text = "", icon = "error") {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: 1700,
    showConfirmButton: false,
  });
}

export function pupupMsgSmall(title, icon = "success", position = "top-end") {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return Toast.fire({
    icon: icon,
    title: title,
  });
}

export function ensurePopup(title) {
  return Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
}
