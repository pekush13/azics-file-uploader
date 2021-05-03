import { uploadFile } from './index';

export function highlight(target) {
  target.classList.add('afu__dragover');
}

export function unHighlight(ev, target) {
  target.classList.remove('afu__dragover');
  if (ev.type === 'drop') {
    uploadFile(ev.dataTransfer.files);
  }
}
