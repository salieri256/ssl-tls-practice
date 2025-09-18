import type { ReadonlyByteArray } from './bytearray.ts'

export const xor = (
  a: ReadonlyByteArray,
  b: ReadonlyByteArray,
): ReadonlyByteArray => {
  const N = Math.min(a.length, b.length)
  const result = new Uint8Array(N)
    .map((_, i) => a[i] ^ b[i])
  return result
}
