import userModel from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import genertedRefreshToken from '../utils/genertedRefreshToken.js'
import generatedOtp from '../utils/generatedOtp.js'
import sendEmail from '../config/sendEmail.js'
import { validateRegistration, validatelogin } from "../utils/validation.js";
import { oauth2Client } from "../config/google-config.js";

// import axios from 'axios'



// register controller
export async function registerController(req, res) {
  try {
    //validate the schema
    const { error } = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // check if user already exists
    const { name, email, password, phone } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registerd please Login",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password : hashPassword,
      phone : phone
  }
  const newUser = new userModel(payload)
  const save = await newUser.save()

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from wedding Team ",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
}


export async function googleSignupController(req,res){
    try {
        const { code } = req.query;
        const googleRes = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(googleRes.tokens)
        const googleUser = await oauth2Client.request(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const { name, email } = googleUser.data

        const user = await userModel.findOne({ email })

        if(user){
            return res.status(400).json({
                message : "User already registerd with this email",
                error : true,
                success : false
            })
        }
        const payload = {
            name,
            email,
            google_id : googleUser.id
        }

        const newUser = new userModel(payload)
        const save = await newUser.save()


        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from wedding Team ",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })
        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await genertedRefreshToken(user._id)
   
        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })
   
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.cookie('accessToken',accesstoken,cookiesOption)
        res.cookie('refreshToken',refreshToken,cookiesOption)
   
        return res.json({
            message : "Login successfully",
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        
    }
}


// verify email controller
export async function verifyEmailController(req,res){
    try {
        const { code } = req.body

        const user = await userModel.findOne({ _id : code})

        if(!user){
            return res.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await userModel.updateOne({ _id : code },{
            verify_email : true
        })

        return res.json({
            message : "Verify email done .Please login",
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : true
        })
    }
}

// login controller
export async function loginController(req, res) {
  try { 
    const { error } = validatelogin(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    // if (user.status !== "Active") {
    //   return res.status(400).json({
    //     message: "Contact to Admin",
    //     error: true,
    //     success: false,
    //   });
    // }

     // check password
    
     const checkPassword = await bcryptjs.compare(password,user.password)

     if(!checkPassword){
         return res.status(400).json({
             message : "Check your password",
             error : true,
             success : false
         })
     }

     const accesstoken = await generatedAccessToken(user._id)
     const refreshToken = await genertedRefreshToken(user._id)

     const updateUser = await userModel.findByIdAndUpdate(user?._id,{
         last_login_date : new Date()
     })

     const cookiesOption = {
         httpOnly : true,
         secure : true,
         sameSite : "None"
     }
     res.cookie('accessToken',accesstoken,cookiesOption)
     res.cookie('refreshToken',refreshToken,cookiesOption)

     return res.json({
         message : "Login successfully",
         success : true,
         data : {
             accesstoken,
             refreshToken
         }
     })

 } catch (error) {
     return res.status(500).json({
         message : error.message || error,
         success : false
     })
 }
}

// logout controller
export async function logoutController(req,res){
  try {
      const userid = req.userId //middleware

      const cookiesOption = {
          httpOnly : true,
          secure : true,
          sameSite : "None"
      }

      res.clearCookie("accessToken",cookiesOption)
      res.clearCookie("refreshToken",cookiesOption)

      const removeRefreshToken = await userModel.findByIdAndUpdate(userid,{
          refresh_token : ""
      })

      return res.json({
          message : "Logout successfully",
          error : false,
          success : true
      })
  } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

//update user details
export async function updateUserDetails(req,res){
  try {
      const userId = req.userId //auth middleware
      const { name, email, mobile, password } = req.body 

      let hashPassword = ""

      if(password){
          const salt = await bcryptjs.genSalt(10)
          hashPassword = await bcryptjs.hash(password,salt)
      }

      const updateUser = await userModel.updateOne({ _id : userId},{
          ...(name && { name : name }),
          ...(email && { email : email }),
          ...(mobile && { mobile : mobile }),
          ...(password && { password : hashPassword })
      })

      return res.json({
          message : "Updated successfully",
          error : false,
          success : true,
          data : updateUser
      })


  } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

// forgot password controller
export async function forgotPasswordController(req,res) {
  try {
      const { email } = req.body 

      const user = await userModel.findOne({ email })

      if(!user){
          return res.status(400).json({
              message : "Email not available",
              error : true,
              success : false
          })
      }

      const otp = generatedOtp()
      const expireTime = new Date() + 60 * 60 * 1000 // 1hr

      const update = await userModel.findByIdAndUpdate(user._id,{
          forgot_password_otp : otp,
          forgot_password_expiry : new Date(expireTime).toISOString()
      })

      await sendEmail({
          sendTo : email,
          subject : "Forgot password",
          html : forgotPasswordTemplate({
              name : user.name,
              otp : otp
          })
      })

      return res.json({
          message : "check your email",
          error : false,
          success : true
      })

  } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(req,res){
  try {
      const { email , otp }  = req.body

      if(!email || !otp){
          return res.status(400).json({
              message : "Provide required field email, otp.",
              error : true,
              success : false
          })
      }

      const user = await userModel.findOne({ email })

      if(!user){
          return res.status(400).json({
              message : "Email not available",
              error : true,
              success : false
          })
      }

      const currentTime = new Date().toISOString()

      if(user.forgot_password_expiry < currentTime  ){
          return res.status(400).json({
              message : "Otp is expired",
              error : true,
              success : false
          })
      }

      if(otp !== user.forgot_password_otp){
          return res.status(400).json({
              message : "Invalid otp",
              error : true,
              success : false
          })
      }

      //if otp is not expired
      //otp === user.forgot_password_otp

      const updateUser = await userModel.findByIdAndUpdate(user?._id,{
          forgot_password_otp : "",
          forgot_password_expiry : ""
      })
      
      return res.json({
          message : "Verify otp successfully",
          error : false,
          success : true
      })

  } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

//reset password
export async function resetpassword(req,res){
  try {
      const { email , newPassword, confirmPassword } = req.body 

      if(!email || !newPassword || !confirmPassword){
          return res.status(400).json({
              message : "provide required fields email, newPassword, confirmPassword"
          })
      }

      const user = await userModel.findOne({ email })

      if(!user){
          return res.status(400).json({
              message : "Email is not available",
              error : true,
              success : false
          })
      }

      if(newPassword !== confirmPassword){
          return res.status(400).json({
              message : "newPassword and confirmPassword must be same.",
              error : true,
              success : false,
          })
      }

      const salt = await bcryptjs.genSalt(10)
      const hashPassword = await bcryptjs.hash(newPassword,salt)

      const update = await userModel.findOneAndUpdate(user._id,{
          password : hashPassword
      })

      return res.json({
          message : "Password updated successfully.",
          error : false,
          success : true
      })

  } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}
