const router = require('express').Router();
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth.middleware')
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.post('/upload', auth.auth, (req, res) => {
    try {
        console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: "no files were upload" });
        const file = req.files.file;
        console.log(file, 'file');
        //console.log(file.size > 1024 * 1024);
        if (file.size > 3 * 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "size to large" }); //1mb
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/webp') {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "File format is incorrect" });
        }
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "upload" }, async (err, result) => {
            if (err) throw err;
            removeTmp(file.tempFilePath);
            return res.json({ public_id: result.public_id, url: result.secure_url });
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
//delete image
router.post('/delete', auth.auth, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: "No images selected" });
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
            res.json("test delete");
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}
module.exports = router;

