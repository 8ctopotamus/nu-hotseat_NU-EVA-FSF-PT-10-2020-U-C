// const token = 'YOUR_SLACK_TOKEN_HERE'
// const endpoint = `https://slack.com/api/users.list?token=${token}`
const endpoint = 'userlist.json'
const randomBtn = document.getElementById('random-btn')
const waitListUL = document.getElementById('waitlist')
const correctamundoUL = document.getElementById('correctamundo')
const hotseatImg = document.querySelector('#hotseat img')
const hotseatH2 = document.querySelector('#hotseat h2')

let waitList = []
const correctamundo = []

const renderList = () => {
  const membersHTML = waitList.map(member => {
    return `
      <li data-id="${member.id}">
        <img src="${member.profile.image_72}" alt="Image of ${member.profile.real_name}" />
        <h4>${member.profile.real_name}</h4>
      </li>
    `
  })
  .join('')
  waitListUL.innerHTML = membersHTML
}

const pickRandom = () => {
  const randomIdx = Math.floor(Math.random() * waitList.length)
  const randomStudent = waitList[randomIdx]
  hotseatImg.setAttribute('src', randomStudent.profile.image_512)
  hotseatImg.setAttribute('alt', randomStudent.real_name)
  hotseatH2.innerText = randomStudent.real_name
}

fetch(endpoint)
  .then(response => response.json())
  .then(json => {
    waitList = json.members
      .filter(member => !member.is_bot)
      .filter(member => !member.is_admin)
      .filter(member => member.id !== 'USLACKBOT')
      .filter(member => !member.deleted)  
    renderList()
  })

randomBtn.addEventListener('click', pickRandom)