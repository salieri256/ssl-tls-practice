import { decrypt } from "./vigenere.ts" 

const args = process.argv.slice(2)
const cipherText = args[0]
const key = args[1]
const plainText = decrypt(cipherText, key)
console.log(plainText)
