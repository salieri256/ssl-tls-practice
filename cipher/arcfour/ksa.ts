import type { ReadonlyByteArray } from './bytearray.ts'
import { swap } from './swap.ts'

export const ksa = (
  key: ReadonlyByteArray,
): ReadonlyByteArray => {
  const N = 256
  const S = new Uint8Array(N)
    .map((_, i) => i)
  let j = 0
  for (let i = 0; i < N; i++) {
    j = (j + S[i] + key[i % key.length]) % N
    swap(S, i, j)
  }
  return S
}
