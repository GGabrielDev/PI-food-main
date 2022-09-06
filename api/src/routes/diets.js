const { Router } = require("express");
const { Diet, dietCreator } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
	const result = await Diet.findAll()

	return res.status(200).json(result) 
})

module.exports = router;
