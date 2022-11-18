<!-- Important for wallet adapter to work in prod -->
<script>
    import { browser } from '$app/env';
    import { Buffer } from 'buffer';
    
    if(browser) {
        window.Buffer = Buffer;
    }
</script>

<slot></slot>