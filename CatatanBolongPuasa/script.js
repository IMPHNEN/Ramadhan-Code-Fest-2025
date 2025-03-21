let database = JSON.parse(localStorage.getItem("database") || "[]")

const add = document.getElementById("add")

function showAdd() {
    add.classList.remove("hidden");
    add.classList.add("flex")
}

function save(){
    localStorage.setItem("database",JSON.stringify(database))
}


function hideAdd() {
    add.classList.remove("flex");
    add.classList.add("hidden")
}

function Delete(index){
    data = []
    database.forEach((element,i) => {
        if (index != i) {
            data.push(element)
        }
    })
    database = data
    DrawData(database)
    save()
}

function Search(input){
    data = database.filter((element) => element.alasan.includes(input.value))
    DrawData(data)
}

function handleCheckbox(checkbox){
    const ck = document.querySelectorAll("#select")
    ck.forEach((element)=>{
        element.checked = checkbox.checked
    })
}  

function onCheckbox(index){
    console.log(index)
}

function onALLDelete(){
    const ck = document.querySelectorAll("#select")
    ck.forEach((element) => {
        if (element.checked) {
            data = []
            database.forEach((e,i)=>{
                if (i != parseInt(element.getAttribute("index"))) {
                    data.push(e)
                }
            })
            database = data
        }
    })
    DrawData(database)
    save()
}

const root = document.getElementById("root")
function DrawData(data){
    let element_html = "";
    data.forEach((element , index) => {
        element_html = `
                    <div class="min-h-20 flex hover:bg-neutral-700  ${(index != 0) ? "border-b-neutral-700 border-b-2" : ""}">
                        <div class="w-20 justify-center h-20 flex items-center">
                            <input id="select" index="${index}" class="w-full  h-[30%] " type="checkbox" name="" id="">
                        </div>
                        <div class="flex-1 flex items-center">
                            <p class="text-gray-400">${element.alasan}</p>
                        </div>
    
                        <div class="w-40 flex items-center">
                            <p class="cursor-pointer  text-gray-400">${element.date}</p>
                        </div>
                        <div class="w-30 flex">
                            <button onclick="Delete(${index})" class="hover:text-red-600 cursor-pointer text-red-400">Delete</button>
                        </div>
                    </div>
        ` + element_html
    });
    root.innerHTML = element_html
}
DrawData(database)

function SubmitEvent(event){
    const alasan = document.getElementById("input_alasan")
    const date = document.getElementById("input_date")
    database.push({
        alasan : alasan.value,
        date : date.value
    })
    save()
    DrawData(database)
    hideAdd()
    event.preventDefault()
}
