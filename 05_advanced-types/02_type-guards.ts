// Type Guard
// A code pattern where you check for a certain type before you try to do something with it at the runtime.

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable | Numeric;

const add = (a: Combinable, b: Combinable) => {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
};

type UnknownEmployee = Employee | Admin;

const printEmployeeInformation = (emp: UnknownEmployee) => {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
};

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Rashmi Raj', startDate: new Date() });
