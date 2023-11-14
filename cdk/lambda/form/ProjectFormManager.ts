
export class ProjectFormManager {
    questions: string[];
    customQuestions: string[];

    constructor() {
        this.questions = [];
        this.customQuestions = [];
    }

    addCustomQuestion(question: string) {
        this.customQuestions.push(question);
    }

    deleteCustomQuestion(question: string) {
        const index = this.customQuestions.indexOf(question);
        if (index !== -1) {
            this.customQuestions.splice(index, 1);
        }
    }

    // Define other methods for managing questions as needed

    getQuestions() {
        return [...this.questions, ...this.customQuestions];
    }
}

// Define a class to manage the Project type attributes
export class ProjectAttributesManager {
    attributes: Record<string, string | Record<string, any>>; // Union type and index signature
  
    constructor() {
      this.attributes = {};
    }
  
    // Define methods to set and get attributes
    setAttribute(name: string, value: string | Record<string, any>) {
        this.attributes[name] = value;
    }

    setAttributeWithPrefix(prefix: string, name: string, value: string | Record<string, any>) {
        const attributeName = `${prefix}_${name}`;
        this.setAttribute(attributeName, value);
    }
    
    getAttributes() {
        return this.attributes;
    }

    deleteAttribute(name: string) {
        delete this.attributes[name];
    }
}

// Example Usage 
// Instantiate the form and attributes managers
// const projectForm = new ProjectFormManager();
// const projectAttributes = new ProjectAttributesManager();

// Example usage of adding a custom question
// projectForm.addCustomQuestion('Custom Question 1');

// Example usage of setting a project attribute
// projectAttributes.setAttribute('customAttribute1', 'Custom Value 1');

// Example usage of getting questions and attributes
// const questions = projectForm.getQuestions();
// const attributes = projectAttributes.getAttributes();

