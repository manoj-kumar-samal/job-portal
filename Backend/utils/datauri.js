// GOOD: Make sure `file.buffer` exists (only with memoryStorage in multer)
import DataUriParser from "datauri/parser.js"
import path from "path"

const getDataUri = (file) => {
  const parser = new DataUriParser()
  const extName = path.extname(file.originalname).toString()
  return parser.format(extName, file.buffer)  // ✅ this must be a Buffer
}

export default getDataUri
