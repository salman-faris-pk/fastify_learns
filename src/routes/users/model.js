import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Invalid email format'] 
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6,
      select: false  
    },
  },{
    timestamps: true
  });


  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });  


  export default mongoose.model('User', userSchema);