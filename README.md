![banner](/doc/banner.png)

# SvelteKit Sign in With Solana
Example implementation of "Sign in With Solana" using SvelteKit.

## How it Works
1. User selects a wallet using `@svelte-on-solana/wallet-adapter-ui`.
2. Upon wallet connection, hit endpoint `/api/solana/message/generate/[publicKey]` to get a time sensitive message.
3. Use wallet adapter to sign time sensitive message. 
4. Send message signature and other details to `/api/solana/message/verify`.

## Demo
[View Example UI](https://svelte-sign-in-with-solana.vercel.app/)

## Requirements
- Have [Node](https://nodejs.org/en/) installed.

### Setup `.env`
This project uses [MongoDB](https://www.mongodb.com/) by default. Add a `.env` file to the root of this project with a MongoDB connection string. See `.env.example`.

## Run
- Dev server: `npm run dev`.
- Build: `npm run build`.
- Run: `npm start`.

## Help
Tweet at me [@_qudo](https://twitter.com/_qudo)