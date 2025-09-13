import * as squareJson from './square.json' with { type: 'json' }

type Square = typeof squareJson
type SquareKey = keyof Square
interface SquareJson {
  default: Square
}

const defaultSquare = (squareJson as unknown as SquareJson).default

export const encrypt = (
  plainText: string,
  key: string,
  square: Square = defaultSquare,
  base: SquareKey = 'a'
): string => {
  const plainArray = [...plainText] as SquareKey[]
  const cipherArray = plainArray.map((char, index) => {
    const keyChar = key.charAt(index % key.length)
    const baseIndex = square[base].indexOf(keyChar)
    const cipherChar = square[char][baseIndex]
    return cipherChar
  })
  const encryptedText = cipherArray.join('')
  return encryptedText
}

export const decrypt = (
  cipherText: string,
  key: string,
  square: Square = defaultSquare,
  base: SquareKey = 'a'
): string => {
  const cipherArray = [...cipherText] as SquareKey[]
  const plainArray = cipherArray.map((char, index) => {
    const keyChar = key.charAt(index % key.length)
    const baseIndex = square[base].indexOf(keyChar)
    for (const [k, subArray] of Object.entries(square)) {
      if (subArray[baseIndex] === char) return k
    }
  })
  const plainText = plainArray.join('')
  return plainText
}
