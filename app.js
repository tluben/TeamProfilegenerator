// Keep these lines; they're important!
const Models = {
    Manager: require("./lib/Manager"),
    Engineer: require("./lib/Engineer"),
    Intern: require("./lib/Intern")
}
// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");
var employees = []

function initqs() {
    inquirer.prompt([
        { type: 'input', name: 'name', message: 'What is your name?' },
   
        { type: 'input', name: 'email', message: 'What is your email?'},
  
        {type:'input', name:'id', message:'What is your id?'},
   
        {type:'list', name:"role", message:"What is your role?", choices: [ "Engineer", "Intern" , "Manager"]}


    ]).then(function (ans) {
    followUp(ans)
})
}

initqs()

function followUp({ name, id, email, role }) {
    if (role === "Engineer") {
        var unique_value = "github"
        // var Role = Engineer
    } else if (role === "Intern") {
        var unique_value = "school"
        // var Role = Intern
    } else {
        var unique_value = "office number"
        // var Role = Manager
    }

    inquirer.prompt([
        { type: 'input', name: 'ans', message: `What is your ${unique_value}?`}
    ]).then(function ({ ans }) {
        //select
        employees.push(new Models[role](name, id, email, ans))
        lastQuestion()
    })
}
function lastQuestion() {
    inquirer.prompt([
    {type:'list', name:"ans", message:"Do you want to add another Employee?", choices: [ "Yes", "No"]}
    ]).then(function ({ ans }) {
        if (ans === "Yes") {
            initqs()
        } else {
            var html = render(employees)
            fs.writeFile(outputPath, html, err => {
                if (err) throw err
            })
        }
    })
    //Do you want to add employee (y/n)
    //if yes - run initqs
    //if no - run render
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!

