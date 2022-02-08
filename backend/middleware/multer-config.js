
const multer = require("multer")

//Bibliothèque des mime types
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}


const storage = multer.diskStorage({
  //Dossier de reception
  destination: (req, file, callback) => {
    callback(null, "images")
  },
  //Normaliser le nom du fichier
  filename: (req, file, callback) => {
    // Remplacer les espace par des underscores
    const name = file.originalname.split(" ").join("_")
    // utiliser les mimetypes pour changer l'extension
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + "." + extension)
  },
})


module.exports = multer({ storage : storage }).single("image")
