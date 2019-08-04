const search = document.querySelector('#search')
const reset = document.querySelector('.search__reset')
const searchAutocomplete = document.querySelector('#search-autocomplete')
const autocompleteList = document.querySelector('.autocomplete-list')

let doctors = null
let tags = []

// add tag to page if we have element on page
const addToPage = (node, parent) => {
  document.querySelectorAll(parent).forEach((el) => {
    el.appendChild(node)
  })
}

// create a new element and return it
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

  return parent ? addToPage(node, parent) : node
}

const getCardWrapper = () => createNewElement({ attr: { class: 'card-wrapper' } })

const getdoctorCard = () => createNewElement({ attr: { class: 'doctor-card' } })

const getdoctorAvatar = (doctor) => createNewElement({
  node: 'img',
  attr: { class: 'avatar', src: doctor.avatar, alt: 'doctor' }
})

const getdoctorSection = () => createNewElement({ attr: { class: 'doctor' } })

const getdoctorName = (doctor) => createNewElement({
  node: 'h3',
  text: `${doctor.first_name} ${doctor.last_name}`,
  attr: { class: 'doctor__title' }
})

const getdoctorStatus = (doctor) => createNewElement({
  node: 'span',
  text: doctor.status ? 'В сети' : 'Не в сети',
  attr: { class: 'doctor__status' }
})

const getdoctorRate = () => createNewElement({ attr: { class: 'doctor__rate rate' } })

const getdoctorStars = (doctor) => {
  const stars = []

  for (let i = 0; i < doctor.rate; i++) {
    stars.push(createNewElement({
      node: 'img',
      attr: { class: 'rate__star', src: '../img/Star.svg', alt: 'star' }
    }))
  }

  return stars
}

const getdoctorRateCount = (doctor) => createNewElement({
  node: 'span',
  text: `(${doctor.rate})`,
  attr: { class: 'rate__count' }
})

const getdoctorComments = (doctor) => createNewElement({
  node: 'span',
  text: `Отзыввы ${doctor.comments}`,
  attr: { class: 'comments' }
})

const getdoctorSpeciality = (doctor) => createNewElement({
  text: doctor.speciality ? doctor.speciality.join(', ') : '',
  attr: { class: 'doctor__position' }
})

const getdoctorCost = () => createNewElement({ attr: { class: 'doctor__cost cost' } })

const getdoctorCurrency = (doctor) => createNewElement({
  node: 'span',
  text: '250 грн',
  attr: { class: 'cost__currency' }
})

const getdoctorTime = (doctor) => createNewElement({
  node: 'span',
  text: '(10 минут)',
  attr: { class: 'cost__time' }
})

const getdoctorButtons = () => createNewElement({ attr: { class: 'doctor__buttons' } })

const getdoctorPhoneBtn = () => createNewElement({
  node: 'button',
  attr: { class: 'circle-btn phone' }
})

const getdoctorPhoneImg = () => createNewElement({
  node: 'img',
  attr: { src: '../img/phone.svg', alt: 'phone' }
})

const getdoctorVideoBtn = () => createNewElement({
  node: 'button',
  attr: { class: 'circle-btn video' }
})

const getdoctorVideoImg = () => createNewElement({
  node: 'img',
  attr: { src: '../img/video.svg', alt: 'phone' }
})

const getdoctorMessageBtn = () => createNewElement({
  node: 'button',
  attr: { class: 'circle-btn message' }
})

const getdoctorMessageImg = () => createNewElement({
  node: 'img',
  attr: { src: '../img/message.svg', alt: 'phone' }
})

// create and append element to card
// this way is better, cuz we don't have problem with repaint and reflow
const createdoctorCard = (doctor) => {
  const doctorCard = getdoctorCard()
  const cardWrapper = getCardWrapper()
  const doctorAvatar = getdoctorAvatar(doctor)
  const doctorSection = getdoctorSection()
  const doctorName = getdoctorName(doctor)
  const doctorStatus = getdoctorStatus(doctor)
  const doctorRate = getdoctorRate()
  const doctorStars = getdoctorStars(doctor)
  const doctorRateCount = getdoctorRateCount(doctor)
  const doctorComments = getdoctorComments(doctor)
  const doctorSpeciality = getdoctorSpeciality(doctor)
  const doctorCost = getdoctorCost()
  const doctorCostCurrency = getdoctorCurrency(doctor)
  const doctorCostTime = getdoctorTime(doctor)
  const doctorButtons = getdoctorButtons()
  const doctorPhoneImg = getdoctorPhoneImg()
  const doctorPhoneBtn = getdoctorPhoneBtn()
  const doctorVideoImg = getdoctorVideoImg()
  const doctorVideoBtn = getdoctorVideoBtn()
  const doctorMessageImg = getdoctorMessageImg()
  const doctorMessageBtn = getdoctorMessageBtn()

  cardWrapper.appendChild(doctorCard)
  doctorCard.append(doctorAvatar, doctorSection)
  doctorRate.append(...doctorStars, doctorRateCount, doctorComments)
  doctorSection.append(doctorName, doctorStatus, doctorRate, doctorSpeciality, doctorCost, doctorButtons)
  doctorCost.append(doctorCostCurrency, doctorCostTime)
  doctorPhoneBtn.appendChild(doctorPhoneImg)
  doctorVideoBtn.appendChild(doctorVideoImg)
  doctorMessageBtn.appendChild(doctorMessageImg)
  doctorButtons.append(doctorPhoneBtn, doctorVideoBtn, doctorMessageBtn)

  return cardWrapper
}

