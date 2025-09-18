import type { ReadonlyByteArray } from './bytearray.ts'
import { ksa } from './ksa.ts'
import { generateRandomArray, generateRandomStream } from './prga.ts'
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

const generateRandomArrayFromKey = (
  key: string,
  length: number,
): ReadonlyByteArray => {
  const keybyte = stringToByte(key)
  const S = ksa(keybyte)
  const random = generateRandomArray(S, length)
  return random
}

const generateRandomStreamFromKey = (
  key: string,
) => {
  const keybyte = stringToByte(key)
  const S = ksa(keybyte)
  const stream = generateRandomStream(S)
  return stream
}

export const encryptStringToHex = (
  plaintext: string,
  key: string,
): string => {
  const plainbyte = stringToByte(plaintext)
  const random = generateRandomArrayFromKey(key, plainbyte.length)
  const cipherbyte = xor(plainbyte, random)
  const hexString = byteToHexString(cipherbyte)
  return hexString
}

export const generateEncryptStream = function* (
  key: string,
) {
  const stream = generateRandomStreamFromKey(key)
  let hexString = ''
  while (true) {
    const plaintext: string = yield hexString
    const [plainbyte, ..._] = stringToByte(plaintext)
    const random = stream.next().value
    const cipherbyte = plainbyte ^ random
    hexString = byteToHexString(new Uint8Array([cipherbyte]))
  }
}

export const decryptHexToString = (
  hexString: string,
  key: string,
): string => {
  const cipherbyte = hexStringToByte(hexString)
  const random = generateRandomArrayFromKey(key, cipherbyte.length)
  const plainbyte = xor(cipherbyte, random)
  const plaintext = byteToString(plainbyte)
  return plaintext
}
