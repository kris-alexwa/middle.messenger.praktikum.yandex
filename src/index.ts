import { render } from './utils/render';

window.render = render;

window.addEventListener('DOMContentLoaded', () => {
  render('signInPage');
});
