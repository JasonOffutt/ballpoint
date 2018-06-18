import colors from '../../../public/colors.json';

const FONT_SIZE_HUGE = 'ql-size-huge';
const FONT_SIZE_LARGE = 'ql-size-large';
const FONT_SIZE_SMALL = 'ql-size-small';

const FONT_SIZES_BY_CLASS_NAME = {
  [FONT_SIZE_HUGE]: '32px',
  [FONT_SIZE_LARGE]: '18px',
  [FONT_SIZE_SMALL]: '10px',
};

const normalizeElement = (className, element) => {
  // eslint-disable-next-line no-param-reassign
  element.style.fontSize = FONT_SIZES_BY_CLASS_NAME[className];
  element.removeAttribute('class');
};

const removeClassName = (className, container) => {
  container
    .querySelectorAll(`.${className}`)
    .forEach(el => normalizeElement(className, el));
};

export const normalizeHtml = (html) => {
  const container = document.createElement('div');

  container.innerHTML = html;
  removeClassName(FONT_SIZE_HUGE, container);
  removeClassName(FONT_SIZE_LARGE, container);
  removeClassName(FONT_SIZE_SMALL, container);
  return container.querySelector('.ql-editor').innerHTML;
};

export const TOOLBAR_OPTIONS = [
  {
    size: [
      'small',
      false,
      'large',
      'huge',
    ],
  },
  {
    color: colors,
  },
  'bold',
  'italic',
  'underline',
  'strike',
  {
    align: [
      false,
      'center',
      'right',
      'justify',
    ],
  },
  {
    list: 'ordered',
  },
  {
    list: 'bullet',
  },
];
