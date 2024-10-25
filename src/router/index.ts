import { createRouter, createWebHistory } from "vue-router";
import MedalDetail from "@/views/event/MedalDetail.vue";
import MedalLayout from "@/views/event/MedalLayout.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NetworkErrorView from "@/views/NetworkErrorView.vue";
import OlympicList from "@/views/OlympicList.vue";
import nProgress from 'nprogress';
import SportDetail from "@/views/event/SportDetail.vue";
import CountryDetail from "@/views/event/CountryDetail.vue";
import CheerUpView from "@/views/event/CheerUpView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'medal-list-view',
            component: OlympicList,
            props: route => ({
                page: parseInt(route.query.page as string || '1', 10),
                limit: 3
            })
        },
        {
            path: '/medal/:id',
            name: 'medal-layout',
            component: MedalLayout,
            props: true,
            children: [
                {
                    path: 'country',
                    name: 'country-detail',
                    component: CountryDetail,
                    props: true
                },
                {
                    path: 'medal',
                    name: 'medal-detail',
                    component: MedalDetail,
                    props: true
                },
                {
                    path: 'sport',
                    name: 'sport-detail',
                    component: SportDetail,
                    props: true
                },
                {
                    path: 'cheerup',
                    name: 'cheerup-view',
                    component: CheerUpView,
                    props: true
                },
            ]
        },
        {
            path: '/404/:resource',
            name: '404-resource',
            component: NotFoundView,
            props: true
        },
        {
            path: '/network-error',
            name: 'network-error',
            component: NetworkErrorView
        },
        {
            path: '/:catchAll(.*)',
            name: 'notfound',
            component: NotFoundView
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

router.beforeEach(() => {
    nProgress.start();
});

router.afterEach(() => {
    nProgress.done();
});

export default router;
