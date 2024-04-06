import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from 'bcrypt';



const lawyerSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, 'Please provide your Name!!'],
        },
        email : {
            type : String,
            required : [true, 'Please provide your email!!'],
            unique : true,
            lowercase : true,
            validate : [validator.isEmail, 'Please provide a valid email!!']
        },
        username: {
            type : String,
            required: [true, "Please provide a valid username!!"],
            unique : true,
            lowercase : true
        },
        role : {
            type : String,
            enum : ['lawyer'],
            default : 'lawyer'
        },
        password : {
            type : String,
           required : [true, 'Please provide your password!!'],
           minlength : 8,
           select : false
        },
        passwordConfirm : {
           type : String,
           required : [true, 'Please confirm your password!!'],
           validate : {
            validator: function(el) {
                return el === this.password
            },
            message : 'Passwords are not the same!!'
           }
        },

        image : {
            type : String, 
            default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

        },
        passwordChangedAt: Date,
        passwordResetToken : String,
        PasswordResetTokenExpires : Date,
        active : {
            type : Boolean,
            default : true,
            select : false
        }
    },{
        timestamps : true
    }
);

lawyerSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };


lawyerSchema.methods.changedPasswordAfterToken = function(JWTTimeStamp) {
    if(this.passwordChangedAt){
        const changedTime = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimeStamp < changedTime;

    }
    //false means not changed.
    return false;
}

lawyerSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

  
  
    this.PasswordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };



export const Lawyer = mongoose.model('Lawyer', lawyerSchema);
