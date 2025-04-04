import mongoose from 'mongoose';

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

  export default mongoose.model('User', userSchema);