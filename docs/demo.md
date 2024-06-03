<script setup lang="ts">
        import App from '../src/App.vue'
</script>
# Demo

Calendarity is a modern, customizable calendar application built with Vue.js, Sass, and Pinia.

::: raw
<div class="v-body">
    <App></App>
</div>
:::

<style lang="scss">
    .v-body {
        box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 6px;
        border-top: 2px solid #1f2937;
    }

    .dark .v-body {
        background-color: #202127;
    }
</style>