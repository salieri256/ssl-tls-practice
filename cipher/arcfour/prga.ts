import type { ReadonlyByteArray } from './bytearray.ts'
import { swap } from './swap.ts'

export const prga = (
  rS: ReadonlyByteArray,
  length: number,
): ReadonlyByteArray => {
  const N = 256
  const S = new Uint8Array(rS)
  const stream = new Uint8Array(length)
  let i = 0
  let j = 0
  for (let n = 0; n < length; n++) {
    i = (i + 1) % N
    j = (j + S[i]) % N
    swap(S, i, j)
    const t = (S[i] + S[j]) % N
    const K = S[t]
    stream[n] = K
  }
  return stream
}
