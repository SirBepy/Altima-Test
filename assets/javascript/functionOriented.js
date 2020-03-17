// Elements that we will use to write our data on
let outputList = document.getElementById("list").getElementsByTagName("ul")[0]
let inputList = document.getElementById("list").getElementsByTagName("ul")[1]
let alertDiv = document.getElementById("list").getElementsByTagName("div")[0]
let samename = false
let childParent = false
let errors = false
let firstperson = false

// Function that uses a function oriented approach for solving the task
// I made a few different ways of solving it but i settled for this one because of its efficiency
function functionOrientedApproach() {
    outputList.innerHTML = ""
    inputList.innerHTML = ""
    alertDiv.innerHTML = ""
    if (errors) {
        alertDiv.innerHTML = "<h1>Errors</h1>"
    }

    let userArr = data
    let ar = {} // Associative Array
    let roots = {}

    for (let i = 0; i < userArr.length; i++) {
        let names = userArr[i].split(" ")
        let child = names[0]
        let parent = names[1]

        if (child === parent && !childParent) {
            printError(child, parent, i, " User tried to give child its parents name")
            continue
        }

        // If the parent was never created, create one
        if (!ar[parent]) {
            ar[parent] = document.createElement("li")
            ar[parent].innerText = parent
            ar[parent].appendChild(document.createElement("ul"))
            roots[parent] = ar[parent]
        }
        // else if the parent existed but never had a child before, create a ul
        else if (ar[parent].getElementsByTagName("ul").length === 0)
            ar[parent].appendChild(document.createElement("ul"))


        // If the child doesnt exist, create it
        // (It is possible it was created as a parent previously)
        if (!ar[child]) {
            ar[child] = document.createElement("li")
            ar[child].innerText = child
        }
        // If the child already has a parent, we will create a new child
        else if ((ar[child].parentElement !== null) && samename) {
            if (firstperson)
                createNewLi(ar, parent, child)
            else
                ar[child] = createNewLi(ar, parent, child)
            continue
        }


        try {
            ar[parent].getElementsByTagName("ul")[0].appendChild(ar[child])

            // It is possible that this child used to be a parent, but a child
            // could never be a root, this makes it easy to eliminate obvious non roots
            if (roots[child]) {
                delete roots[child]
            }
        } catch (error) {
            if (samename)
                createNewLi(ar, parent, child)
            else
                printError(child, parent, i, "User tried to make a cyclic relationship")
        }

    }


    // Print all of the roots on the outputList
    for (key in roots)
        outputList.appendChild(roots[key]);
    // Print the data to the inputList
    for (elem in userArr) {
        let tempLi = document.createElement("li")
        tempLi.innerText = parseInt(elem) + 1 + ". " + userArr[elem]
        inputList.appendChild(tempLi)
    }
}

// Creates and adds a new li tag
function createNewLi(ar, parent, child) {
    let tempLi = document.createElement("li")
    tempLi.innerText = child
    ar[parent].getElementsByTagName("ul")[0].appendChild(tempLi)
    return tempLi
}

// Child and parent are just the strings describing the name, i is the index and message is a custom message
function printError(child, parent, i, message) {
    if (errors) {
        alertDiv.innerHTML += "Error occured when using child: " + child +
            " and parent: " + parent + " on array index " + ++i + " <br> " +
            message + " <hr>"
    }
}