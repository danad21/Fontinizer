const variantCountInput = document.getElementById('variantCount');
const variantCountValue = document.getElementById('variantCountValue');
const templatePreview = document.getElementById('templatePreview');
const generateTemplateButton = document.getElementById('generateTemplate');

const versionLabels = [
  document.getElementById('appVersion'),
  document.getElementById('footerVersion')
];

const glyphSets = {
  latin: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
  digits: '0 1 2 3 4 5 6 7 8 9',
  punctuation: '.,:;!?()[]{}-+*/=<>',
  math: '\\alpha \\beta \\gamma \\Delta \\Sigma \\int \\sum \\rightarrow \\infty'
};

const getSelectedGlyphs = () => {
  const selections = Array.from(document.querySelectorAll('input[type="checkbox"]'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const glyphs = selections.flatMap((value) => glyphSets[value].split(' '));
  const customGlyphs = document.getElementById('customGlyphs').value.trim();

  if (customGlyphs) {
    glyphs.push(...customGlyphs.split(/\s+/));
  }

  return glyphs.filter(Boolean);
};

const updateVariantCount = () => {
  variantCountValue.textContent = variantCountInput.value;
};

const renderTemplatePreview = () => {
  const glyphs = getSelectedGlyphs();

  templatePreview.innerHTML = '';

  if (glyphs.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.textContent = 'Select at least one glyph set to generate a preview.';
    templatePreview.appendChild(placeholder);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'template-grid';

  glyphs.forEach((glyph) => {
    const cell = document.createElement('div');
    cell.className = 'template-cell';
    cell.innerHTML = `\n      <div>${glyph}</div>\n      <small>${variantCountInput.value} variants</small>\n    `;
    grid.appendChild(cell);
  });

  templatePreview.appendChild(grid);
};

const initialize = () => {
  updateVariantCount();

  versionLabels.forEach((label) => {
    if (label) {
      label.textContent = window.fontinizer?.version ?? '0.1.0';
    }
  });
};

variantCountInput.addEventListener('input', () => {
  updateVariantCount();
});

generateTemplateButton.addEventListener('click', () => {
  renderTemplatePreview();
});

initialize();
