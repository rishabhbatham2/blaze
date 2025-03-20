import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const otpStorage = {}; // Temporary storage (cleared on server restart)

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (email) => {
  const otp = generateOTP();
  otpStorage[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // Expires in 10 mins

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Your App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    html: `<p>Your OTP code is: <b>${otp}</b></p><p>It is valid for 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, error };
  }
};
/* 
export const verifyOTP = (email, enteredOTP) => {
  const storedOTP = otpStorage[email];

  if (!storedOTP) return { success: false, message: "OTP expired or not found" };
  if (Date.now() > storedOTP.expiresAt) {
    delete otpStorage[email]; // Cleanup expired OTP
    return { success: false, message: "OTP expired" };
  }
  if (storedOTP.otp !== enteredOTP) return { success: false, message: "Invalid OTP" };

  delete otpStorage[email]; // OTP verified, remove from memory
  return { success: true, message: "OTP verified successfully" };
}; */
export const verifyOTP = (email, enteredOTP) => {
    const storedOTP = otpStorage[email];
  
    if (!storedOTP) {
      return { success: false, message: "OTP expired or not found" };
    }
  
    const { otp, expiresAt, attempts = 0 } = storedOTP;
  
    if (Date.now() > expiresAt) {
      delete otpStorage[email]; // Cleanup expired OTP
      return { success: false, message: "OTP expired" };
    }
  
    if (otp != enteredOTP) {
      return { success: false, message: "Invalid OTP" };
    }
  
    if (attempts >= 1) {
      delete otpStorage[email]; // Cleanup after second successful attempt
    } else {
      otpStorage[email].attempts = attempts + 1; // Increment attempt count
    }
  
    return { success: true, message: "OTP verified successfully" };
  };
  
