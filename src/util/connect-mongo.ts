import mongoose from "mongoose";

import {
    env
} from "$env/dynamic/private";

const {
    ENV_MONGO,
} = env;

export default async () => {
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
