// file.js
import * as fs from 'fs'
import { promisify } from 'util'

const writeFilePromise = promisify(fs.writeFile)
const readFilePromise = promisify(fs.readFile)

const save = (path: string, str: string) => writeFilePromise(path, str)

const read = (path: string) => readFilePromise(path)

module.exports = {
    read: read,
    save: save
}
