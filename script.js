// Loggin in with correct credentials: 
const loginSection = document.getElementById("login-section");
const mainSection = document.getElementById("main-section");
document.getElementById("login-btn")
.addEventListener("click", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if(username.value === "admin" && password.value === "admin123"){
        loginSection.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }
    else{
        alert("Wrong username or password");
        username.value = "";
        password.value = "";
    }
});

let allIssues=[];
// Generate labels:
const createLabelBtn = (arr) =>{
    const synBtn = arr.map( (el) => `<button class="border border-yellow-500 bg-yellow-50 text-orange-500 rounded-lg text-sm px-2 py-1">${el}</button>`) ;
    return synBtn.join(" ");
}
//Spinner:
const manageSpinner = (status) => {
    if(status == true)
    {   document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issue-container").classList.add("hidden");
     
    }
     else{
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issue-container").classList.remove("hidden");

}
}
// Loading all Issues:
const loadIssues = () =>{
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        allIssues=data.data;
        displayIssues(allIssues)}) ;
}
const displayIssues = issues => {
    const issueContainer = document.getElementById("issue-container") ;
    issueContainer.innerHTML = "";
    const issueNumber = document.getElementById("issue-number")
    issueNumber.textContent = issues.length  ;


    // 1.
    issues.forEach(issue =>{
        console.log(issue);
        // 2.
        const issueCard = document.createElement("div");
        issueCard.className = "flex flex-col rounded-xl bg-white shadow-md cursor-pointer";
        issueCard.onclick = () => loadIssueDetail(issue.id);
        issueCard.innerHTML = `
            <div class="h-full p-3 flex flex-col gap-2 border-b border-gray-200 mb-2">
                <div class="flex justify-end"><button class="text-red-600 bg-red-100   rounded-2xl text-xl py-1 px-3">${issue.priority}</button></div>
                <h2 class="h-full text-xl font-semibold">${issue.title}</h2>
                <p class="text-gray-500 text-sm h-full">${issue.description}</p>
            </div>
            <div class = "p-3">${createLabelBtn(issue.labels)}</div>
            <div class="flex flex-col gap-2 p-3">
                <p class="text-gray-500 text-sm " ># ${issue.id} by ${issue.author}</p>
                <p class="text-gray-500 text-sm  " >${new Date(issue.createdAt).toLocaleDateString("en-US")} </p>
            </div>
        
        `;
        // 3/
        issueContainer.append(issueCard);
        if(issue.status === "open"){
            issueCard.classList.add('border-t-4','border-green-400')
        }
        else{
            issueCard.classList.add('border-t-4','border-purple-400')
        }
        
    
    })
    manageSpinner(false);

};
//Categories
    const filterIssues = (category) =>{
const allBtn = document.getElementById("all-btn")
    const openBtn = document.getElementById("open-btn");
    const closedBtn = document.getElementById("closed-btn");
    allBtn.classList.remove("btn-primary") ;
    openBtn.classList.remove("btn-primary") ;
    closedBtn.classList.remove("btn-primary") ;
    if(category === "all"){
        allBtn.classList.add("btn-primary") ;
        displayIssues(allIssues);
    }
    if(category === "open"){
        openBtn.classList.add("btn-primary");
        const openIssues = allIssues.filter(issue => issue.status ==="open") ;
        displayIssues(openIssues)
    }
    if(category === "closed"){
        closedBtn.classList.add("btn-primary");
        const closedIssues = allIssues.filter(issue => issue.status ==="closed") ;
        displayIssues(closedIssues)
    }
}


// Modal
const loadIssueDetail = async(id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetail(details.data);
};

const displayIssueDetail = (issue) =>{
    console.log(issue);
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `
        <h2 class="text-3xl font-bold">${issue.title}</h2>
        <div class="flex flex-row gap-1">
            <button class ="bg-gray-400 text-white text-lg px-2 py-1 rounded-sm border-none">${issue.status} </button>
            <span class="text-gray-500 text-lg  ">•</span>
            <p class="text-gray-500 text-lg  ">${issue.status} by ${issue.author}</p>
            <span class="text-gray-500 text-lg  ">•</span>
            <p class="text-gray-500 text-lg  " >${new Date(issue.createdAt).toLocaleDateString("en-US")} </p>

        </div>
        <div >${createLabelBtn(issue.labels)}</div>
        <p class="text-gray-500 text-xl  ">${issue.description}</p>
        <div class = "flex flex-row justify-between bg-gray-100 rounded-md p-4">
            <div class = "flex flex-col gap-1">
                <p class="text-gray-500 text-xl  ">Assignee:</p>
                <p class=" font-semibold text-xl  ">${issue.author}</p>
            </div>
            <div class = "flex flex-col gap-1">
                <p class="text-gray-500 text-xl  ">Priority:</p>
                <button class="bg-red-400 text-white   rounded-2xl text-xl py-1 px-3">${issue.priority}</button>
            </div>
        </div>
        
        
    
    `;
    const modal = document.getElementById("issue_modal");
    modal.showModal();
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }




}


loadIssues();

//Searching:
document.getElementById("search-btn")
.addEventListener("click", ()=>{
   const input = document.getElementById("search-input");
   const searchValue = input.value.trim(); //trim= removes space
//    console.log(searchValue);
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res=>res.json())
    .then(data=>{
        
        displayIssues(data.data);
        
    }  )
     ;
     

})

