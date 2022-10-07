import { getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"




const incomplete = (currentObject) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()
    let requestsHtml = ''
    const completed = completions.find(completion => completion.requestId === currentObject.id)
    if (!completed) {
        requestsHtml += `
        <li>
        ${currentObject.description}
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>`


        plumbers.forEach(plumber => {
            requestsHtml += ` <option value="${currentObject.id}--${plumber.id}">${plumber.name}</option>`
        })
        requestsHtml += ` </select>
        <button class="request__delete"
        id="request--${currentObject.id}">
        Delete
        </button>

        </li>
        `
    }
    return requestsHtml
}
const completed = (currentObject) => {
    const completions = getCompletions()
    let newArray = []

    if (completions.find(completion => completion.requestId === currentObject.id)) {
        newArray.push(`<li>Completed request #${currentObject.id}</li>`)

    }

    return newArray
}




export const Requests = () => {
    const requests = getRequests()

    let html = `
            <div class="request">
                ${requests.map(incomplete).join("")}

            <div class="completed">
                ${requests.map(completed).join("")}
        </div>       
        `

    return html
}
document.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)