// append all doctors to page
const addDoctors = (data) => {
  doctors = data
  const doctorCards = doctors.map((doctor) => createdoctorCard(doctor))
  const doctorsSection = document.querySelector('.doctors')
  doctorsSection.append(...doctorCards)
}

//get data from server
fetch('../data/doctors.json')
  .then(response => response.json())
  .then(data => addDoctors(data))

// function to get uniquie values from array
const getUniqueValues = arr => arr.filter((el, index, currentArr) => index === currentArr.indexOf(el))

let searchedValue = []
// search item into the collection of an elements
const searchItemBy = (elements, val) => {
  // can be object or string
  if (typeof val === 'object') {
    val.forEach((item) => {
      searchedValue.push(item.toLowerCase())
    })
  } else {
    searchedValue = val.trim().toLowerCase()
  }

  if (searchedValue) {
    elements.forEach((el) => {
      let doctorCard = el.closest('.doctor-card')

      if (el.innerText.toLowerCase().search(searchedValue) !== -1) {
        doctorCard.classList.remove('hide')
        let str = el.innerText
        // add tag mark into html for hightlight
        el.innerHTML = highlightMark(str, str.toLowerCase().indexOf(searchedValue), searchedValue.length)
      } else {
        doctorCard.classList.add('hide')
      }
    })
  } else {
    elements.forEach((el) => {
      let doctorCard = el.closest('.doctor-card')

      doctorCard.classList.remove('hide')
      el.innerHTML = el.innerText
    })
  }
}

// find doctor by docrot title
const searchDoctor = (event) => {
  const value = event.target.value

  const doctorTitles = document.querySelectorAll('.doctor__title')
  searchItemBy(doctorTitles, value)
}

// function for remove tag - TODO
const removeTag = function() {
  const tag = this.closest('.tag')
  console.log('tag -> ', tag)
}

// find tag for delete
const findToRemove = () => {
  const tags = document.querySelectorAll('.delete-tag')
  tags.forEach(tag => tag.addEventListener('click', removeTag))
}

const filterBySpeciality = (tagTitle) => {
  const positions = document.querySelectorAll('.doctor__position')
  searchItemBy(positions, tagTitle)
  findToRemove()
}

const getSpecialities = () => {
  return doctors.reduce((acc, doctor) => {
    if (doctor.speciality && doctor.speciality.length) {
      return acc.concat(...doctor.speciality);
    }

    return acc
  }, [])
}

// create html tag for autocomplete ( dropdown )
const createAutocompleteValues = (html) => {
  createNewElement({
    node: 'li',
    html,
    attr: { class: 'autocomplete-list__item' }
  }, '.autocomplete-list')
}


const checkUniqueTag = (tagTitle) => {
  const addedTags = document.querySelectorAll('.tag')
  addedTags.forEach((tag) => {
    tags.push(tag.innerText)
  })

  if (tags.includes(tagTitle)) {
    return
  } else {
    addTag(tagTitle)
    tags.length = 0
    // when we have tag on page, add it to filter
    filterBySpeciality(tagTitle)
  }
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

const clearHightlight = (elements) => elements.forEach(element => element.innerHTML = element.innerText)

const resetSearch = () => {
  const hiddenDoctors = document.querySelectorAll('.hide')
  const doctorTitles = document.querySelectorAll('.doctor__title')
  const doctorPositions = document.querySelectorAll('.doctor__position')
  const tags = document.querySelector('.tags')

  clearHightlight(doctorTitles)
  clearHightlight(doctorPositions)

  hiddenDoctors.forEach(doctor => doctor.classList.remove('hide'))

  autocompleteList.classList.add('hide')
  search.value = ''
  tags.innerHTML = ''
  searchAutocomplete.value = ''
}

search.addEventListener('input', searchDoctor)

searchAutocomplete.addEventListener('input', autocomplete)

reset.addEventListener('click', resetSearch)