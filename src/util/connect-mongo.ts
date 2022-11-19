import mongoose from "mongoose";

import {
    env
} from "$env/dynamic/private";

const {
    ENV_MONGO,
} = env;

export default async () => {
    console.log({ENV_MONGO})
    // Connect with existing connection.
    if(Number(mongoose?.connection?.readyState) === 1) {
        return mongoose.connection;
    }

    const connection = mongoose.connect(ENV_MONGO, {
        useNewUrlParser    : true,
        useUnifiedTopology : true,
    });

    return connection;
};
