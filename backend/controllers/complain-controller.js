const Complain = require("../models/complainSchema.js");

const complainCreate = async (req, res) => {
  try {
    const complain = await Complain.create(req.body);
    res.send({
      complain,
      message: "Phàn nàn đã được tạo",
      success: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const complainList = async (req, res) => {
  try {
    let complains = await Complain.find({ school: req.params.id }).populate(
      "user",
      "name"
    );
    if (complains.length > 0) {
      res.send(complains);
    } else {
      res.send({ message: "Không tìm thấy phàn nàn" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { complainCreate, complainList };
