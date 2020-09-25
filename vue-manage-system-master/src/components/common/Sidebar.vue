<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    beforeRouteEnter(){
alert('1');
    },

    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: '2',
                    title: '系统管理',
                    subs: [
                        {
                            index: '/role',
                            title: '角色管理'
                        },
                        {
                            index: '/employee',
                            title: '员工管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: '用户管理',
                    subs: [
                        {
                            index: '/passenger',
                            title: '乘客管理'
                        },
                        {
                            index: '/driver',
                            title: '司机管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '新闻管理',
                    subs: [
                        {
                            index: 'form',
                            title: '已支付订单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: '4',
                    title: '滴滴城市管理',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-favor',
                    index: '5',
                    title: '广告管理',
                    subs: [
                        {
                            index: '/putadv',
                            title: '广告发布'
                        },
                        {
                            index: '/adv',
                            title: '广告管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: '/table',
                    title: '订单管理'
                },
                {
                    icon: 'el-icon-rank',
                    index: '7',
                    title: '活动管理',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '车类型管理'
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/chardes',
                    title: '收费管理',
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '/donate',
                    title: '客服聊天'
                },
                {
                    icon: 'el-icon-lx-rank',
                    index: 'charts',
                    title: '报表统计'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'icon',
                    title: '广告管理'
                },
            ]
        };
    },
    methods: {

    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
