import { globalClassNames } from '/Constants.js';
import { appRouter } from '/Routes.js';
import { exercisesService } from '/services/ExercisesService.js';
import '/models/Exercise.js';
import { compareDate, formatDate, isSameDay } from '/lib/DateHelpers.js';

export class ExerciseHistoryPage extends HTMLElement {
    /** @type {string | null} */
    #exerciseId = null;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');
                .setWrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr 2fr;
                }
                .dayList {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .dayCard {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
            </style>
            <div class="${globalClassNames.pageContainer}">
                <div class="${globalClassNames.titleWrapper}"></div>
                <p></p>
                <ul></ul>
            </div>
        `;
    }

    connectedCallback() {
        const id = appRouter.getParamValue('id');

        if (id !== null) {
            this.#exerciseId = id;
            this.#createExerciseHistory();
        }
    }

    async #createExerciseHistory() {
        if (this.#exerciseId === null) {
            return;
        }

        const exercise = await exercisesService.getUserOrGlobalExercise(this.#exerciseId);

        const titleWrapper = this.shadowRoot?.querySelector(`.${globalClassNames.titleWrapper}`);

        if (titleWrapper) {
            titleWrapper.innerHTML = `
                <div class="${globalClassNames.emojiCircle}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><g filter="url(#f542idh)"><path fill="#ffb336" d="M7.968 7.844h-1.64L2.577 19.03C.843 24.938 3.977 29 8.797 29h12.827a8.391 8.391 0 1 0-8.01-11.221a.24.24 0 0 1-.223.159a.23.23 0 0 1-.207-.126z"/></g><path fill="url(#f542ida)" d="M7.968 7.844h-1.64L2.577 19.03C.843 24.938 3.977 29 8.797 29h12.827a8.391 8.391 0 1 0-8.01-11.221a.24.24 0 0 1-.223.159a.23.23 0 0 1-.207-.126z"/><path fill="url(#f542id0)" d="M7.968 7.844h-1.64L2.577 19.03C.843 24.938 3.977 29 8.797 29h12.827a8.391 8.391 0 1 0-8.01-11.221a.24.24 0 0 1-.223.159a.23.23 0 0 1-.207-.126z"/><path fill="url(#f542id1)" d="M7.968 7.844h-1.64L2.577 19.03C.843 24.938 3.977 29 8.797 29h12.827a8.391 8.391 0 1 0-8.01-11.221a.24.24 0 0 1-.223.159a.23.23 0 0 1-.207-.126z"/><path fill="url(#f542id2)" d="M7.968 7.844h-1.64L2.577 19.03C.843 24.938 3.977 29 8.797 29h12.827a8.391 8.391 0 1 0-8.01-11.221a.24.24 0 0 1-.223.159a.23.23 0 0 1-.207-.126z"/><circle cx="21.515" cy="20.609" r="8.391" fill="url(#f542id3)"/><path fill="url(#f542idb)" d="M7.32 5.039L6.296 7.934l.499.962a2.04 2.04 0 0 0 1.817 1.12h4.941a2.5 2.5 0 0 0 2.315-1.557l.087-.213a3.5 3.5 0 0 0-1.814-4.517l-1.774-.752c-2.172-.805-4.283.047-5.047 2.062"/><path fill="url(#f542id4)" d="M7.32 5.039L6.296 7.934l.499.962a2.04 2.04 0 0 0 1.817 1.12h4.941a2.5 2.5 0 0 0 2.315-1.557l.087-.213a3.5 3.5 0 0 0-1.814-4.517l-1.774-.752c-2.172-.805-4.283.047-5.047 2.062"/><path fill="url(#f542id5)" d="M7.32 5.039L6.296 7.934l.499.962a2.04 2.04 0 0 0 1.817 1.12h4.941a2.5 2.5 0 0 0 2.315-1.557l.087-.213a3.5 3.5 0 0 0-1.814-4.517l-1.774-.752c-2.172-.805-4.283.047-5.047 2.062"/><g filter="url(#f542idi)"><path fill="url(#f542idc)" d="m13.171 18.688l-6.625 8.718h13.782l-6.532-8.718z"/><path fill="url(#f542id6)" d="m13.171 18.688l-6.625 8.718h13.782l-6.532-8.718z"/><path fill="url(#f542id7)" d="m13.171 18.688l-6.625 8.718h13.782l-6.532-8.718z"/></g><g filter="url(#f542idj)"><path stroke="url(#f542idd)" stroke-linecap="round" stroke-width="1.5" d="m11.449 4.268l2.383.984c.402.148.91.68.964 1.46c.058.823-.524 1.485-.89 1.712"/></g><rect width="8.914" height="4.07" x="6.281" y="6.898" fill="url(#f542ide)" rx="2.035"/><rect width="8.914" height="4.07" x="6.281" y="6.898" fill="url(#f542id8)" rx="2.035"/><rect width="8.914" height="4.07" x="6.281" y="6.898" fill="url(#f542idf)" rx="2.035"/><path fill="url(#f542id9)" d="M10.653 5.009L10 6.929h3.75z"/><g filter="url(#f542idk)"><path fill="url(#f542idg)" d="m9.406 5.433l1.39.891v.612h-1.39z"/></g><defs><radialGradient id="f542id0" cx="0" cy="0" r="1" gradientTransform="matrix(1.09436 7.34375 -3.76675 .56132 10.406 15.656)" gradientUnits="userSpaceOnUse"><stop offset=".021" stop-color="#ffea5e"/><stop offset="1" stop-color="#ffea5e" stop-opacity="0"/></radialGradient><radialGradient id="f542id1" cx="0" cy="0" r="1" gradientTransform="matrix(0 -2.0625 .85938 0 13.468 17.453)" gradientUnits="userSpaceOnUse"><stop stop-color="#e49b48"/><stop offset="1" stop-color="#e49b48" stop-opacity="0"/></radialGradient><radialGradient id="f542id2" cx="0" cy="0" r="1" gradientTransform="matrix(-.87441 1.23133 -2.24067 -1.59119 9.804 10.624)" gradientUnits="userSpaceOnUse"><stop offset=".211" stop-color="#d4934e"/><stop offset="1" stop-color="#d4934e" stop-opacity="0"/></radialGradient><radialGradient id="f542id3" cx="0" cy="0" r="1" gradientTransform="rotate(140.981 10.078 13.894)scale(9.33157)" gradientUnits="userSpaceOnUse"><stop stop-color="#ffed59"/><stop offset="1" stop-color="#ffed59" stop-opacity="0"/></radialGradient><radialGradient id="f542id4" cx="0" cy="0" r="1" gradientTransform="rotate(-30.196 21.495 -14.268)scale(7.083 12.6242)" gradientUnits="userSpaceOnUse"><stop offset=".56" stop-color="#ffdd47" stop-opacity="0"/><stop offset="1" stop-color="#ffdd47"/></radialGradient><radialGradient id="f542id5" cx="0" cy="0" r="1" gradientTransform="rotate(-122.735 7.792 .644)scale(5.48766 7.79014)" gradientUnits="userSpaceOnUse"><stop offset=".742" stop-color="#d0a659" stop-opacity="0"/><stop offset=".961" stop-color="#d0a659"/></radialGradient><radialGradient id="f542id6" cx="0" cy="0" r="1" gradientTransform="matrix(1.81251 1.21874 -2.41974 3.59865 10.718 20.156)" gradientUnits="userSpaceOnUse"><stop stop-color="#ffe060"/><stop offset="1" stop-color="#ffe060" stop-opacity="0"/></radialGradient><radialGradient id="f542id7" cx="0" cy="0" r="1" gradientTransform="rotate(143.344 4.777 13.53)scale(1.67501 9.91772)" gradientUnits="userSpaceOnUse"><stop offset=".375" stop-color="#f99d45"/><stop offset="1" stop-color="#f99d45" stop-opacity="0"/></radialGradient><radialGradient id="f542id8" cx="0" cy="0" r="1" gradientTransform="rotate(137.353 5.226 7.046)scale(1.61445 1.40902)" gradientUnits="userSpaceOnUse"><stop stop-color="#ffeb64"/><stop offset="1" stop-color="#ffeb64" stop-opacity="0"/></radialGradient><radialGradient id="f542id9" cx="0" cy="0" r="1" gradientTransform="matrix(0 -1.21213 1.47114 0 11.492 7.08)" gradientUnits="userSpaceOnUse"><stop stop-color="#a55812"/><stop offset="1" stop-color="#f29b05" stop-opacity="0"/></radialGradient><linearGradient id="f542ida" x1="16" x2="16" y1="29.969" y2="27.031" gradientUnits="userSpaceOnUse"><stop stop-color="#d27a7f"/><stop offset="1" stop-color="#d27a7f" stop-opacity="0"/></linearGradient><linearGradient id="f542idb" x1="8.406" x2="16.843" y1="8.781" y2="6.781" gradientUnits="userSpaceOnUse"><stop stop-color="#e9a73e"/><stop offset="1" stop-color="#ffcc30"/></linearGradient><linearGradient id="f542idc" x1="13.421" x2="13.421" y1="18.688" y2="26.149" gradientUnits="userSpaceOnUse"><stop stop-color="#ffca40"/><stop offset="1" stop-color="#ffca40" stop-opacity="0"/></linearGradient><linearGradient id="f542idd" x1="14.812" x2="11.004" y1="6.717" y2="5.04" gradientUnits="userSpaceOnUse"><stop stop-color="#ffed67"/><stop offset="1" stop-color="#ffed67" stop-opacity="0"/></linearGradient><linearGradient id="f542ide" x1="8.687" x2="14.437" y1="9.406" y2="9.406" gradientUnits="userSpaceOnUse"><stop stop-color="#e9a73e"/><stop offset="1" stop-color="#ffc524"/></linearGradient><linearGradient id="f542idf" x1="10.738" x2="10.738" y1="11.624" y2="8.626" gradientUnits="userSpaceOnUse"><stop stop-color="#f0960f"/><stop offset="1" stop-color="#f0960f" stop-opacity="0"/></linearGradient><linearGradient id="f542idg" x1="10.39" x2="9.856" y1="5.906" y2="7.137" gradientUnits="userSpaceOnUse"><stop stop-color="#ffd863"/><stop offset="1" stop-color="#ffd863" stop-opacity="0"/></linearGradient><filter id="f542idh" width="28.811" height="22.656" x="2.094" y="6.344" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="1" dy="-1.5"/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 0.839216 0 0 0 0 0.541176 0 0 0 0 0.294118 0 0 0 1 0"/><feBlend in2="shape" result="effect1_innerShadow_20020_4291"/></filter><filter id="f542idi" width="15.781" height="10.719" x="5.546" y="17.688" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_20020_4291" stdDeviation=".5"/></filter><filter id="f542idj" width="6.851" height="7.657" x="9.699" y="2.517" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_20020_4291" stdDeviation=".5"/></filter><filter id="f542idk" width="2.391" height="2.502" x="8.906" y="4.933" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_20020_4291" stdDeviation=".25"/></filter></defs></g></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><g clip-path="url(#f2230idv)"><path fill="url(#f2230idh)" d="M10.582 13.718c1.2-.442 2.367.725 1.925 1.926L9.89 22.758a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230id0)" d="M10.582 13.718c1.2-.442 2.367.725 1.925 1.926L9.89 22.758a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230idi)" d="M10.582 13.718c1.2-.442 2.367.725 1.925 1.926L9.89 22.758a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230idj)" d="M16.582 19.718c1.2-.442 2.367.725 1.925 1.926l-2.619 7.114a1 1 0 0 1-1.645.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230id1)" d="M16.582 19.718c1.2-.442 2.367.725 1.925 1.926l-2.619 7.114a1 1 0 0 1-1.645.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230id2)" d="M16.582 19.718c1.2-.442 2.367.725 1.925 1.926l-2.619 7.114a1 1 0 0 1-1.645.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><g filter="url(#f2230idr)"><path fill="url(#f2230idk)" d="M22.4 3.55a.15.15 0 0 1 .162.034l5.885 5.93a.15.15 0 0 1 .033.162c-1.41 3.46-3.353 7.14-5.954 9.742c-2.534 2.534-6.82 4.693-10.69 6.281l-5.491-5.492c1.588-3.87 3.747-8.155 6.281-10.689c2.61-2.61 6.304-4.557 9.773-5.967"/><path fill="url(#f2230id3)" d="M22.4 3.55a.15.15 0 0 1 .162.034l5.885 5.93a.15.15 0 0 1 .033.162c-1.41 3.46-3.353 7.14-5.954 9.742c-2.534 2.534-6.82 4.693-10.69 6.281l-5.491-5.492c1.588-3.87 3.747-8.155 6.281-10.689c2.61-2.61 6.304-4.557 9.773-5.967"/><path fill="url(#f2230id4)" d="M22.4 3.55a.15.15 0 0 1 .162.034l5.885 5.93a.15.15 0 0 1 .033.162c-1.41 3.46-3.353 7.14-5.954 9.742c-2.534 2.534-6.82 4.693-10.69 6.281l-5.491-5.492c1.588-3.87 3.747-8.155 6.281-10.689c2.61-2.61 6.304-4.557 9.773-5.967"/><path fill="url(#f2230id5)" d="M22.4 3.55a.15.15 0 0 1 .162.034l5.885 5.93a.15.15 0 0 1 .033.162c-1.41 3.46-3.353 7.14-5.954 9.742c-2.534 2.534-6.82 4.693-10.69 6.281l-5.491-5.492c1.588-3.87 3.747-8.155 6.281-10.689c2.61-2.61 6.304-4.557 9.773-5.967"/><path fill="url(#f2230id6)" d="M22.4 3.55a.15.15 0 0 1 .162.034l5.885 5.93a.15.15 0 0 1 .033.162c-1.41 3.46-3.353 7.14-5.954 9.742c-2.534 2.534-6.82 4.693-10.69 6.281l-5.491-5.492c1.588-3.87 3.747-8.155 6.281-10.689c2.61-2.61 6.304-4.557 9.773-5.967"/></g><g filter="url(#f2230ids)"><path fill="url(#f2230idl)" d="M24.5 11.062a3.36 3.36 0 1 1-6.719 0a3.36 3.36 0 0 1 6.719 0"/><path fill="url(#f2230id7)" d="M24.5 11.062a3.36 3.36 0 1 1-6.719 0a3.36 3.36 0 0 1 6.719 0"/></g><path fill="url(#f2230id8)" d="M23.466 11.062a2.326 2.326 0 1 1-4.651 0a2.326 2.326 0 0 1 4.651 0"/><g filter="url(#f2230idt)"><path fill="url(#f2230id9)" d="M2.423 29.533C1.716 28.826 2 23.922 4.5 22.922c0 0 2.5-1 4.111.6s.889 3.4.889 3.4c-.707 2.121-3.717 2.964-4.071 2.61c-.195-.195.156-.55 0-.706c-.156-.157-.398.022-1.06.353c-.472.236-1.663.637-1.946.354"/><path fill="url(#f2230ida)" d="M2.423 29.533C1.716 28.826 2 23.922 4.5 22.922c0 0 2.5-1 4.111.6s.889 3.4.889 3.4c-.707 2.121-3.717 2.964-4.071 2.61c-.195-.195.156-.55 0-.706c-.156-.157-.398.022-1.06.353c-.472.236-1.663.637-1.946.354"/></g><path fill="url(#f2230idm)" d="M6.06 20.982a1.5 1.5 0 0 1 2.122 0l3.535 3.536a1.5 1.5 0 0 1-2.12 2.121L6.06 23.104a1.5 1.5 0 0 1 0-2.122"/><path fill="url(#f2230idb)" d="M6.06 20.982a1.5 1.5 0 0 1 2.122 0l3.535 3.536a1.5 1.5 0 0 1-2.12 2.121L6.06 23.104a1.5 1.5 0 0 1 0-2.122"/><path fill="url(#f2230idc)" d="M6.06 20.982a1.5 1.5 0 0 1 2.122 0l3.535 3.536a1.5 1.5 0 0 1-2.12 2.121L6.06 23.104a1.5 1.5 0 0 1 0-2.122"/><path fill="url(#f2230idn)" d="M29.172 2.871c-.947-.947-2.608-.84-3.818-.424a58 58 0 0 0-2.714 1.007a.1.1 0 0 0-.034.163l5.81 5.849a.1.1 0 0 0 .162-.033a58 58 0 0 0 1.019-2.743c.41-1.194.74-2.654-.425-3.819"/><path fill="url(#f2230idd)" d="M29.172 2.871c-.947-.947-2.608-.84-3.818-.424a58 58 0 0 0-2.714 1.007a.1.1 0 0 0-.034.163l5.81 5.849a.1.1 0 0 0 .162-.033a58 58 0 0 0 1.019-2.743c.41-1.194.74-2.654-.425-3.819"/><path fill="url(#f2230ido)" d="M29.172 2.871c-.947-.947-2.608-.84-3.818-.424a58 58 0 0 0-2.714 1.007a.1.1 0 0 0-.034.163l5.81 5.849a.1.1 0 0 0 .162-.033a58 58 0 0 0 1.019-2.743c.41-1.194.74-2.654-.425-3.819"/><path fill="url(#f2230idp)" d="M13.582 16.718c1.2-.442 2.367.725 1.925 1.926l-2.618 7.114a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230ide)" d="M13.582 16.718c1.2-.442 2.367.725 1.925 1.926l-2.618 7.114a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230idf)" d="M13.582 16.718c1.2-.442 2.367.725 1.925 1.926l-2.618 7.114a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><path fill="url(#f2230idg)" d="M13.582 16.718c1.2-.442 2.367.725 1.925 1.926l-2.618 7.114a1 1 0 0 1-1.646.362l-5.138-5.138a1 1 0 0 1 .362-1.645z"/><g filter="url(#f2230idu)"><path fill="url(#f2230idq)" d="m9.205 22.047l5.625-4.407l-3.625 6.438z"/></g></g><defs><radialGradient id="f2230id0" cx="0" cy="0" r="1" gradientTransform="matrix(7.52114 -2.73117 .46436 1.27875 2.398 17.063)" gradientUnits="userSpaceOnUse"><stop offset=".164" stop-color="#ff8db0"/><stop offset="1" stop-color="#ff8db0" stop-opacity="0"/></radialGradient><radialGradient id="f2230id1" cx="0" cy="0" r="1" gradientTransform="rotate(86.482 -4.515 18.853)scale(7.63907 6.58606)" gradientUnits="userSpaceOnUse"><stop offset=".757" stop-color="#e76cbe" stop-opacity="0"/><stop offset=".951" stop-color="#e76cbe"/></radialGradient><radialGradient id="f2230id2" cx="0" cy="0" r="1" gradientTransform="matrix(2.84378 -4.43748 1.94916 1.24913 13.454 26.234)" gradientUnits="userSpaceOnUse"><stop stop-color="#ff5898"/><stop offset="1" stop-color="#ff5898" stop-opacity="0"/></radialGradient><radialGradient id="f2230id3" cx="0" cy="0" r="1" gradientTransform="matrix(-13.22128 -10.16449 19.10663 -24.85262 23.97 21.577)" gradientUnits="userSpaceOnUse"><stop offset=".811" stop-color="#e7e5e5" stop-opacity="0"/><stop offset="1" stop-color="#e7e5e5"/></radialGradient><radialGradient id="f2230id4" cx="0" cy="0" r="1" gradientTransform="matrix(5.34972 -8.21554 3.86123 2.51432 9.181 21.31)" gradientUnits="userSpaceOnUse"><stop offset=".281" stop-color="#b5a3a5"/><stop offset="1" stop-color="#b5a3a5" stop-opacity="0"/></radialGradient><radialGradient id="f2230id5" cx="0" cy="0" r="1" gradientTransform="rotate(-73.625 16.594 5.807)scale(8.69119 1.4727)" gradientUnits="userSpaceOnUse"><stop offset=".208" stop-color="#b28f96"/><stop offset="1" stop-color="#b28f96" stop-opacity="0"/></radialGradient><radialGradient id="f2230id6" cx="0" cy="0" r="1" gradientTransform="matrix(-9.68 8.93746 -2.77498 -3.00553 27.11 7.11)" gradientUnits="userSpaceOnUse"><stop stop-color="#faecf1"/><stop offset="1" stop-color="#faecf1" stop-opacity="0"/></radialGradient><radialGradient id="f2230id7" cx="0" cy="0" r="1" gradientTransform="rotate(90 5.04 16.102)scale(3.35938)" gradientUnits="userSpaceOnUse"><stop offset=".587" stop-color="#93859b"/><stop offset="1" stop-color="#93859b" stop-opacity="0"/></radialGradient><radialGradient id="f2230id8" cx="0" cy="0" r="1" gradientTransform="matrix(0 -4.84559 4.45626 0 21.14 13.388)" gradientUnits="userSpaceOnUse"><stop stop-color="#72cdff"/><stop offset=".738" stop-color="#66acff"/><stop offset="1" stop-color="#3b57f4"/></radialGradient><radialGradient id="f2230id9" cx="0" cy="0" r="1" gradientTransform="matrix(-4.10578 4.10578 -3.22724 -3.22724 8.191 24.247)" gradientUnits="userSpaceOnUse"><stop stop-color="#d46213"/><stop offset="1" stop-color="#ff9542"/></radialGradient><radialGradient id="f2230ida" cx="0" cy="0" r="1" gradientTransform="matrix(-4.72447 -5.39938 5.69005 -4.9788 8.304 28.97)" gradientUnits="userSpaceOnUse"><stop offset=".871" stop-color="#ffc484" stop-opacity="0"/><stop offset="1" stop-color="#ffc484"/></radialGradient><radialGradient id="f2230idb" cx="0" cy="0" r="1" gradientTransform="matrix(.34375 1.59375 -1.40812 .30371 6.83 21.453)" gradientUnits="userSpaceOnUse"><stop stop-color="#8e839a"/><stop offset="1" stop-color="#8e839a" stop-opacity="0"/></radialGradient><radialGradient id="f2230idc" cx="0" cy="0" r="1" gradientTransform="matrix(4.16202 4.61197 -2.4175 2.18165 7.207 22.418)" gradientUnits="userSpaceOnUse"><stop offset=".86" stop-color="#6175b9" stop-opacity="0"/><stop offset="1" stop-color="#6175b9"/></radialGradient><radialGradient id="f2230idd" cx="0" cy="0" r="1" gradientTransform="rotate(135 13.469 8.126)scale(8.24677 1.9797)" gradientUnits="userSpaceOnUse"><stop offset=".189" stop-color="#ff5971"/><stop offset="1" stop-color="#ff5971" stop-opacity="0"/></radialGradient><radialGradient id="f2230ide" cx="0" cy="0" r="1" gradientTransform="matrix(6.96875 -2.65623 .69538 1.82436 6.236 19.422)" gradientUnits="userSpaceOnUse"><stop stop-color="#ff95af"/><stop offset="1" stop-color="#ff95af" stop-opacity="0"/></radialGradient><radialGradient id="f2230idf" cx="0" cy="0" r="1" gradientTransform="matrix(3.27669 3.24305 -.95797 .9679 5.398 20.308)" gradientUnits="userSpaceOnUse"><stop offset=".382" stop-color="#e14678"/><stop offset="1" stop-color="#e14678" stop-opacity="0"/></radialGradient><radialGradient id="f2230idg" cx="0" cy="0" r="1" gradientTransform="matrix(.6875 7.375 -7.85914 .73263 11.58 19.14)" gradientUnits="userSpaceOnUse"><stop offset=".832" stop-color="#e67bc7" stop-opacity="0"/><stop offset="1" stop-color="#e67bc7"/></radialGradient><linearGradient id="f2230idh" x1="8.111" x2="3.111" y1="17.308" y2="16.484" gradientUnits="userSpaceOnUse"><stop stop-color="#ee2452"/><stop offset="1" stop-color="#f63e7a"/></linearGradient><linearGradient id="f2230idi" x1="4.905" x2="5.72" y1="19.733" y2="18.938" gradientUnits="userSpaceOnUse"><stop offset=".491" stop-color="#dd467c"/><stop offset="1" stop-color="#dd467c" stop-opacity="0"/></linearGradient><linearGradient id="f2230idj" x1="17.892" x2="11.674" y1="21.672" y2="26.551" gradientUnits="userSpaceOnUse"><stop stop-color="#f83267"/><stop offset="1" stop-color="#ff3190"/></linearGradient><linearGradient id="f2230idk" x1="13.486" x2="22.298" y1="8.672" y2="17.547" gradientUnits="userSpaceOnUse"><stop stop-color="#ccbbc0"/><stop offset="1" stop-color="#ead2ec"/></linearGradient><linearGradient id="f2230idl" x1="17.781" x2="24.5" y1="10.491" y2="11.062" gradientUnits="userSpaceOnUse"><stop stop-color="#a796a0"/><stop offset="1" stop-color="#a5959f"/></linearGradient><linearGradient id="f2230idm" x1="5.798" x2="11.298" y1="21.953" y2="27.359" gradientUnits="userSpaceOnUse"><stop stop-color="#452860"/><stop offset="1" stop-color="#51509f"/></linearGradient><linearGradient id="f2230idn" x1="29.177" x2="25.501" y1="2.876" y2="6.552" gradientUnits="userSpaceOnUse"><stop stop-color="#ff3745"/><stop offset="1" stop-color="#ed224b"/></linearGradient><linearGradient id="f2230ido" x1="25.822" x2="26.189" y1="6.797" y2="6.414" gradientUnits="userSpaceOnUse"><stop stop-color="#d2575e"/><stop offset="1" stop-color="#f93251" stop-opacity="0"/></linearGradient><linearGradient id="f2230idp" x1="15.16" x2="8.674" y1="17.065" y2="23.551" gradientUnits="userSpaceOnUse"><stop stop-color="#ff2644"/><stop offset="1" stop-color="#ff2982"/></linearGradient><linearGradient id="f2230idq" x1="13.986" x2="9.861" y1="18.109" y2="22.422" gradientUnits="userSpaceOnUse"><stop stop-color="#ff5970"/><stop offset="1" stop-color="#ff5794"/></linearGradient><filter id="f2230idr" width="22.396" height="22.659" x="6.095" y="3.04" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="-.25" dy="-.5"/><feGaussianBlur stdDeviation=".75"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 0.745098 0 0 0 0 0.772549 0 0 0 0 0.952941 0 0 0 1 0"/><feBlend in2="shape" result="effect1_innerShadow_18_13076"/></filter><filter id="f2230ids" width="8.719" height="8.719" x="16.781" y="6.953" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy=".25"/><feGaussianBlur stdDeviation=".5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0.866667 0 0 0 0 0.764706 0 0 0 0 0.847059 0 0 0 1 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_18_13076"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_18_13076" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="-.1" dy=".1"/><feGaussianBlur stdDeviation=".05"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 0.721569 0 0 0 0 0.690196 0 0 0 0 0.701961 0 0 0 1 0"/><feBlend in2="shape" result="effect2_innerShadow_18_13076"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx=".1" dy="-.1"/><feGaussianBlur stdDeviation=".05"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 0.615686 0 0 0 0 0.560784 0 0 0 0 0.65098 0 0 0 1 0"/><feBlend in2="effect2_innerShadow_18_13076" result="effect3_innerShadow_18_13076"/></filter><filter id="f2230idt" width="7.574" height="7.217" x="2.088" y="22.413" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="-.2"/><feGaussianBlur stdDeviation=".2"/><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/><feColorMatrix values="0 0 0 0 0.847059 0 0 0 0 0.505882 0 0 0 0 0.360784 0 0 0 1 0"/><feBlend in2="shape" result="effect1_innerShadow_18_13076"/></filter><filter id="f2230idu" width="7.625" height="8.438" x="8.205" y="16.64" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_18_13076" stdDeviation=".5"/></filter><clipPath id="f2230idv"><path fill="#fff" d="M0 0h32v32H0z"/></clipPath></defs></g></svg>
                </div>
            `

            const header = document.createElement('h1');
            header.textContent = `Übungsfortschritt für ${exercise === undefined ? 'Unbekannte Übung' : exercise.Name}`;
            titleWrapper.appendChild(header);
        }

        const exerciseHistory = await exercisesService.getExerciseHistory(this.#exerciseId);

        if (exerciseHistory === undefined) {
            this.#displayFallback();
            return;
        }

        const highestWeight = exerciseHistory.History.toSorted((firstEntry, secondEntry) => (secondEntry.Weight - firstEntry.Weight))[0].Weight;
        const bestSetEver = exerciseHistory.History
            .filter((entry) => (entry.Weight === highestWeight))
            .toSorted((firstEntry, secondEntry) => (secondEntry.Reps - firstEntry.Reps))[0];

        const bestSetElement = this.shadowRoot?.querySelector('p');
        if (bestSetElement) {
            bestSetElement.textContent = `Bester Satz: ${bestSetEver.Weight}kg x ${bestSetEver.Reps} Wiederholungen (${formatDate(bestSetEver.Date)})`;
        }

        const historyByDay = exerciseHistory.History
            .reduce(this.groupHistoryEntriesByDate, [])
            .toSorted((firstGroup, secondGroup) => (compareDate(secondGroup[0].Date, firstGroup[0].Date)));

        const dayList = this.shadowRoot?.querySelector('ul');
        if (dayList) {
            dayList.className = 'dayList';
            historyByDay.forEach((day) => {
                dayList.appendChild(this.#createHistoryDay(day));
            });
        }
    }

    /** 
     * @param {ExerciseHistoryEntry[][]} groupedEntries 
     * @param {ExerciseHistoryEntry} entry 
     * @returns {ExerciseHistoryEntry[][]}
     * */
    groupHistoryEntriesByDate(groupedEntries, entry) {
        if (groupedEntries.length === 0) {
            return [[entry]];
        }

        const lastEntryGroup = groupedEntries[groupedEntries.length - 1];
        if (isSameDay(lastEntryGroup[0].Date, entry.Date)) {
            const newLastEntryGroup = [...lastEntryGroup, entry];
            const groupedEntriesWithoutLast = groupedEntries.slice(0, -1);
            return [...groupedEntriesWithoutLast, newLastEntryGroup];
        }

        return [...groupedEntries, [entry]];
    }

    /** 
     * @param {ExerciseHistoryEntry[]} historyEntries 
     *  */
    #createHistoryDay(historyEntries) {
        const date = historyEntries[0].Date;
        const dayElement = document.createElement('li');
        dayElement.className = 'dayCard';

        const dateElement = document.createElement('h2');
        dateElement.textContent = formatDate(date);
        dayElement.appendChild(dateElement);

        const setsList = document.createElement('ul');
        setsList.className = 'card';

        historyEntries.forEach((entry, index) => {
            const setElement = document.createElement('li');
            setElement.className = 'setWrapper';

            const setIndexElement = document.createElement('p');
            setIndexElement.textContent = `${index + 1}. Satz:`;
            setElement.appendChild(setIndexElement);

            const weightElement = document.createElement('p');
            weightElement.textContent = `${entry.Weight}kg`;
            setElement.appendChild(weightElement);

            const repsElement = document.createElement('p');
            repsElement.textContent = `${entry.Reps} Wiederholungen`;
            setElement.appendChild(repsElement);

            setsList.appendChild(setElement);
        });

        dayElement.appendChild(setsList);

        return dayElement;
    }

    #displayFallback() {
        const fallbackElement = document.createElement('p');
        fallbackElement.textContent = 'Du hast noch keinen Fortschritt für diese Übung aufgezeichnet.';
        this.shadowRoot?.querySelector(`.${globalClassNames.pageContainer}`)?.appendChild(fallbackElement);
    }
}

customElements.define('fit-exercise-history-page', ExerciseHistoryPage);