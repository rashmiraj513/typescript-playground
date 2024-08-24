var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null',
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var Department = /** @class */ (function () {
  function Department(id, name) {
    this.id = id;
    this.name = name;
    // Since, employees are private previously. So, we can't access this outside this Department class.
    // To access this from inside the child classes of Department class, make the access modifier protected.
    // private employees: string[] = [];
    this.employees = [];
  }
  Department.prototype.describe = function () {
    console.log('Department ('.concat(this.id, '): ').concat(this.name));
  };
  Department.prototype.addEmployee = function (employee) {
    // Validate of the employee first.
    this.employees.push(employee);
  };
  Department.prototype.printEmployeeInformation = function () {
    console.log(this.employees.length);
    console.log(this.employees);
  };
  return Department;
})();
var ITDepartment = /** @class */ (function (_super) {
  __extends(ITDepartment, _super);
  function ITDepartment(id, admins) {
    var _this = _super.call(this, id, 'IT') || this;
    _this.admins = admins;
    return _this;
  }
  return ITDepartment;
})(Department);
var AccountingDepartment = /** @class */ (function (_super) {
  __extends(AccountingDepartment, _super);
  function AccountingDepartment(id, reports) {
    var _this = _super.call(this, id, 'Accounting') || this;
    _this.reports = reports;
    _this.lastReport = reports[0];
    return _this;
  }
  Object.defineProperty(AccountingDepartment.prototype, 'mostRecentReport', {
    // Getter method for lastReport.
    // This is called as a property, not a method. i.e., don't use a parenthesis while calling this.
    get: function () {
      if (this.lastReport) {
        return this.lastReport;
      }
      throw new Error('No report found...');
    },
    // Setter method for lastReport.
    set: function (value) {
      if (!value) {
        throw new Error('Please pass in a valid value!');
      }
      this.addReport(value);
    },
    enumerable: false,
    configurable: true,
  });
  // Overriding addEmployee property of Department class.
  AccountingDepartment.prototype.addEmployee = function (name) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  };
  AccountingDepartment.prototype.addReport = function (text) {
    this.reports.push(text);
    this.lastReport = text;
  };
  AccountingDepartment.prototype.printReports = function () {
    console.log(this.reports);
  };
  return AccountingDepartment;
})(Department);
var it = new ITDepartment('D1', ['Max']);
it.addEmployee('Max');
it.addEmployee('Manu');
it.describe();
var accounting = new AccountingDepartment('D2', []);
accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);
accounting.printReports();
