const search = document.querySelector('#search')
const reset = document.querySelector('.search__reset')
const searchAutocomplete = document.querySelector('#search-autocomplete')

let users = null

const addToPage = (node, parent) => {
  document.querySelectorAll(parent).forEach((el) => {
    el.appendChild(node)
  })
}

const createNewElement = (el, parent) => {
  el.node = el.node || 'div'

  const node = document.createElement(el.node)

  if (el.text) {
    node.innerText = el.text
  }

  if (el.html) {
    node.innerHTML = el.html
  }

  if (el.attr) {
    Object.keys(el.attr).forEach((key) => {
      node.setAttribute(key, el.attr[key])
    });
  }

  return node

  // if (parent) {
  //   addToPage(node, parent)
  // }
}

const getCardWrapper = () => createNewElement({ attr: { class: 'card-wrapper' } })

const getUserCard = () => createNewElement({ attr: { class: 'user-card' } })

const getUserAvatar = (user) => createNewElement({ 
  node: 'img',
  attr: { class: 'avatar', src: user.avatar, alt: 'doctor' }
})

const getUserSection = () => createNewElement({ attr: { class: 'user' } })

const getUserName = (user) => createNewElement({
  node: 'h3',
  text: `${user.first_name} ${user.last_name}`,
  attr: { class: 'user__title' }
})

const getUserStatus = (user) => createNewElement({
  node: 'span',
  text: user.status ? 'В сети' : 'Не в сети',
  attr: { class: 'user__status' }
})

const getUserRate = () => createNewElement({ attr: { class: 'user__rate rate' } })

const getUserStars = (user) => {
  for (let i = 0; i < user.rate; i++) {
    return createNewElement({
      node: 'img',
      attr: { class: 'rate__star', src: '../img/Star.svg', alt: 'star' }
    })
  }
}

const getUserRateCount = (user) => createNewElement({
  node: 'span',
  text: `(${user.rate})`,
  attr: { class: 'rate__count' }
})

const getUserComments = (user) => createNewElement({
  node: 'span',
  text: `Отзыввы ${user.comments}`,
  attr: { class: 'comments' }
})

const getUserSpeciality = (user) => createNewElement({
  text: user.speciality ? user.speciality.join(', ') : '',
  attr: { class: 'user__position' }
})

const getUserCost = () => createNewElement({ attr: { class: 'user__cost cost' } })

const getUserCurrency = (user) => createNewElement({
  node: 'span',
  text: '250 грн',
  attr: { class: 'cost__currency' }
})

const getUserTime = (user) => createNewElement({
  node: 'span',
  text: '(10 минут)',
  attr: { class: 'cost__time' }
})

const getUserButtons = () => createNewElement({ attr: { class: 'user__buttons' } })

const getUserPhoneBtn = () => createNewElement({
  node: 'button',
  attr: { class: 'circle-btn phone' }
})

const getUserPhoneImg = () => createNewElement({
  node: 'img',
  attr: { src: '../img/phone.svg', alt: 'phone' }
})

const getUserVideoBtn = () => createNewElement({
  node: 'button',
  attr: { class: 'circle-btn video' }
})

const getUserVideoImg = () => createNewElement({
  node: 'img',
  attr: { src: '../img/video.svg', alt: 'phone' }
})

const getUserMessageBtn = () => createNewElement({
  node: 'button',
  attr: { class: 'circle-btn message' }
})

const getUserMessageImg = () => createNewElement({
  node: 'img',
  attr: { src: '../img/message.svg', alt: 'phone' }
})

const createUserCard = (user) => {

  // createNewElement({ node: 'div', attr: { class: 'card-wrapper' } }, '.wrapper')
  // createNewElement({ node: 'div', attr: { class: 'user-card' } }, '.card-wrapper')
  // createNewElement({
  //   node: 'img',
  //   attr: { class: 'avatar', src: user.avatar, alt: 'doctor' }
  // }, '.user-card')
  // createNewElement({ node: 'div', attr: { class: 'user' } }, '.user-card')
  
  // const title = createNewElement({
  //   node: 'h3',
  //   text: `${user.first_name} ${user.last_name}`,
  //   attr: { class: 'user__title' }
  // }, '.user')

  // createNewElement({
  //   node: 'span',
  //   text: user.status ? 'В сети' : 'Не в сети',
  //   attr: { class: 'user__status' }
  // }, '.user')

  // createNewElement({ node: 'div', attr: { class: 'user__rate rate' } }, '.user')

  // for (let i = 0; i < user.rate; i++) {
  //   createNewElement({
  //     node: 'img',
  //     attr: { class: 'rate__star', src: '../img/Star.svg', alt: 'star' }
  //   }, '.rate')
  // }

  // createNewElement({
  //   node: 'span',
  //   text: `(${user.rate})`,
  //   attr: { class: 'rate__count' }
  // }, '.rate')

  // createNewElement({
  //   node: 'span',
  //   text: `Отзыввы ${user.comments}`,
  //   attr: { class: 'comments' }
  // }, '.rate')
  
  // createNewElement({
  //   node: 'div',
  //   text: user.speciality ? user.speciality.join(', ') : '',
  //   attr: { class: 'user__position' }
  // }, '.user')

  // createNewElement({ node: 'div', attr: { class: 'user__cost cost' } }, '.user')

  // createNewElement({
  //   node: 'span',
  //   text: '250 грн',
  //   attr: { class: 'cost__currency' }
  // }, '.cost')

  // createNewElement({
  //   node: 'span',
  //   text: '(10 минут)',
  //   attr: { class: 'cost__time' }
  // }, '.cost')

  // createNewElement({ node: 'div', attr: { class: 'user__buttons' } }, '.user')
  
  // createNewElement({ node: 'button', attr: { class: 'circle-btn phone' } }, '.user__buttons')

  // createNewElement({
  //   node: 'img',
  //   attr: { src: '../img/phone.svg', alt: 'phone' }
  // }, '.phone')
  
  // createNewElement({ node: 'button', attr: { class: 'circle-btn video' } }, '.user__buttons')

  // createNewElement({
  //   node: 'img',
  //   attr: { src: '../img/video.svg', alt: 'phone' }
  // }, '.video')
  
  // createNewElement({ node: 'button', attr: { class: 'circle-btn message' } }, '.user__buttons')
  
  // createNewElement({
  //   node: 'img',
  //   attr: { src: '../img/message.svg', alt: 'phone' }
  // }, '.message')

  const cardWrapper = getCardWrapper()
  const userCard = getUserCard()
  const userAvatar = getUserAvatar(user)
  const userSection = getUserSection()
  const userName = getUserName(user)
  const userStatus = getUserStatus(user)
  const userRate = getUserRate()
  const userStars = getUserStars(user)
  const userRateCount = getUserRateCount(user)
  const userComments = getUserComments(user)
  const userSpeciality = getUserSpeciality(user)
  const userCost = getUserCost()
  const userCostCurrency = getUserCurrency(user)
  const userCostTime = getUserTime(user)
  const userButtons = getUserButtons()
  const userPhoneBtn = getUserPhoneBtn()
  const userPhoneImg = getUserPhoneImg()
  const userVideoBtn = getUserVideoBtn()
  const userVideoImg = getUserVideoImg()
  const userMessageBtn = getUserMessageBtn()
  const userMessageImg = getUserMessageImg()

  // createNewElement({ node: 'div', attr: { class: 'user-card' } }, '.card-wrapper')
}


