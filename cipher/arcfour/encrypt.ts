import { encryptStringToHex } from './arcfour.ts'

const args = process.argv.slice(2)
const plaintext = args[0]
const key = args[1]
const hexString = encryptStringToHex(plaintext, key)
console.log(hexString)
