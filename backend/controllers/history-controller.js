const History = require('../models/historySchema.js');

const historyCreate = async (req, res) => {
    try {
        const history = await History.create(req.body);
        res.send({
            history,
            message: "Lịch sử đã được tạo",
            success: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

const historyList = async (req, res) => {
    try {
        let history = await History.find({ subject: req.params.id }).populate("student");
        // sort history by score and timeRemaining
        let result;
        result = history.sort((a, b) => {
            if (a.score == b.score) {
                return a.timeRemaining - b.timeRemaining;
            }
            return b.score - a.score;
        });
         res.send({
            history: result,
            message: "Danh sách lịch sử",
            success: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { historyCreate, historyList };