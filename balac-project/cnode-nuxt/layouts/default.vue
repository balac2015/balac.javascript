<template>
    <div class="layouts-default">
        <v-header />
        <nuxt />
        <v-footer />
    </div>
</template>

<script type="text/javascript">
    import VHeader from '@/components/Header.vue';
        import VFooter from '@/components/Footer.vue';

    export default {
        name: 'layouts-default',
        components: {
            VHeader,
            VFooter
        }
    }
</script>
