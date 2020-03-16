let ar = {} // Associative Array
let list_object = document.getElementById("list_object")
let alertDiv_object = document.getElementById("alertDiv_object")

class Node {
    constructor(nodeText, previousNode = undefined, nextNode = []) {
        this.text = nodeText
        this.previous = previousNode
        this.next = nextNode
    }

    addPrev(node) {
        removeFromArray(this.previous.next, this)
        node.previous = this.previous
        node.previous.next.push(node)
        node.next.push(this)
        this.previous = node
    }

    addNext(node) {
        if (arrayHasElem(this.next, node)) {
            alertDiv_object.innerHTML += "<p>Found an extra node \"" + node.text + "\", ignoring.</p>"
        } else {
            this.next.push(node)
            node.previous = this
        }
    }

    traverse() {
        let li = document.createElement("li")
        li.innerText = this.text
        if (this.next.length > 0) {
            let ul = document.createElement("ul")
            this.next.forEach(node => {
                ul.appendChild(node.traverse())
            })
            li.appendChild(ul)
        }
        return li
    }

}


function objectOrientedApproach(data) {
    let head = new Node("-")
    let userArr = data
    for (let x = 0; x < userArr.length; x++) {
        let parrChild = userArr[x].split(" ") // Parrent Child
        let child = parrChild[0]
        let parent = parrChild[1]

        // A child could never have the same value as the parent
        if (child === parent) {
            alertDiv_object.innerHTML += "<p>User had the same value for the parent and the child on line " + (x + 2) + "</p>"
            continue
        }

        if (!ar[parent]) {
            ar[parent] = new Node(parent, head)
        }

        if (!ar[child]) {
            ar[child] = new Node(child, head)
        } else {
            if (nodeHasChild(ar[parent], ar[child], head)) {
                alertDiv_object.innerHTML += "<p>You cannot give a parent a child which parents the parent \"" + child + "\", ignoring.</p>"
                continue;
            }
        }
        removeFromArray(head.next, ar[child])
        ar[child].addPrev(ar[parent])
    }

    // Print all of the nodes on the screen
    setTimeout(() => {
        head.next.forEach(node => {
            list_object.appendChild(node.traverse())
        })
    }, 0);

}

function removeFromArray(userArr, elem) {
    setTimeout(() => {
        for (let x = 0; x < userArr.length; x++) {
            if (userArr[x].text === elem.text) {
                userArr.splice(x, 1)
            }
        }
    }, 0);

}

function arrayHasElem(userArr, elem) {
    for (let x = 0; x < userArr.length; x++) {
        if (userArr[x] === elem)
            return true
    }
    return false
}

function nodeHasChild(parent, child, head) {
    while (parent !== head) {
        if (parent === child) {
            return true
        }
        parent = parent.previous
    }

    return false
}

start()
