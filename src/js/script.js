const wrapper = document.querySelector('.wrapper')
const search = document.querySelector('.search__input')
// const items = document.querySelectorAll('.users li')
let users = null

// {
//   "id": "02a521fd-f67c-432d-9d75-ad481a691bef",
//   "first_name": "Bates",
//   "last_name": "Marquez ",
//   "status": true,
//   "comments": 3,
//   "rate": 5,
//   "avatar": "http://placehold.it/32x32",
//   "speciality": [
//     "Хирург",
//     "Гастроэнтеролог",
//     "Терапевт"
//   ]
// },

const createUser = (userData) => {
  const userCard = document.createElement('section')
  const avatar = document.createElement('img')
  const user = document.createElement('div')
  const userTitle = document.createElement('h3')
  const userStatus = document.createElement('span')
  const userRate = document.createElement('div')
  const star = document.createElement('img')
  const rateCount = document.createElement('span')
  const comments = document.createElement('span')
  const userPosition = document.createElement('div')
  const userCost = document.createElement('div')
  const costCurrency = document.createElement('span')
  const costTime = document.createElement('span')

  userCard.className = 'user-card'
  avatar.className = 'avatar'
  user.className = 'user'
  userTitle.className = 'user__title'
  userStatus.className = 'user__status'
  userRate.className = 'user__rate rate'
  star.className = 'rate__star'
  rateCount.className = 'rate__count'
  comments.className = 'comments'
  userPosition.className = 'user__position'
  userCost.className = 'user__cost cost'
  costCurrency.className = 'cost__currency'
  costTime.className = 'cost__time'

  avatar.setAttribute('src', userData.avatar)
  star.setAttribute('src', '../img/Star.svg')

  userCard.appendChild(avatar)
  userCard.appendChild(user)

  userTitle.innerText = `${userData.first_name} ${userData.last_name}`
  userStatus.innerText = userData.status ? 'В сети' : 'Не в сети'
  rateCount.innerText = `(${userData.rate})`
  userPosition.innerText = userData.speciality ? userData.speciality.join(', ') : ''

  for (let i = 0; i < userData.rate; i++) {
    userRate.appendChild(star.cloneNode())
  }

  userRate.appendChild(rateCount)
  user.appendChild(userTitle)
  user.appendChild(userStatus)
  user.appendChild(userRate)
  user.appendChild(userPosition)

  wrapper.appendChild(userCard)
  console.log('avatar -> ', userCard)
}

const appendUsers = (data) => {
  users = data
  users.forEach((user) => {
    createUser(user)
  })
}

fetch('../data/users.json')
  .then(response => response.json())
  .then(data => appendUsers(data))


// search.addEventListener('input', (e) => {
//   const value = e.target.value.trim()

//   if (value) {
//     items.forEach((elem) => {
//       if (elem.innerText.search(value) === -1) {
//         elem.classList.add('hide')
//         elem.innerHTML = elem.innerText
//       } else {
//         elem.classList.remove('hide')
//         let str = elem.innerText
//         elem.innerHTML = highlightMark(str, elem.innerText.search(value), value.length)
//       }
//     })
//   } else {
//     items.forEach((elem) => {
//       elem.classList.remove('hide')
//       elem.innerHTML = elem.innerText
//     })
//   }
// })

// const highlightMark = (str, position, lenght) => {
//   return str.slice(0, position) + '<mark>' + str.slice(position, position + lenght) + '</mark>' + str.slice(position + lenght);
// }