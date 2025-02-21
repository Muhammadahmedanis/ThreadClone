// By default, Mongoose excludes fields that have select: false in the schema. Typically, in a User schema, passwords are stored securely and excluded by default for security reasons, like this:
// const userSchema = new mongoose.Schema({
//     userName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true, select: false }, // Password is hidden by default
//     profilePic: { type: String },
//     bio: { type: String }
// });