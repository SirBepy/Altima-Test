var fileRadiuses = document.fileForm.file
var data
var outerFile
var script = document.createElement('script')

// Initializes the first 3 radiuses
for (var i = 0; i < fileRadiuses.length - 1; i++) {
    fileRadiuses[i].addEventListener('change', function () {
        document.getElementById("uploader").style.opacity = "0"
        initData(this.value)
    });
}

// Initializes the last radius
fileRadiuses[fileRadiuses.length - 1].addEventListener('change', function () {
    document.getElementById("uploader").style.opacity = "1"
    if (outerFile) {
        data = outerFile;
        functionOrientedApproach()
    }
});

// Resets all forms
let forms = document.getElementsByTagName("form")
for (let x = 0; x < forms.length; x++)
    forms[x].reset()

// Read local files
function initData(fileName) {
    if(script.src) {
        return initDataBackup(fileName) 
    }
    let xhr = new XMLHttpRequest()
    xhr.onerror = function () { initDataBackup(fileName) }
    xhr.open("GET", "assets/examples/" + fileName + ".json", true)
    xhr.send()

    // Reading from file and storing in variable
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText)
            functionOrientedApproach()
        }
    }
}

// I was afraid you would not consider my answer to work even though it does,
// This is just in case you are running the file locally
// The application should be as operating system agnostic as possible. -- this line made me think i needed a backup, i know that this isnt dependent on a OS, but it made me think you might try and break my program
function initDataBackup(fileName) {
    if (!script.src) {
        console.log("User is running the file locally, backup running.")
        script.src = "assets/examples/Examples.js"
        document.getElementsByTagName("body")[0].appendChild(script)
        script.onload = () => {
            data = examples[fileName]
            functionOrientedApproach()
        }
    } else {
        data = examples[fileName]
        functionOrientedApproach()
    }
}

// Reads the file uploaded by the user
function handleFileSelect(evt) {
    var files = evt.target.files;
    if (files.length > 0) {
        var reader = new FileReader();
        var file = files[0]
        // Closure to capture the file information.
        reader.onload = (() => {
            return function (e) {
                try {
                    data = JSON.parse(e.target.result);
                    outerFile = data
                    functionOrientedApproach()
                } catch (error) {
                    console.log(error)
                }
            }
        })(file)
        reader.readAsText(file);
    }

}

// Changes the following booleans depending on if they are checked: samename, errors, firstperson
function checkIt(elem) {
    switch (elem.value) {
        case "samename":
            document.getElementById("childparent").style.display = elem.checked ? "block" : "none"
            document.getElementById("firstperson").style.display = elem.checked ? "block" : "none"
            samename = elem.checked
            break;

        case "childparent":
            childParent = elem.checked
            break;
        case "errors":
            errors = elem.checked
            break;
        case "firstperson":
            firstperson = elem.checked
            break;
        default:
            console.log("User chose", elem)
            break;
    }
    if (data) {
        functionOrientedApproach()
    }
}