const addUsers = (data) => {
  const userCards = data.map((user) => createUserCard(user))
  // console.log(...userCards)
  // wrapper.append(...userCards)
}

fetch('../data/users.json')
  .then(response => response.json())
  .then(data => addUsers(data))

const getUniqueValues = (arr) => arr.filter((el, index, currentArr) => index === currentArr.indexOf(el))

const searchDoctor = (event) => {
  const value = event.target.value.trim().toLowerCase()

  const userTitles = document.querySelectorAll('.user__title')

  if (value) {
    userTitles.forEach((el) => {
      let userCard = el.closest('.user-card')

      if (el.innerText.toLowerCase().search(value) !== -1) {
        userCard.classList.remove('hide')
        let str = el.innerText

        el.innerHTML = highlightMark(str, str.toLowerCase().indexOf(value), value.length)
      } else {
        userCard.classList.add('hide')
      }
    })
  } else {
    userTitles.forEach((el) => {
      let userCard = el.closest('.user-card')

      userCard.classList.remove('hide')
      el.innerHTML = el.innerText
    })
  }
}

const getSpecialities = () => {
  return users.reduce((acc, user) => {
    if (user.speciality && user.speciality.length) {
      return acc.concat(...user.speciality);
    }

    return acc
  }, [])
}

const createAutocompleteValues = (html) => {
  createNewElement({
    node: 'li',
    html,
    attr: { class: 'autocomplete-list__item' }
  }, '.autocomplete-list')
}


const tags = []
const uniqueTag = document.querySelectorAll('.tag')

const checkUniqueTag = (tag) => {
  // console.log('uniqueTag.length -> ', uniqueTag.length)
  // if (uniqueTag.length) {
  //   uniqueTag.forEach((item) => {
  //     tags.push(item.innerText)
  //   })
  //   console.log('tags -> ', tags)

  //   console.log('getUniqueValues(tags) -> ', getUniqueValues(tags))
  // } else {
  //   tags.push(tag)
  //   console.log('tags -> ', tags)
  //   addTag(tag)
  // }
}

const addTag = (tag) => {
  createNewElement({
    node: 'li',
    text: tag,
    attr: { class: 'tag' }
  }, '.tags')

  createNewElement({
    node: 'button',
    attr: { class: 'delete-tag' }
  }, '.tag')

  createNewElement({
    node: 'img',
    attr: { src: '../img/close.png', alt: 'delete' }
  }, '.delete-tag')
}

const autocomplete = (event) => {
  const value = event.target.value.trim().toLowerCase()

  const specialities = getUniqueValues(getSpecialities())

  const autocompleteList = document.getElementsByClassName('autocomplete-list')[0]

  if (value) {
    autocompleteList.innerHTML = null

    specialities.forEach((el) => {
      if (el.toLowerCase().search(value) !== -1) {
        el = highlightMark(el, el.indexOf(value), value.length)
        createAutocompleteValues(el)
        autocompleteList.classList.remove('hide')
        const listItems = document.querySelectorAll('.autocomplete-list__item')

        listItems.forEach((item) => {
          item.addEventListener('click', function () {
            checkUniqueTag(this.innerText)
            autocompleteList.classList.add('hide')
            event.target.value = ''
          })
        })
      }
    })
  } else {
    autocompleteList.classList.add('hide')
  }
}

const highlightMark = (str, position, length) => {
  if (position === -1) {
    position = 0
  }

  return `${str.slice(0, position)}<mark>${str.slice(position, position + length)}</mark>${str.slice(position + length)}`;
}

search.addEventListener('input', searchDoctor)

searchAutocomplete.addEventListener('input', autocomplete)