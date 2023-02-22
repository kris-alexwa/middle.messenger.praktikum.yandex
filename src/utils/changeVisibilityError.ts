export function showError(idError: string, idInput: string) {
    document.querySelector(idError)!.classList.add('input-error-message_visible');
    document.querySelector(idInput)!.classList.add('error-text');
}

export function hideError(idError: string, idInput: string) {
    document.querySelector(idError)!.classList.remove('input-error-message_visible');
    document.querySelector(idInput)!.classList.remove('error-text');
}
