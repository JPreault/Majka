/**
 * Convertit une couleur RGB/RGBA au format hexadécimal
 *
 * @param {string} rgb Couleur au format RGB/RGBA
 * @returns {string} Couleur au format hexadécimal
 */
export const rgbToHex = (rgb) => {
    const components = rgb.split('(')[1].split(')')[0].replace('/ /g', '').trim().split(',').map(component => parseInt(component));
    return '#' + ((1 << 24) + (components[0] << 16) + (components[1] << 8) + components[2]).toString(16).slice(1);
};

/**
 * Convertit une couleur hexadécimal au format RGBA
 *
 * @param {string} color Couleur au format hexadécimal (avec ou sans le #), RGB ou RGBA
 * @param {number} transparency Valeur de la transparence (A : Alpha) [Valeurs possibles : 0 à 1]
 * @returns {string} Couleur au format RGBA
 */
export const hexToRgb = (color, transparency = 1) => {
    // Suppression du # si c'est une couleur hexadécimal
    if (color[0] === '#') {
        color = color.slice(1);
    }

    const aRgbHex = color.match(/.{1,2}/g);

    const aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
        transparency
    ];

    return 'rgba(' + aRgb.join(',') + ')';
};

/**
 * Eclaircit ou assombrit une couleur
 *
 * @param {string} color Couleur au format hexadécimal (avec ou sans le #), RGB ou RGBA
 * @param {number} amount Valeur en % (positive: La couleur s'éclaircit, négative: La couleur s'assombrit)
 * @returns {string} Couleur au format RGBA
 */
export const lightenDarkerColor = (color, amount) => {
    let a;

    // Récupération de la transparence (couleur RGBA en entrée)
    if (color.split(',')[3]) {
        a = color.split(',')[3].replace(')', '').trim();
    } else {
        a = 1;
    }

    // Couleur RGBA vers Hexadécimal
    if (color.includes('rgb')) {
        color = rgbToHex(color);
    }

    // Suppression du # si c'est une couleur hexadécimal
    if (color[0] === '#') {
        color = color.slice(1);
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    let g = ((num >> 8) & 0x00FF) + amount;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }

    let b = (num & 0x0000FF) + amount;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    return `rgba(${r},${g},${b},${a})`;
};

export const changeThemeColor = (type, color) => {
    switch (type) {
    case 'font':
        document.documentElement.style.setProperty('--color-font', color);
        break;
    case 'theme':
        document.documentElement.style.setProperty('--color-theme', color);
        document.documentElement.style.setProperty('--color-theme-hover', lightenDarkerColor(color, -20));
        break;
    case 'pmr':
        document.documentElement.style.setProperty('--color-pmr', color);
        break;
    }
};

export const changeThemeFont = (font) => {
    document.documentElement.style.setProperty('--font', font);
};
