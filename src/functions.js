/// Generate random color
export const randomColor = () => {
    const symbols = '0123456789ABCDEF';
    let color = '0x';
    for (let i = 0; i < 6; i++) {
        color = color + symbols[Math.floor(Math.random() * 16)]
    }
    return (color);
};
// Generate random number from range
export const randomNumberForRange = (start, end) => {
    const range = end - start;
    const random = Math.floor(Math.random() * range);
    return start + random;
};

// remove graphics from stage
export const removeGraphic = event => {
    const target = event.target;
    target.parent.removeChild(target);
};


/// Change the tint of all graphics with same type
export const changeColor = event => {
    const target = event.target;
    const color = target.color;
    const type = target.type;
    target.parent.children.map(figure => {
        if (figure.type == type) {
            figure.tint = color;
            figure.color = color;
        }
    });
};
/// Decrease value by 1
export const onDecrementValue = (target) => {
    let value = parseInt(target.value);
    value = (isNaN(value) || value <= 0) ? 0 : value - 1;
    target.value = value;
    const e = new Event('change');
    target.dispatchEvent(e);
};
/// Increase value by 1
export const onIncrementValue = (target) => {
    let value = parseInt(target.value);
    value = isNaN(value) ? 0 : value + 1;
    target.value = value;
    const e = new Event('change');
    target.dispatchEvent(e);
};