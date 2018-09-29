<template>
    <ul class="el-pager" @click="">

        <li index="1" class="number" :class="{ active: currentPage === 1 }"
            v-if=" pageCount > 0 ">1</li>

        <li index="2" class="el-icon more btn-quickprev" :class="[ quickprevIconClass, { disabled } ]"
            v-if=" showPrevMore "
            @mouseenter=""
            @mouseleave=" quickprevIconClass = 'el-icon-more' "></li>

        <li index="3" class="number" :class="{ active: currentPage === pager, disabled }"
            v-for=" pager in pagers ">{{ pager }}</li>

        <li index="4" class="el-icon more btn-quicknext" :class="[ quicknextIconClass, { disabled } ]"
            v-if=" showNextMore "
            @mouseenter=""
            @mouseleave=" quicknextIconClass = 'el-icon-more' "></li>

        <li index="5" class="number" :class="{ active: currentPage === pageCount, disabled }"
            v-if=" pageCount > 1 ">{{ pageCount }}</li>
    </ul>
</template>

<script>
    export default {
        name: 'pager',
        props: {
            currentPage: Number,
            pageCount: Number,
            pagerCount: Number,
            disabled: Boolean
        },
        data () {
            return {
                current: null,
                showPrevMore: false,
                showNextMore: false,
                quicknextIconClass: 'el-icon-more',
                quickprevIconClass: 'el-icon-more'
            };
        },
        computed: {
            pagers () {
                return [];
            }
        }
    }
</script>