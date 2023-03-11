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
        fractionPart = toFractionFloat(strint);
        for (let i = 0; i < pointIndex; i++) {
            wholePart += strint[i];
        }
        const bonkers = fractionPart.split("/");
        const shekvecilebi = weakShekveca(bonkers[0], bonkers[1]);
        return `${wholePart !== '0' ? wholePart : ""} ${shekvecilebi}`;
    } else {
        return int;
    }
}
function toFractionFloat(int){
    const intStr = int.toString().split('.');
    let divideBy = '10';
    for(let i=0;i<intStr[1].split('').length-1;i++){
        divideBy+='0'
    }
    return `${removeTrailingZeroes(intStr[1])}/${divideBy}`
}
function weakShekveca(gasayofi, gamyofi) {
    if(gamyofi===''||gasayofi===''){
        return '';
    }
    const divisors = [2,3,4,5,6,7,8,9];
    let newGasayofi = Number(gasayofi);
    let newGamyofi = Number(gamyofi);
    let continueLoop = true;
    while(continueLoop){
        continueLoop = false;
        for(let divisor of divisors){
            const condition = newGasayofi%divisor===0 && newGamyofi%divisor===0;
            if(condition===true){
                newGamyofi = newGamyofi/divisor;
                newGasayofi = newGasayofi/divisor;
                continueLoop = true;
                break;
            }
        }
    }
    return `${newGasayofi}/${newGamyofi}`
}
function removeTrailingZeroes (str){
    let nonZeroEncountered = false;
    let newstr = '';
    str.split('').forEach((char)=>{
        if(nonZeroEncountered===false&&char!='0'){
            nonZeroEncountered=true;
        }
        if(nonZeroEncountered){
            newstr+=char;
        }
    });
    return newstr
}
const removeWhiteSpace = (str) => {
    let newstr = ''
    for(const char of str){
        if(char!==' '){
            newstr+=char;
        }
    }
    return newstr;
}

export { toFraction, weakShekveca, toFractionFloat, removeWhiteSpace };