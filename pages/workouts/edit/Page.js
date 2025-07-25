import '/models/Workout.js';
import '/models/Exercise.js';
import '/models/ExerciseResponse.js';
import { EditExerciseCard } from '/pages/workouts/components/EditExerciseCard.js';
import { workoutsService } from '/services/WorkoutsService.js';
import { appRouter, appRouterIds } from '/Routes.js';
import { globalClassNames } from '/Constants.js';
import { exercisesService } from '/services/ExercisesService.js';

export class WorkoutsEditPage extends HTMLElement {
    #ids = {
        exercisesList: 'exercisesList',
        addExerciseButton: 'addExerciseButton',
        workoutForm: 'workoutForm',
    };

    #inputNames = {
        name: 'name',
    };

    #exercisesAmount = 0;

    /** @type {number | null} */
    #workoutId = null;

    constructor() {
        super();

        this.saveWorkout = this.saveWorkout.bind(this);

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                @import url('/globals.css');
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
            </style>
            <div class="pageContainer">
                <h1>Workout erstellen</h1>
                <form id="${this.#ids.workoutForm}">
                    <div class="${globalClassNames.inputWrapper}">
                        <label for="${this.#inputNames.name}">Workout Name</label>
                        <input id="${this.#inputNames.name}" name="${this.#inputNames.name}" required />
                    </div>
                    <ul id="${this.#ids.exercisesList}"></ul>
                    <button
                        id="${this.#ids.addExerciseButton}"
                        type="button"
                        class="button outlined">
                        Übung hinzufügen
                    </button>
                    <button type="submit" class="button">Speichern</button>
                </form>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot
            ?.getElementById(this.#ids.addExerciseButton)
            ?.addEventListener('click', () => this.addExercise());

        this.shadowRoot
            ?.getElementById(this.#ids.workoutForm)
            ?.addEventListener('submit', this.saveWorkout);

        const id = appRouter.getParamValue('id');

        if (id !== null) {
            const header = this.shadowRoot?.querySelector('h1');

            if (header) {
                header.textContent = 'Workout bearbeiten';
            }

            this.#workoutId = Number(id);
            this.#initializeWorkout();
        }
    }

    async #initializeWorkout() {
        if (this.#workoutId === null) {
            return;
        }

        const workout = await workoutsService.getUserWorkout(this.#workoutId);

        if (workout === undefined) {
            return;
        }

        const nameInput = this.shadowRoot?.getElementById(this.#inputNames.name);

        if (nameInput instanceof HTMLInputElement) {
            nameInput.value = workout.Name;
        }

        workout.Exercises.forEach(async (exercise) => {
            const doesExerciseExist = await exercisesService.doesExerciseExist(exercise.ID);

            if (!doesExerciseExist) {
                return;
            }

            this.addExercise(exercise);
        });
    }

    /** @param {WorkoutExercise} [exercise]  */
    addExercise(exercise) {
        const exerciseElement = new EditExerciseCard();

        exerciseElement.setAttribute('exerciseId', String(this.#exercisesAmount));

        if (exercise !== undefined) {
            exerciseElement.selectedExerciseId = exercise.ID;
            exerciseElement.setsAmount = String(exercise.Sets);
        }

        this.shadowRoot
            ?.getElementById(this.#ids.exercisesList)
            ?.appendChild(exerciseElement);

        this.#exercisesAmount += 1;
    }

    /** @param {SubmitEvent} event  */
    async saveWorkout(event) {
        event.preventDefault();

        if (!(event.currentTarget instanceof HTMLFormElement)) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const workoutName = formData.get(this.#inputNames.name);

        if (typeof workoutName !== 'string') {
            return;
        }

        /** @type {WorkoutExercise[]} */
        const exercises = [];
        this.shadowRoot
            ?.querySelectorAll('fit-edit-exercise-card')
            .forEach((card) => {
                if (!(card instanceof EditExerciseCard) || card.selectedExerciseId === null) {
                    return;
                }

                exercises.push({
                    ID: card.selectedExerciseId,
                    Sets: Number(card.setsAmount)
                });
            });

        // TODO: Add validation
        if (exercises.length < 1 || exercises.some((exercise) => exercise.ID === null)) {
            return;
        }

        if (this.#workoutId === null) {
            await workoutsService.addUserWorkout({
                Name: workoutName,
                Exercises: exercises,
            });
        } else {
            await workoutsService.putUserWorkout({
                ID: this.#workoutId,
                Name: workoutName,
                Exercises: exercises,
            });
        }

        appRouter.navigate(appRouterIds.workouts);
    }
}

customElements.define('fit-workouts-edit-page', WorkoutsEditPage);