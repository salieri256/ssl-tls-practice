import type { ReadonlyByteArray } from './bytearray.ts'
import { ksa } from './ksa.ts'
import { prga } from './prga.ts'
import { xor } from './xor.ts'

const byteToString = (
  byte: ReadonlyByteArray,
): string => {
  const textDecoder = new TextDecoder()
  const str = textDecoder.decode(byte)
  return str
}

const byteToHexString = (
  byte: ReadonlyByteArray,
): string => {
  const hexString = Buffer.from(byte).toString('hex')
  return hexString
}

const stringToByte = (
  str: string,
): ReadonlyByteArray => {
  const textEncoder = new TextEncoder()
  const byte = textEncoder.encode(str)
  return byte
}

const hexStringToByte = (
  hexString: string,
): ReadonlyByteArray => {
  const byte = Uint8Array.from(Buffer.from(hexString, 'hex'))
  return byte
}

const generatePseudoRandom = (
  key: string,
  length: number,
): ReadonlyByteArray => {
  const textEncoder = new TextEncoder()
  const keybyte = textEncoder.encode(key)
  const S = ksa(keybyte)
  const random = prga(S, length)
  return random
}

export const encryptStringToHex = (
  plaintext: string,
  key: string,
): string => {
  const plainbyte = stringToByte(plaintext)
  const random = generatePseudoRandom(key, plainbyte.length)
  const cipherbyte = xor(plainbyte, random)
  const hexString = byteToHexString(cipherbyte)
  return hexString
}

export const decryptHexToString = (
  hexString: string,
  key: string,
): string => {
  const cipherbyte = hexStringToByte(hexString)
  const random = generatePseudoRandom(key, cipherbyte.length)
  const plainbyte = xor(cipherbyte, random)
  const plaintext = byteToString(plainbyte)
  return plaintext
}
