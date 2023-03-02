export function toggleDashboard(dashboard: string) {
  if (dashboard) {
    document.querySelector(`#${dashboard}`)!.classList.toggle('chat__dashboard-wrapper_visible');
  }
}
