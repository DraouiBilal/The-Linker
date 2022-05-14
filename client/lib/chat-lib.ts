// program to generate random strings

// declare all characters
const characters ='ABCDEF0123456789';

export function generateAesSecret(length:number = 64) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
