// Call center
//
// Data structure:
// - Job Title
// - Employee
//    - title
//    - id
//    - availble: yes or no
// - Call center with x number of employees
// - The employees list will contain all employees - regardless of availble status
// - The available list will contain all available employees
//
// Questions:
// - How many respondents, managers, and directors do we have? init with reasonable ratio: 10:5:2
// - Are any or all managers or directors available from the get-go?
// - What constitutes their ability to handle the call or not?
// - Is there any case where the Director can't handle?
//
enum Title {
    RESPONDENT,
    MANAGER,
    DIRECTOR
}

class Employee {
    id: number;
    title: Title;
    capable: boolean;

    constructor(id: number, title: Title) {
        this.id = id;
        this.title = title;
        this.capable = true;
    }
}

class CallCenter {
    employees: Employee[] = [];
    available = new Map<Title, Employee[]>();

    constructor() {
        this.init();
    }

    private init() {
        // Respondents
        for (let i = 0; i < 10; i++) {
            this.employees.push(new Employee(this.employees.length, Title.RESPONDENT));
        }

        // Managers
        for (let i = 0; i < 5; i++) {
            this.employees.push(new Employee(this.employees.length, Title.MANAGER));
        }

        // Directors
        for (let i = 0; i < 2; i++) {
            this.employees.push(new Employee(this.employees.length, Title.DIRECTOR));
        }

        // Initialize the map with empty arrays for each title
        this.available.set(Title.RESPONDENT, []);
        this.available.set(Title.MANAGER, []);
        this.available.set(Title.DIRECTOR, []);

        // Initially all employees are available
        for (const employee of this.employees) {
            const titleArray = this.available.get(employee.title);
            if (titleArray) {
                titleArray.push(employee);
            }
        }
    }

    dispatchCall() {
        let esc: Title[] = [ Title.RESPONDENT, Title.MANAGER, Title.DIRECTOR ]
        for (const title of esc) {
            const titleArray = this.available.get(title);
            if (titleArray) {
                const receiver = titleArray[0];
                if (receiver.capable) {
                    titleArray.shift();
                    return;
                }
            }
        }
    }
}
