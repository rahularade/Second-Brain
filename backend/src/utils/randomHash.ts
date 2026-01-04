export default function randomHash(len: number = 21) {
    const options = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

    let hash = "";

    for (let i = 0; i < len; i++) {
        hash += options[Math.floor(Math.random() * options.length)];
    }

    return hash;
}