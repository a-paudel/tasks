<script lang="ts">
    import { fade } from "svelte/transition";
    import LoginComponent from "../../components/LoginComponent.svelte";
    import RegisterComponent from "../../components/RegisterComponent.svelte";
</script>

<div class="background" transition:fade>
    <LoginComponent />
    <RegisterComponent />
</div>

<style>
    .background {
        background-color: #3f3f3f;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 5rem;
        z-index: 100;
        gap: 5rem;
    }
</style>
