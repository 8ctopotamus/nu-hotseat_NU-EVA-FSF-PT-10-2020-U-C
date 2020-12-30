const token = 'xoxb-1438612474789-1616816439825-XxHceAx0Tlpjo8XW47CSE9wg'
const endpoint = `https://slack.com/api/users.list?token=${token}`

const waitList = document.getElementById('waitlist')
const correctamundoList = document.getElementById('correctamundo')

fetch(endpoint)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
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
