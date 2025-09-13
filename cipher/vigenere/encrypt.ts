import { encrypt } from "./vigenere.ts" 

const args = process.argv.slice(2)
const plainText = args[0]
const key = args[1]
const cipherText = encrypt(plainText, key)
console.log(cipherText)
