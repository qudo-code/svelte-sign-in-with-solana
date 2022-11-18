<WalletProvider
    {localStorageKey}
    {wallets}
    autoConnect={false}
/>

<ConnectionProvider
    {network}
/>

<WalletMultiButton>
    Connect Wallet
</WalletMultiButton>

<script>
    import { browser } from '$app/env';

    import { Buffer } from 'buffer';
    import { onMount } from 'svelte';
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

    const wallets = [
        new PhantomWalletAdapter(),
        new BackpackWalletAdapter(),
        new SolflareWalletAdapter(),
        new SolletExtensionWalletAdapter(),
        new LedgerWalletAdapter(),
    ];

    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");

    // Important for wallet provider to work in prod.
    onMount(() => {
        if(browser) {
            window.Buffer = Buffer;
        }
    });
</script>

<slot></slot>