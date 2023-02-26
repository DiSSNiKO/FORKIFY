function toFraction(int) {
    const strint = int.toString();
    let fractionPart = '';
    let wholePart = '';
    let pointIndex = 0;
    if (strint.includes('.')) {
        for (const char of strint) {
            if (char === '.') {
                break;
            }
            pointIndex++;
        }
        fractionPart = strint.slice(pointIndex + 1);
        for (let i = 0; i < pointIndex; i++) {
            wholePart += strint[i];
        }
        return `${wholePart !== '0' ? wholePart : ""} ${fractionPart}/${10 ** fractionPart.length}`;
    } else {
        return int;
    }
}

export { toFraction };