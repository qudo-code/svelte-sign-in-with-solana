<WalletProvider {localStorageKey} {wallets} autoConnect={false} />
<ConnectionProvider {network} />

<WalletMultiButton>
    Connect Wallet
</WalletMultiButton>

<h1>Logs</h1>

<pre>
<code>
{#each logs as log, idx}
{log}
{/each}
</code>
</pre>

<script lang="ts">
    import bs58 from "bs58";

    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

    import { clusterApiUrl } from '@solana/web3.js';

    import {
        workSpace,
        WalletProvider,
        ConnectionProvider,
        WalletMultiButton,
    } from "@svelte-on-solana/wallet-adapter-ui";

    import {
        PhantomWalletAdapter,
        BackpackWalletAdapter,
        LedgerWalletAdapter,
        SolflareWalletAdapter,
        SolletExtensionWalletAdapter,
    } from "@solana/wallet-adapter-wallets";
    
    import { onMount } from "svelte";

    let logs:Array<string> = [];
    let isVerifying = false;
    let verified = false;

    const wallets = [
        new PhantomWalletAdapter(),
        new BackpackWalletAdapter(),
        new SolflareWalletAdapter(),
        new SolletExtensionWalletAdapter(),
        new LedgerWalletAdapter(),
    ];

    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");

    const getMessage = async () => {
        const response = await fetch("/api/solana/message");
        
        const { data : message } = await response.json();

        logs = [
            ...logs,
            `\n\n\nReceived message to sign: "${message}"`
        ];

        return message;
    }

    const signMessage = async () => {
        isVerifying = true;

        const message = await getMessage();

        const encodedMessage = new TextEncoder().encode(message);

        if(!$walletStore?.signMessage) {
            logs = [
                ...logs,
                `\n\n\nWallet not supported`
            ];

            isVerifying = false;

            return;
        }

        const signedMessage = await $walletStore?.signMessage(encodedMessage);

        const base58Signature = bs58.encode(signedMessage);

        logs = [
            ...logs,
            `\n\n\nPublic Key: ${$walletStore.publicKey?.toBase58()}`
        ];

        logs = [
            ...logs,
            `\n\n\nSigned message: ${base58Signature}`
        ];

        if(!signedMessage) {
            logs = [
                ...logs,
                `\n\n\nFailed to sign message`
            ];

            isVerifying = false;

            return;
        }

        logs = [
            ...logs,
            `\n\n\nVerifying signature...`
        ];

        const response = await fetch(`/api/solana/message/verify`, {
            method : "POST",
            body : JSON.stringify({
                message   : message,
                signature : base58Signature,
                publicKey    : $walletStore.publicKey?.toBase58(),
            }),
        });

        if(response.status !== 200) {
            logs = [
                ...logs,
                `\n\n\nSignature verification failed`
            ];

            $walletStore.disconnect();

            isVerifying = false;

            return;
        }

        logs = [
            ...logs,
            `\n\n\nSignature verification success ✅`
        ];

        isVerifying = false;
        verified = true;
    }
    
    onMount(() => {
        logs = [
            ...logs,
            "\n\n\nApp is ready"
        ]
    });

    $: if($walletStore.connected && !verified && !isVerifying) {
        signMessage();
    }

    $: if(!$walletStore.connected) {
        verified = false;
        isVerifying = false;
    }
</script>


