const forgotPasswordTemplate = ({ name, otp })=>{
    return `
<<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; text-align: center; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    
    <h2 style="color: #333;">Dear ${name},</h2>

    <p style="color: #555; font-size: 16px;">
        You have requested a password reset. Please use the following <strong>OTP code</strong> to reset your password:
    </p>

    <div style="background: #ffeb3b; 
                color: #333; 
                font-size: 24px; 
                padding: 15px 30px; 
                display: inline-block; 
                font-weight: bold; 
                border-radius: 5px;
                margin: 20px 0;">
        ${otp}
    </div>

    <p style="color: #777; font-size: 14px;">
        This OTP is valid for <strong>1 hour only</strong>. Enter this OTP on the <strong>SnapShop</strong> website to proceed with resetting your password.
    </p>

    <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">

    <p style="color: #888; font-size: 12px;">
        Thanks, <br>
        <strong>Wedding Team</strong>
    </p>

</div>

    `
}

export default forgotPasswordTemplate;