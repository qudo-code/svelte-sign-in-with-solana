// Import these to communicate with the database throughout the app.
import mongoose from "mongoose";

import {
    AuthRequest
} from "src/schemas";

export const AuthRequestModel = mongoose.model("auth-requests", AuthRequest);
