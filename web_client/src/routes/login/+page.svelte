<script lang="ts">
    import { fade } from "svelte/transition";
    import LoginComponent from "../../components/LoginComponent.svelte";
    import RegisterComponent from "../../components/RegisterComponent.svelte";
</script>

<div class="background" transition:fade>
    <div class="grid">
        <LoginComponent />
        <RegisterComponent />
    </div>
</div>

<style>
    .background {
        background-color: #3f3f3f;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        z-index: 100;
    }

    .grid {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding-block: 2rem;
        overflow: auto;
        height: 100vh;
    }

    @media (min-width: 768px) {
        .grid {
            grid-template-columns: 1fr 1fr;
            gap: 10rem;
        }
    }
</style>
