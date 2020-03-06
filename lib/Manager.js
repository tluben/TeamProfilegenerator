// The Manager class `extends` from Employee, and should have these additional properties/behaviors:

// officeNumber
// getRole() (Overridden to return 'Manager')

const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super (name, id, email)
        this.officeNumber = officeNumber
    }
    getOfficeNumber(){
        return this.officeNumber
    }
    getRole(){
        return "Manager"
    }

}

module.exports = Manager