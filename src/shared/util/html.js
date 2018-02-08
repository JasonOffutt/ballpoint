const FONT_SIZES_BY_CLASS_NAME = {
  'ql-huge': '32px',
  'ql-large': '18px',
  'ql-small': '10px',
};

const normalizeElement = (className, element) => {
  element.style.fontSize = FONT_SIZES_BY_CLASS_NAME[className];
  element.removeAttribute('class');
};

const removeClassName = (className, container) => {
  container
    .querySelector(`.${className}`)
    .forEach(el => normalizeElement(className, el));
};

export const normalizeEditorHtml = (html) => {
  const container = document.createElement('div');

  container.innerHTML = html;
  removeClassName('ql-huge');
  removeClassName('ql-large');
  removeClassName('ql-small');
};
