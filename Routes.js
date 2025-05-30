import { ClientRouter } from '/lib/ClientRouter.js';
import '/models/Route.js';

export const appRouterIds = {
    home: 'home',
    login: 'login',
    register: 'register',
    plans: 'plans',
    plansAdd: 'plansAdd',
    plansEdit: 'plansEdit',
    workouts: 'workouts',
    workoutsAdd: 'workoutsAdd',
    workoutsEdit: 'workoutsEdit',
    workoutsStart: 'workoutsStart',
    exercises: 'exercises',
    exercisesAdd: 'exercisesAdd',
    exercisesEdit: 'exercisesEdit'
};
Object.freeze(appRouterIds);

/** @type {Route[]} */
const routes = [
    {
        id: appRouterIds.home,
        path: '/',
        component: '<fit-home-page></fit-home-page>',
        importPath: '/pages/home/Page.js',
    },
    {
        id: appRouterIds.plans,
        path: '/plaene',
        component: '<fit-plans-page></fit-plans-page>',
        importPath: '/pages/plans/Page.js',
    },
    {
        id: appRouterIds.plansAdd,
        path: '/plaene/neu',
        component: '<fit-plans-edit-page></fit-plans-edit-page>',
        importPath: '/pages/plans/edit/Page.js',
    },
    {
        id: appRouterIds.plansEdit,
        path: '/plaene/:id/bearbeiten',
        component: '<fit-plans-edit-page></fit-plans-edit-page>',
        importPath: '/pages/plans/edit/Page.js',
    },
    {
        id: appRouterIds.workouts,
        path: '/workouts',
        component: '<fit-workouts-page></fit-workouts-page>',
        importPath: '/pages/workouts/Page.js',
    },
    {
        id: appRouterIds.workoutsAdd,
        path: '/workouts/neu',
        component: '<fit-workouts-edit-page></fit-workouts-edit-page>',
        importPath: '/pages/workouts/edit/Page.js',
    },
    {
        id: appRouterIds.workoutsEdit,
        path: '/workouts/:id/bearbeiten',
        component: '<fit-workouts-edit-page></fit-workouts-edit-page>',
        importPath: '/pages/workouts/edit/Page.js',
    },
    {
        id: appRouterIds.workoutsStart,
        path: '/workouts/:id/starten',
        component: '<fit-workouts-start-page></fit-workouts-start-page>',
        importPath: '/pages/workouts/start/Page.js',
    },
    {
        id: appRouterIds.exercises,
        path: '/uebungen',
        component: '<fit-exercises-page></fit-exercises-page>',
        importPath: '/pages/exercises/Page.js',
    },
    {
        id: appRouterIds.exercisesAdd,
        path: '/uebungen/neu',
        component: '<fit-exercises-edit-page></fit-exercises-edit-page>',
        importPath: '/pages/exercises/edit/Page.js',
    },
    {
        id: appRouterIds.exercisesEdit,
        path: '/uebungen/:id',
        component: '<fit-exercises-edit-page></fit-exercises-edit-page>',
        importPath: '/pages/exercises/edit/Page.js',
    },
];

export const appRouter = new ClientRouter(routes);