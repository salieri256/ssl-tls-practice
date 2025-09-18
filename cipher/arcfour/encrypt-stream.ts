import readline from 'readline/promises'
import { generateEncryptStream } from './arcfour.ts'

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2)
const key = args[0]
const stream = generateEncryptStream(key)
stream.next()

while(true) {
  try {
    const plaintext = await io.question('> ')
    const plainArray = [...plaintext]
    const hexArray = plainArray.map((char) => {
      return stream.next(char).value
    })
    const hexString = hexArray.join('')
    console.log(hexString)
  } catch {
    console.log()
    break
  }
}
