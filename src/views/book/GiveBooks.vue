<template>
    <div>
        <vs-row class="my-3" vs-justify="space-between" vs-align="flex-end">
            <vs-col vs-w="auto">
                <vs-row>
                       <vs-col v-for="(item,i) in routerType" :key="i" vs-w="auto" vs-type="flex">
                            <div  @click="selectedRoute(item.path)">
                                <vx-card  class="overlay-card overflow-hidden w-full hoverAffect cursor-pointer">
                                    <!-- <template  slot="no-body">
                                        <img height="100px" :src="item.image" alt="user-profile-cover" class="responsive">
                                            <div class="card-overlay text-white flex flex-col justify-between">
                                                <h1 class="text-white mb-4" v-text="item.title"></h1>
                                                <p v-text="item.subtitle"></p>
                                            </div> 
                                            <h2>asdas</h2>
                                    </template> -->
                                    <vs-row vs-justify="center" vs-align="center">
                                        <vs-col vs-w="auto">
                                            <h1 class="my-0">{{item.title}}</h1>
                                        </vs-col>
                                        <vs-col vs-w="auto">
                                            <feather-icon :icon="item.icon" class="w-11 h-11 red"></feather-icon>
                                        </vs-col>
                                    </vs-row>
                                </vx-card>
                                <!-- <vx-card>
                                    sda
                                </vx-card> -->
                            </div>
                        </vs-col>
                </vs-row>
            </vs-col>
            <vs-col vs-w="auto">
                <vs-button :href="baseUrl" target="_blank" icon="get_app" size="large">Overdues list</vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vx-card no-shadow>
                <vs-table hoverFlat :data="rbList" pagination :maxItems="20">
                    <template slot="header">
                        <vs-row class="py-2">
                            <vs-col class="vx-col flex justify-center align-middle px-0" vs-w="4">
                                <vs-input class="w-full" icon="search" placeholder="Search" v-model="value1"/>
                                    <div class="py-2">
                                        <a class="btn_search">Search</a>
                                    </div>
                            </vs-col>
                        </vs-row>
                    </template>
                    <template slot="thead">
                        <vs-th>
                        UID
                        </vs-th>
                        <vs-th>
                        FULL NAME
                        </vs-th>
                        <vs-th>
                        BOOK TITLE
                        </vs-th>
                        <vs-th>
                        BOOK CODE
                        </vs-th>
                        <vs-th>
                        ACTION TYPE
                        </vs-th>
                        <vs-th>
                        DATE
                        </vs-th>
                        <vs-th>
                        REGISTERER
                        </vs-th>
                    </template>

                    <template v-if="rbList.length > 0" slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].borrow.member.uid">
                            {{data[indextr].borrow.member.uid}}
                        </vs-td>

                        <vs-td :data="data[indextr].borrow.member.name">
                            {{data[indextr].borrow.member.name}}
                        </vs-td>

                        <vs-td :data="data[indextr].borrow.bookItem.book.title">
                            {{data[indextr].borrow.bookItem.book.title}}
                        </vs-td>
                        
                        <vs-td :data="data[indextr].borrow.bookItem.id">
                            {{data[indextr].borrow.bookItem.id}}
                        </vs-td>

                        <vs-td :data="data[indextr].type">
                            {{data[indextr].type}}
                        </vs-td>

                        <vs-td :data="data[indextr].createdAt">
                            {{data[indextr].createdAt | moment('Do MMM, YYYY HH:mm')}}
                        </vs-td>

                        <vs-td :data="data[indextr].user.firstName">
                            {{ data[indextr].user.firstName }}  {{ data[indextr].user.lastName }}
                        </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
                </vx-card>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
import Transfer from '@/services/Transfer.js';
export default {
    data() {
        return {
            baseUrl: `${process.env.VUE_APP_BASE_URL}borrows/overdues?format=excel`,
            value1: '',
            rbList:[],
            backgroundLoading:'#22c16b',
            routerType: [
                {
                path: '/return',
                image: 'https://www.lusem.lu.se/media/ehl/biblioteket/bilder/puff/expeditionen.jpg',
                title: 'RETURN BOOK',
                icon: 'ArrowDownIcon',
                subtitle: 'After clicking this button, use ID card to verify student info'
                },
                 {
                path: '/borrow',
                image: 'https://img.over-blog-kiwi.com/2/65/14/65/20180123/ob_239527_borrow-books-online.png',
                title: 'BORROW BOOK',
                icon: 'ArrowUpIcon',
                subtitle: 'After clicking this button, use ID card to verify student info'
                }
            ]
        }
    },
    methods: {
        selectedRoute(route) {
            this.$router.push(`/transfer${route}`)
        },
        getAll() {
            Transfer.transactions().then((result) => {
                this.rbList = result
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    computed: {
        actionType () {
            return this.$router.history.current.params.id
        }
    },
    created() {
        this.getAll()
    }
}
</script>

<style lang="scss" scoped>
.hoverAffect{
    border: 1px solid rgb(16, 190, 153);
    transition: transform .2s;
}
.hoverAffect:hover {
    border: 1px solid rgb(15, 168, 179);
    transform: scale(1.01);
}
.btn_search{
    color: 'red';
    padding: 20px;
    cursor: pointer;
}

</style>