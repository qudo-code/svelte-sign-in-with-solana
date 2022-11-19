import type { RequestEvent } from "@sveltejs/kit";

import speakeasy from "speakeasy";

import { v4 as uuidv4 } from "uuid";

import {
    AuthRequestModel,
} from "src/models";

import { json } from "@sveltejs/kit"

import connectMongo from "src/util/connect-mongo";

export async function GET({ params }: RequestEvent) {
    await connectMongo();

    if(!params.publicKey) {
        throw new Error("Invalid TOTP");
    }

    const uuid = uuidv4();

    const totp = speakeasy.totp({
        secret   : uuid + params.publicKey,
        encoding : "base32",
    });

    const authRequest = new AuthRequestModel({
        uuid,
        totp,
        publicKey: params.publicKey
    });

    await authRequest.save();

    const message = `Sign this message to prove ownership.\n\nnonce: ${totp}`;

    return json({
        data : message,
    });
}