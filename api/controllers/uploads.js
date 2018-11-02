module.exports = (req, res, next) => {
    const path = req.params.filePath

    res.download(`./uploads/${path}`);
}