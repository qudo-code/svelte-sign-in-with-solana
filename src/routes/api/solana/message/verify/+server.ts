import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import speakeasy from "speakeasy";
import nacl from 'tweetnacl'
import bs58 from 'bs58'

import { env } from "$env/dynamic/private";

import {
    AuthRequestModel,
} from "src/models";

const {
    ENV_TOTP_SECRET
} = env;

export async function POST({ params, locals, request }: RequestEvent) {
    const {
        publicKey = "",
        signature = "",
        message = ""
    } = await request.json();

    const extractedTOTP = message.substring(message.length - 6, message.length);

    const authRequest = await AuthRequestModel.findOne({
        totp : extractedTOTP,
        publicKey,
    });

    const verifiedMessage = nacl
        .sign
        .detached
        .verify(
            new TextEncoder().encode(message),
            bs58.decode(signature),
            bs58.decode(publicKey)
        );

    console.log(authRequest?.uuid + publicKey)

    const verifiedTOTP = speakeasy.totp.verify({
        secret   : authRequest?.uuid + publicKey,
        encoding : "base32",
        token: extractedTOTP
    });

    if(!verifiedTOTP) {
        throw new Error("Invalid TOTP");
    }

    if(!verifiedMessage) {
        throw new Error("Invalid message");
    }

    await AuthRequestModel.findByIdAndDelete(authRequest?._id)

    return json({});
}