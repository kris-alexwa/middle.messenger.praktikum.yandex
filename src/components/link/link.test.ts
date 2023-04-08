import { expect } from 'chai';
import sinon from 'sinon';
import { BaseLink } from './link';
import Router from '../../infractructure/Router';
import profileIconActive from '../../assets/icons/profile-active.svg';

describe('Link component', () => {
  let label = '';
  let icon = '';
  const to = '/';
  const iconAlt = 'Изображение';
  const callback = sinon.stub();

  // @ts-ignore
  const router = { go: callback } as typeof Router;

  beforeEach(() => {
    callback.reset();
    label = '';
    icon = '';
  });

  it('should render with label', () => {
    new BaseLink({ to, label, router });
  });

  it('should render with icon', () => {
    icon = profileIconActive;

    new BaseLink({
      to, icon, iconAlt: 'Изображение', router,
    });
  });

  it('should render passed label', () => {
    label = 'Войти';

    const link = new BaseLink({ to, label, router });

    expect(link.element.textContent?.trim()).to.eq(label);
  });

  it('should render passed icon and iconAlt', () => {
    icon = '/';

    const link = new BaseLink({
      to, label, icon, iconAlt, router,
    });

    expect(link.element.querySelector('img')?.getAttribute('src')).to.eq(icon);
    expect(link.element.querySelector('img')?.getAttribute('alt')).to.eq(iconAlt);
  });

  it('should call Router.go with passed route on click', () => {
    label = 'Войти';

    // @ts-ignore
    const link = new BaseLink({ to, label, router });

    link.element?.click();

    expect(callback.calledWith(to)).to.eq(true);
  });
});
