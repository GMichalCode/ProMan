test()


function test() {
    let content = `    <div>
        <ul id="column4" class="connectedSortable">
            <li class="ui-state-default card"><input class="card-title" maxlength="40" id="card-title16" value="card 16" draggable="false"></li>
            <li class="ui-state-default card"><input class="card-title" maxlength="40" id="card-title17" value="card 17" draggable="false"></li>
            <li class="ui-state-default card"><input class="card-title" maxlength="40" id="card-title18" value="card 18" draggable="false"></li>
            <li class="ui-state-default card"><input class="card-title" maxlength="40" id="card-title19" value="card 19" draggable="false"></li>
            <li class="ui-state-default card"><input class="card-title" maxlength="40" id="card-title20" value="card 20" draggable="false"></li>
        </ul>
    </div>`
    addChild('#root', content)
}


function addChild(parentIdentifier, childContent) {
    let parent = document.querySelector(parentIdentifier);
    if (parent) {
        parent.insertAdjacentHTML("beforeend", childContent);
    } else {
        console.error("could not find such html element: " + parentIdentifier)
    }
}