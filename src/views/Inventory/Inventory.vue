<template>
  <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-w="12">
          <vs-row>
              <vs-col vs-w="auto" v-if="isBtnActive"><vs-button color="success" :disabled="loading" v-if="isBtnActive" @click="startScanning">Start Scanning</vs-button></vs-col>
              <vs-col vs-w="auto"  v-else><vs-button color="primary" type="flat" @click="reload">Refresh</vs-button></vs-col>
          </vs-row>
      </vs-col>
      <vs-col vs-w="auto" vs-type="flex">
          <transition name="component-fade" mode="out-in">
            <div class="loader" v-if="loading">
                <div>
                    <ul>
                    <li>
                        <svg viewBox="0 0 90 120" fill="currentColor">
                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                    </li>
                    <li>
                        <svg viewBox="0 0 90 120" fill="currentColor">
                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                    </li>
                    <li>
                        <svg viewBox="0 0 90 120" fill="currentColor">
                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                    </li>
                    <li>
                        <svg viewBox="0 0 90 120" fill="currentColor">
                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                    </li>
                    <li>
                        <svg viewBox="0 0 90 120" fill="currentColor">
                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                    </li>
                    <li>
                        <svg viewBox="0 0 90 120" fill="currentColor">
                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                        </svg>
                    </li>
                    </ul>
            </div><span class="py-2">Scanning is started. Please wait a second...</span>
        </div>
        </transition>
      </vs-col>
      <vs-col vs-w="12">
           <vs-progress v-if="loading"  indeterminate></vs-progress>
      </vs-col>
      <vs-col vs-w="12" v-if="invetoryItems.length">
           <vs-table :data="invetoryItems">
                <template slot="header">
                    <vs-row vs-justify="center">
                        <vs-col class="py-3">
                            <h2 class="text-center">Detected book Items</h2>
                        </vs-col>
                    </vs-row>
                </template>
                <template slot="thead">
                    <vs-th>Order</vs-th>
                    <vs-th>Book title</vs-th>
                    <vs-th>Book quantity</vs-th>
                    <vs-th>In library</vs-th>
                    <vs-th>Borrowed</vs-th>
                    <vs-th>Damaged</vs-th>
                    <vs-th>Lost</vs-th>
                    <vs-th>Shortfall</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td :data="data[indextr].title">
                        {{indextr+1}}
                    </vs-td>

                    <vs-td :data="data[indextr].title">
                        {{data[indextr].title}}
                    </vs-td>

                    <vs-td :data="data[indextr].numbers.all">
                        {{data[indextr].numbers.all}}
                    </vs-td>

                    <vs-td :data="data[indextr].numbers.inLibrary">
                        {{data[indextr].numbers.inLibrary}}
                    </vs-td>

                    <vs-td :data="data[indextr].numbers.borrowed">
                        {{data[indextr].numbers.borrowed}}
                    </vs-td>

                     <vs-td :data="data[indextr].numbers.damaged">
                        {{data[indextr].numbers.damaged}}
                    </vs-td>

                    <vs-td :data="data[indextr].numbers.lost">
                        {{data[indextr].numbers.lost}}
                    </vs-td>

                     <vs-td :data="data[indextr].id">
                        {{data[indextr].numbers.all - data[indextr].numbers.inLibrary -data[indextr].numbers.borrowed - data[indextr].numbers.damaged -data[indextr].numbers.lost}}
                    </vs-td>
                    </vs-tr>
                </template>
                </vs-table>
      </vs-col>
  </vs-row>
</template>

<script>
import io from "socket.io-client"
import Inventory from '../../services/Inventory';
export default {
data() {
    return {
        loading: false,
        isBtnActive: true,
        invetoryItems: [],
        socket: io(process.env.VUE_APP_READER_SOCKET,{transports: ['websocket']}),
    }
},
methods: {
    startScanning() {
        this.loading = true
        this.isBtnActive = false
        this.invetoryItems = []
        this.socket.emit('inventory');
        this.socket.on('inventoryResults', data => {
            // console.log(data)
            Inventory.postArraysOfTags(data).then(table => {
                // console.log(table)
                this.invetoryItems = table
            }).catch(err => {
                console.log(err)
            })
            this.loading = false
        })
    },
    reload() {
        location.reload()
    }
},
beforeDestroy() {
    console.log('destroy started...')
    this.socket.disconnect()
}
}
</script>

<style scoped lang="scss">
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .8s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.loader {
    --background: linear-gradient(135deg, #23C4F8, #275EFE);
    --shadow: #{rgba(#275EFE, .28)};
    --text: #6C7486;
    --page: #{rgba(#fff, .36)};
    --page-fold: #{rgba(#fff, .52)};
    --duration: 3s;
    width: 200px;
    height: 140px;
    position: relative;
    &:before,
    &:after {
        --r: -6deg;
        content: '';
        position: absolute;
        bottom: 8px;
        width: 120px;
        top: 80%;
        box-shadow: 0 16px 12px var(--shadow);
        transform: rotate(var(--r));
    }
    &:before {
        left: 4px;
    }
    &:after {
        --r: 6deg;
        right: 4px;
    }
    div {
        width: 100%;
        height: 100%;
        border-radius: 13px;
        position: relative;
        z-index: 1;
        perspective: 600px;
        box-shadow: 0 4px 6px var(--shadow);
        background-image: var(--background);
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            position: relative;
            li {
                --r: 180deg;
                --o: 0;
                --c: var(--page);
                position: absolute;
                top: 10px;
                left: 10px;
                transform-origin: 100% 50%;
                color: var(--c);
                opacity: var(--o);
                transform: rotateY(var(--r));
                animation: var(--duration) ease infinite;
                $i: 2;
                @while $i < 6 {
                    &:nth-child(#{$i}) {
                        --c: var(--page-fold);
                        animation-name: page-#{$i};
                    }
                    $i: $i + 1;
                }
                svg {
                    width: 90px;
                    height: 120px;
                    display: block;
                }
                &:first-child {
                    --r: 0deg;
                    --o: 1;
                }
                &:last-child {
                    --o: 1;
                }
            }
        }
    }
    span {
        display: block;
        left: 0;
        right: 0;
        top: 100%;
        margin-top: 20px;
        text-align: center;
        color: var(--text);
    }
}

$i: 2;
@while $i < 6 {
    $delay: $i * 15 - 30;
    @keyframes page-#{$i} {
        #{0 + $delay}% {
            transform: rotateY(180deg);
            opacity: 0;
        }
        #{20 + $delay}% {
            opacity: 1;
        }
        #{35 + $delay}%,
        100% {
            opacity: 0;
        }
        #{50 + $delay}%,
        100% {
            transform: rotateY(0deg);
        }
    }
    $i: $i + 1;
}

// Center & dribbble

</style>