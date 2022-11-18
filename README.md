![banner](/doc/banner.png)

# SvelteKit Sign in With Solana
Example implementation of "Sign in With Solana" using SvelteKit.

## How it Works
1. User selects a wallet using `@svelte-on-solana/wallet-adapter-ui`.
2. Upon wallet connection, hit endpoint `/api/solana/message` to get a time sensitive message.
3. Use wallet adapter to sign time sensitive message. 
4. Send message signature and other details to `/api/solana/message/verify`.

From here, if the verification is successful, the backend could do something like prepare a JWT to send back to the user.

## Demo
[View Example UI](https://svelte-sign-in-with-solana.vercel.app/)

## Run
- Have Node installed
- `npm install` in the project directory.
- Add a `.env` file to the root of this project and add a TOTP secret like `ENV_TOTP_SECRET=12312312`. Both endpoints use this value to create and verify the time sensitive code. 
- `npm run dev` to start the project locally.

## Other Config
There are a couple non intuitive config things I had to do in order to polyfill `Buffer`. See `vite.config.js` and `+layout.svelte` for implementing a browser version of `Buffer.

## Help
Tweet at me [@_qudo](https://twitter.com/_qudo)