import User from "#models/user";
import Service from "#services/base";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { session } from "#middlewares/session";
import httpStatus from "#utils/httpStatus";
import { transporter, mailOptions as createMailOptions } from "#configs/nodeMailer";


class UserService extends Service {
  static Model = User;

  static async register(data) {
    const { name, email, password, role, profilePic, mobileNo } = data;
    let user = await this.Model.findOne({ mobileNo });
    if (user)
      return {
        httpStatus: httpStatus.CONFLICT,
        message: "User already exists",
      };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new this.Model({
      name,
      email,
      password: hashedPassword,
      role,
      profilePic,
      mobileNo,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // session.set("user", user);
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        role: user.role,
      },
    };
  }

  static async login(data) {
    const { mobileNo, email, password } = data;
    const user = await this.Model.findOne({
      $or: [
        { mobileNo },
        { email }
      ]
    });
    // const user = await this.Model.findOne({ mobileNo });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        httpStatus: httpStatus.UNAUTHORIZED,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // session.set("user", user);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobileNo: user.mobileNo
      },
    };
  }


  static async sendNewPassword(identifier) {
    const user = await this.Model.findOne({
      $or: [{ email: identifier }, { mobileNo: identifier }],
    });

    if (!user) {
      return {
        httpStatus: httpStatus.NOT_FOUND,
        message: "User not found",
      };
    }
    if (!user.email) {
      return {
        httpStatus: httpStatus.BAD_REQUEST,
        message: "User does not have an email to receive the password.",
      };
    }

    const newPassword = Math.random().toString(36).slice(-10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    const htmlContent = `
    <p>Hi ${user.name},</p>
    <p>Your new password is: <strong>${newPassword}</strong></p>
    <p>Please log in and change it immediately.</p>
  `;

    const mailOpts = createMailOptions(user.email, "Your New Password", htmlContent);

    try {
      await transporter.sendMail(mailOpts);
      return {
        httpStatus: httpStatus.OK,
        message: "A new password has been sent to your email.",
      };
    } catch (err) {
      return {
        httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Password updated but failed to send email.",
        error: err.message,
      };
    }
  }


}

export default UserService;
