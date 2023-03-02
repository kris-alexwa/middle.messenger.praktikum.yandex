export function showPopup(popup: string) {
  if (popup) {
        document.querySelector(`#${popup}`)!.classList.add('popup-wrapper__visible');
  }
}

export function hidePopup(popup: string) {
  if (popup) {
        document.querySelector(`#${popup}`)!.classList.remove('popup-wrapper__visible');
  }
}
