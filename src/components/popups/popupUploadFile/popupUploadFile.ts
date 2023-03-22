import Block from '../../../infractructure/Block';
import template from './popupUploadFile.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { UploadFileForm } from '../../uploadFileForm/uploadFileForm';
import UploadFileInput from '../../uploadFileForm/components/uploadFileInput/uploadFileInput';
import ProfileController from '../../../infractructure/controllers/ProfileController';

export class PopupUploadFile extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Поменять',
    });

    this.children.uploadInput = new UploadFileInput({});

    this.children.uploadFileForm = new UploadFileForm({
      submitButton: this.children.activeButton,
      input: this.children.uploadInput,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          const { value } = this.children.uploadInput as UploadFileInput;
          if (value) {
            const data = new FormData();
            data.append('avatar', value[0]);

            await ProfileController.changeUserAvatar(data);

            hidePopup('upload-file');

            (this.children.uploadInput as UploadFileInput).setValue('');
          }
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
