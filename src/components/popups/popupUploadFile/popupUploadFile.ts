import Block from '../../../infractructure/Block';
import template from './popupUploadFile.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';

export class PopupUploadFile extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Поменять',
      events: {
        click: () => {
          hidePopup('upload-file');
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
