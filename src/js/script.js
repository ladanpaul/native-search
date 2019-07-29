const search = document.querySelector('#search')
const searchAutocomplete = document.querySelector('#search-autocomplete')

let users = null

const addToPage = (node, parent) => {
  document.querySelectorAll(parent).forEach((el) => {
    el.appendChild(node)
  })
}

const createNewElement = (el, parent) => {
  const node = document.createElement(el.node)

  if (el.text) {
    node.innerText = el.text
  }

  if (el.attr) {
    Object.keys(el.attr).forEach((key) => {
      node.setAttribute(key, el.attr[key])
    });
  }

  if (parent) {
    addToPage(node, parent)
  }
}

const createUserCard = (user) => {
  createNewElement({ node: 'div', attr: { class: 'card-wrapper' } }, '.wrapper')

  createNewElement({
    node: 'img',
    attr: { class: 'avatar', src: user.avatar, alt: 'doctor' }
  }, '.user-card')

  createNewElement({ node: 'div', attr: { class: 'user' } }, '.user-card')

  createNewElement({
    node: 'h3',
    text: `${user.first_name} ${user.last_name}`,
    attr: { class: 'user__title' }
  }, '.user')

  createNewElement({
    node: 'span',
    text: user.status ? 'В сети' : 'Не в сети',
    attr: { class: 'user__status' }
  }, '.user')

  createNewElement({ node: 'div', attr: { class: 'user__rate rate' } }, '.user')

  for (let i = 0; i < user.rate; i++) {
    createNewElement({
      node: 'img',
      attr: { class: 'rate__star', src: '../img/Star.svg', alt: 'star' }
    }, '.rate')
  }

  createNewElement({
    node: 'span',
    text: `(${user.rate})`,
    attr: { class: 'rate__count' }
  }, '.rate')

  createNewElement({
    node: 'span',
    text: `Отзыввы ${user.comments}`,
    attr: { class: 'comments' }
  }, '.rate')

  createNewElement({
    node: 'div',
    text: user.speciality ? user.speciality.join(', ') : '',
    attr: { class: 'user__position' }
  }, '.user')

  createNewElement({ node: 'div', attr: { class: 'user__cost cost' } }, '.user')

  createNewElement({
    node: 'span',
    text: '250 грн',
    attr: { class: 'cost__currency' }
  }, '.cost')

  createNewElement({
    node: 'span',
    text: '(10 минут)',
    attr: { class: 'cost__time' }
  }, '.cost')

  createNewElement({ node: 'div', attr: { class: 'user__buttons' } }, '.user')

  createNewElement({ node: 'button', attr: { class: 'circle-btn phone' } }, '.user__buttons')

  createNewElement({
    node: 'img',
    attr: { src: '../img/phone.svg', alt: 'phone' }
  }, '.phone')

  createNewElement({ node: 'button', attr: { class: 'circle-btn video' } }, '.user__buttons')

  createNewElement({
    node: 'img',
    attr: { src: '../img/video.svg', alt: 'phone' }
  }, '.video')

  createNewElement({ node: 'button', attr: { class: 'circle-btn message' } }, '.user__buttons')

  createNewElement({
    node: 'img',
    attr: { src: '../img/message.svg', alt: 'phone' }
  }, '.message')

  createNewElement({ node: 'div', attr: { class: 'user-card' } }, '.card-wrapper')
}


const addUsers = (data) => {
  users = data
  users.forEach((user) => {
    createUserCard(user)
  })
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

      if (el.innerText.toLowerCase().search(value) === -1) {
        userCard.classList.add('hide')
        el.innerHTML = el.innerText
      } else {
        userCard.classList.remove('hide')
        // let str = el.innerText
        // el.innerHTML = highlightMark(str, el.innerText.indexOf(value), value.length)
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

const autocompleteValues = (str) => {
  createNewElement({
    node: 'li',
    text: str,
    attr: { class: 'autocomplete-list__item' }
  }, '.autocomplete-list')
}

const addTagSpeciality = (event) => {
  const value = event.target.value.trim().toLowerCase()

  const specialities = getUniqueValues(getSpecialities())

  const listItems = document.getElementsByClassName('autocomplete-list')[0]
  const listItem = document.querySelectorAll('.autocomplete-list__item')

  if (value) {
    listItems.innerHTML = null

    specialities.forEach((el) => {
      if (el.toLowerCase().search(value) !== -1) {
        autocompleteValues(el)
        listItems.classList.remove('hide')

      }
    })
  } else {
    listItems.classList.add('hide')
  }
}

const highlightMark = (str, position, lenght) => {
  return `${str.slice(0, position)}<mark>${str.slice(position, position + lenght)}</mark>${str.slice(position + lenght)}`;
}

search.addEventListener('input', searchDoctor)

searchAutocomplete.addEventListener('input', addTagSpeciality)