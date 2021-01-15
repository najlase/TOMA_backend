const router = require("express").Router()
const authApi = require("./authApi")

router.post('/login', authApi.login);
router.post('/register', authApi.register);

module.exports = router