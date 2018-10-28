module.exports = async (req, res, next) => {
    try {
        await res.status(200).render('index');
    } catch (err) {
        res.status(500).send(err);
    }
}

