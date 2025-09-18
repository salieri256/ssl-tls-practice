import type { ByteArray } from './bytearray.ts'

export const swap = (
  a: ByteArray,
  i: number,
  j: number
) => {
  [a[i], a[j]] = [a[j], a[i]]
}
