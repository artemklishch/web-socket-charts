const { Router } = require("express");
const chartControllers = require("../controllers/charts");

const router = Router();

router.post("/createNewChart", chartControllers.createNewChart);
router.delete("/deleteChart/:id", chartControllers.deleteChart);
router.put("/editChart/:id", chartControllers.editChart);
router.get("/getInterval", chartControllers.getInterval);
router.post("/setInterval", chartControllers.setInterval);

module.exports = router;
