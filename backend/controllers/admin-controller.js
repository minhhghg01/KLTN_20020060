const bcrypt = require("bcrypt");
const Admin = require("../models/adminSchema.js");
const Sclass = require("../models/sclassSchema.js");
const Student = require("../models/studentSchema.js");
const Teacher = require("../models/teacherSchema.js");
const Subject = require("../models/subjectSchema.js");
const Notice = require("../models/noticeSchema.js");
const Complain = require("../models/complainSchema.js");

const adminRegister = async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
      ...req.body,
      password: hashedPass,
    });

    const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
    const existingSchool = await Admin.findOne({
      schoolName: req.body.schoolName,
    });

    if (existingAdminByEmail) {
      res.send({ message: "Email đã tồn tại" });
    } else if (existingSchool) {
      res.send({ message: "Tên trường học/trung tâm đã tồn tại" });
    } else {
      let result = await admin.save();
      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAdminDetail = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.password = undefined;
      res.send(admin);
    } else {
      res.send({ message: "Không tìm thấy quản trị viên" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// đăng nhập cho các tác nhân
const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.find();
  const student = await Student.find();
  const teacher = await Teacher.find().populate("teachSclass");

  const user = [...admin, ...student, ...teacher].find(
    (user) => user.email === email
  );
  if (user) {
    const validated = await bcrypt.compare(password, user.password);
    if (validated) {
      res.send({
        success: true,
        user,
        message: "Đăng nhập thành công",
      });
    } else {
      res.send({ message: "Mật khẩu không hợp lệ", success: false });
    }
  } else {
    res.send({ message: "Không tìm thấy người dùng", success: false });
  }
};

module.exports = { adminRegister, getAdminDetail, login };
