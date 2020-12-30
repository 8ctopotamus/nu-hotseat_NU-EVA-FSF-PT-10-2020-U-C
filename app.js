// const token = 'YOUR_SLACK_TOKEN_HERE'
// const endpoint = `https://slack.com/api/users.list?token=${token}`
const endpoint = 'userlist.json'
const waitList = document.getElementById('waitlist')
const correctamundoList = document.getElementById('correctamundo')

fetch(endpoint)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    const membersHTML = json.members
      .filter(member => !member.is_bot)
      .filter(member => !member.is_admin)
      .map(member => {
        return `
          <li data-id="${member.id}">
            <img src="${member.profile.image_72}" alt="Image of ${member.profile.real_name}" />
            <h4>${member.profile.real_name}</h4>
          </li>
        `
      })
      .join('')
    waitList.innerHTML = membersHTML
  })
