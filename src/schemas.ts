// IMPORTANT
// Be sure to register new schemas in src/models
import mongoose from "mongoose";

const { Schema } = mongoose;

export const AuthRequest = new Schema({
    publicKey : {
        type: String,
        required: true
    },
    uuid : {
        type: String,
        required: true
    },
    totp : {
        type: String,
        required: true
    },
}, { timestamps: true });
