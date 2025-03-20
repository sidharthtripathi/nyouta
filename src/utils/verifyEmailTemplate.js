const verifyEmailTemplate = ({name,url})=>{
    return`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; text-align: center;">
    
    <h2 style="color: #333;">Dear ${name},</h2>
    
    <p style="color: #555; font-size: 16px;">
        Thank you for registering for the <strong>Wedding Invitation</strong> with us. 
        Please verify your email address by clicking the button below:
    </p>

    <a href="${url}" 
       style="display: inline-block; 
              background-color: #ff7f50; 
              color: white; 
              text-decoration: none; 
              font-size: 18px; 
              font-weight: bold; 
              padding: 12px 24px; 
              border-radius: 5px; 
              margin-top: 20px;">
        ✅ Verify Email
    </a>

    <p style="color: #777; font-size: 14px; margin-top: 20px;">
        If you did not request this, please ignore this email.
    </p>

    <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">

    <p style="color: #888; font-size: 12px;">
        Regards, <br>
        <strong>Wedding Invitation Team</strong>
    </p>

</div>

`
}

export default verifyEmailTemplate