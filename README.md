![banner](/doc/banner.png)

# SvelteKit Sign in With Solana
Example implementation of "Sign in With Solana" using SvelteKit.

## How it Works
1. User selects a wallet using `@svelte-on-solana/wallet-adapter-ui`.
2. Upon wallet connection, hit endpoint `/api/solana/message` to get a time sensitive message.
3. Use wallet adapter to sign time sensitive message. 
4. Send message signature and other details to `/api/solana/message/verify`.

## What Now
#### Connect Database
Connect to a database of your choice to ensure the best security. You'll probably need one for storing user metadata anyway.

#### Generate JWT
Once verified, you could do something like look up the user by Public Key and generate a JWT to send back to the client.

#### Handle Duplicate Nonces
You should log nones in a database so you can check for ones that are already used. You will also have to make an addition to the /verify endpoint with logic to determine "already exits".

## Demo
[View Example UI](https://svelte-sign-in-with-solana.vercel.app/)

## Run
- Have Node installed
- `npm install` in the project directory.
- Add a `.env` file to the root of this project and add a TOTP secret like `ENV_TOTP_SECRET=12312312`. Both endpoints use this value to create and verify the time sensitive code. 
- `npm run dev` to start the project locally.

## Help
Tweet at me [@_qudo](https://twitter.com/_qudo)