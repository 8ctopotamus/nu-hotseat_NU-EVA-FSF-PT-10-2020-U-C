
// const token=
// "xoxb-1438612474789-1616816439825-XxHceAx0Tlpjo8XW47CSE9wg"

// const endPoint = `https://cors-anywhere.herokuapp.com/https://slack.com/api/users.list?token=${token}`
const endPoint = 'userlist.json'

const waitListUL = document.getElementById("waitlist");
const correctMundoListUL = document.querySelector("#correctMundo");


const randomBtn = document.getElementById("random-btn");
const correctBtn = document.getElementById("correct-btn")
const incorrectBtn = document.getElementById("incorrect-btn")
const resetBtn = document.getElementById("reset-btn")
const hotseatimg= document.querySelector("#hotseat img");


const hotseatH2= document.querySelector("#hotseat h2")

let waitList =[];
let removedWaitList =[];
let correctMundo =[];
let randomStudent;
let randomIdx;


const pickRandom = ()=>{
   randomIdx= Math.floor(Math.random()*waitList.length)

   randomStudent = waitList[randomIdx]
   console.log(randomStudent)
   hotseatimg.setAttribute("src", randomStudent.profile.image_512)
   hotseatimg.setAttribute("alt", randomStudent.profile.real_name)
   hotseatH2.innerHTML= randomStudent.profile.real_name
}

const addCrrctMundo = ()=>{
 
   correctMundo.push(randomStudent) 
   console.log(correctMundo)
   
   const crrctString= correctMundo.map(crrMundo=>{
     
      return`<li data-id="${crrMundo.id}" class="correct-mundo">
      <img src="${crrMundo.profile.image_72}" alt="Image of ${crrMundo.profile.real_name}"/>
      <h4>${crrMundo.profile.real_name}</h4>
      </li>
      `;
   
   }).join("")
   correctMundoListUL.innerHTML = crrctString

   removeFrmWaitList(randomIdx)
   }

const removeFrmWaitList = (index)=>{
  removedWaitList = waitList.splice(index, 1)
  console.log(removedWaitList)

  const removedHTML= waitList.map(member =>
    {
      return `
     <li data-id="${member.id}" class="member">
     <img src="${member.profile.image_72}" alt="Image of ${member.profile.real_name}"/>
     <h4>${member.profile.real_name}</h4>
     </li>
     ` }).join("")
 
 waitListUL.innerHTML = removedHTML   
   
}


const renderList = ()=>{
 const membersHTML= waitList.map(member =>
   {
     return `
    <li data-id="${member.id}" class="member">
    <img src="${member.profile.image_72}" alt="Image of ${member.profile.real_name}"/>
    <h4>${member.profile.real_name}</h4>
    </li>
    ` }).join("")

waitListUL.innerHTML = membersHTML

}

const resetList = ()=>{
  correctMundoListUL.innerHTML =""
  waitListUL.innerHTML =""

  waitList.push(correctMundo)
  const resetList = waitList.flat()
  console.log(resetList)

  const resetHTML= resetList.map(member =>
    {
      return `
     <li data-id="${member.id}" class="member">
     <img src="${member.profile.image_72}" alt="Image of ${member.profile.real_name}"/>
     <h4>${member.profile.real_name}</h4>
     </li>
     ` }).join("")
 
 waitListUL.innerHTML = resetHTML


}




fetch(endPoint)
.then(function(response){
  return response.json()
})
.then(function(json){

waitList =json.members
.filter(member =>!member.is_bot)
.filter(member =>!member.is_admin)
.filter(member => member.id !== "USLACKBOT")
.filter(member => !member.deleted)

renderList()
console.log(waitList)
     
})

randomBtn.addEventListener("click", pickRandom)
correctBtn.addEventListener("click", addCrrctMundo)
resetBtn.addEventListener("click",resetList)
// correctBtn.addEventListener("click", removeWaitList)