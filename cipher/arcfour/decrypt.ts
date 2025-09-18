import { decryptHexToString } from './arcfour.ts'

const args = process.argv.slice(2)
const hexString = args[0]
const key = args[1]
const plaintext = decryptHexToString(hexString, key)
console.log(plaintext)
