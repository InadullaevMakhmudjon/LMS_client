<template>
    <div>
        <vs-row >
            <vs-col v-for="(item,i) in routerType" :key="i" vs-w="4" vs-type="flex">
                <div  @click="selectedRoute(item.path)">
                    <vx-card  class="overlay-card overflow-hidden w-full hoverAffect cursor-pointer">
                        <template  slot="no-body">
                            <img max-height="500" :src="item.image" alt="user-profile-cover" class="responsive">
                                <div class="card-overlay text-white flex flex-col justify-between">
                                    <h1 class="text-white mb-4" v-text="item.title"></h1>
                                    <p v-text="item.subtitle"></p>
                                </div>
                        </template>
                    </vx-card>
                </div>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            backgroundLoading:'#22c16b',
            routerType: [
                {
                path: '/return',
                image: 'https://www.lusem.lu.se/media/ehl/biblioteket/bilder/puff/expeditionen.jpg',
                title: 'RETURN BOOK',
                subtitle: 'After clicking this button, use ID card to verify student info'
                },
                 {
                path: '/borrow',
                image: 'https://img.over-blog-kiwi.com/2/65/14/65/20180123/ob_239527_borrow-books-online.png',
                title: 'BORROW BOOK',
                subtitle: 'After clicking this button, use ID card to verify student info'
                }
            ]
        }
    },
    methods: {
        selectedRoute(route) {
            console.log(route)
            alert('dasdas')
            this.$router.push(`/transfer${route}`)
        }
    },
    computed: {
        actionType () {
            return this.$router.history.current.params.id
        }
    }
}
</script>

<style scoped>
.hoverAffect{
    transition: transform .2s;
}
.hoverAffect:hover {
    transform: scale(1.01);
}
</style>