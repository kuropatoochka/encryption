const crypto = require('crypto');
const fs = require('fs');
const util = require('util')


const cipherData = fs.readFileSync(`${__dirname}/key.json`)
const { key, algorithm } = JSON.parse(cipherData)

const stringForEncryption = 'Nice to meet you'

function encrypt(string) {
  const iv = crypto.randomBytes(8).toString('hex')
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  //обновляет наш объект шифра данными:  первый параметр - данные, второй - формат входных данных, третий - формат выходных данных
  let encrypted = cipher.update(string, 'utf8', 'hex');
  encrypted += cipher.final('hex')
  //оканчиваем шифрование и преобразоваем результат в hex - шестнадцатеричную систему исчисления 
  return `${encrypted}:${iv}`
}

console.log(encrypt(stringForEncryption))


//const encryptedString = 'e6cfe81412db6907f63b53e1c33870d59ebf87e5b05cb17f3d566f770ea6811355397fc30f22cd80b3ce5e6e304b5494:e517d275e6ed675b'

function decrypt(string) {
  const[encryptedString, iv] = string.split(':')
  //создаем объект дешифратора с нашим алгоритмом и ключом 
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  //обновляет наш объект дешифратора данными: первый параметр - данные, второй - формат входных данных, третий - формат выходных данных
  let decrypted = decipher.update(encryptedString, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

console.log(decrypt(encrypt(stringForEncryption)))


