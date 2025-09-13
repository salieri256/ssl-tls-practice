import * as squareJson from './square.json' with { type: 'json' }

interface Square {
  key: string[]
  sub: {
    [key: string]: string[]
  }
}
interface SquareJson {
  default: Square
}

const defaultSquare = (squareJson as unknown as SquareJson).default

export const encrypt = (
  plainText: string,
  key: string,
  square: Square = defaultSquare,
): string => {
  const plainArray = [...plainText]
  const cipherArray = plainArray.map((char, index) => {
    // 鍵は平文が終わるまで繰り返されるため
    const keyChar = key.charAt(index % key.length)

    // 鍵に対応するアルファベットを返す
    const subIndex = square.key.indexOf(keyChar)
    const cipherChar = square.sub[char][subIndex]
    return cipherChar
  })
  const cipherText = cipherArray.join('')
  return cipherText
}

export const decrypt = (
  cipherText: string,
  key: string,
  square: Square = defaultSquare,
): string => {
  const cipherArray = [...cipherText]
  const plainArray = cipherArray.map((char, index) => {
    // 鍵は平文が終わるまで繰り返されるため
    const keyChar = key.charAt(index % key.length)

    // 鍵に対応する置換前のアルファベットを返す
    const subIndex = square.key.indexOf(keyChar)
    for (const [subHead, subBody] of Object.entries(square.sub)) {
      if (subBody[subIndex] === char) return subHead
    }
  })
  const plainText = plainArray.join('')
  return plainText
}
