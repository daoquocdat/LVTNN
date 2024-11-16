const express = require("express");
const router = express.Router();
const staffController = require("../../app/controllers/admin/staff.controller");
const upload = require("../../app/middlewares/multer");

router.get("/index", staffController.index);
router.get("/createForm", staffController.createForm);
router.post("/store", upload.single("avatar"), staffController.create);
router.get("/:id", staffController.getOne);
router.get("/:id/editForm", staffController.updateForm);
router.put("/:id", upload.single("avatar"), staffController.update);
router.delete("/:id/block", staffController.block);
router.post("/:id/unblock", staffController.unBlock);

module.exports = router;
