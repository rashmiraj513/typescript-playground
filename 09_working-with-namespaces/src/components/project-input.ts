/// <reference path='base-component.ts' />
/// <reference path='../utils/validation.ts' />
/// <reference path='../decorators/autobind.ts' />
/// <reference path='../state/project.ts' />

namespace App {
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, `user-input`);

      this.titleInputElement = this.element.querySelector(
        '#title',
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        '#description',
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        '#people',
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    renderContent(): void {}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid input, please try again!');
        return;
      }
      return [enteredTitle, enteredDescription, +enteredPeople];
    }

    @autobind
    private submitHandler(e: Event) {
      e.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
  }
}
