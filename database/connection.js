import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
        console.log("connected to mongo");
    } catch (err) {
        console.log(err);
    }
    }
    export default connect;