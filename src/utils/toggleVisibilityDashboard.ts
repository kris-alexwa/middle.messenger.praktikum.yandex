export function toggleDashboard(dashboard: string) {
  if (dashboard) {
    document.querySelector(`#${dashboard}`)!.classList.toggle('dashboard-visible');
  }
}
