function validateNumber(number) {
  return /\+[7]\d{10}/.test(number) && number.length == 12;
}

function maskNumber(number) {
  if (!/\+[7]\d+$/.test(number)) return "+7";
  else if (number.length > 12) return number.slice(0, 12)
  else return number
}

const preview = document.querySelector("#image_preview")
const preview_img = document.querySelector("#image_preview > div")
const preview_close = document.querySelector("#image_preview > img")
const clickable_images = []

function showImage(image) {
  preview.style.display = 'flex'
  preview_img.innerHTML = `<img src="${image.src}">`
}

function hideImage() {
  preview.style.display = 'none'
}

const qselect = x => document.querySelector(x)

const name_form = qselect("#name_form")
const phone_form = qselect("#phone_num")
const submit_button = qselect("#submit")

const name_form_f = qselect("#name_form_floating")
const phone_form_f = qselect("#phone_num_floating")
const submit_button_f = qselect("#submit_floating")

const floating_contacts_button = qselect("#floating_contacts")
const contacts_dropdown = qselect("#contacts_dropdown");
const contacts_dropdown_close = qselect("#contacts_dropdown > div > button");

const notification = qselect("#notification")

const prevButton = qselect(".arrow-left")
const nextButton = qselect(".arrow-right")
const currentImage = qselect("#base-floor > img")
const container = qselect("#base-floor")
const dir = "static/Images/blueprints/"

const buildCards = qselect("#sec-7-1 .container")

function main() {
  // Showing blueprints
  let currentIndex = 0
  const imageDOM = []
  for (let i = 1; i <= 9; i++) {
    // const el = document.createElement("img")
    const item = `plans_Page ${i}.png`
    // el.src = `${dir}${item}`
    imageDOM.push(`<img src="${dir}${item}">`)
  }

  // Floating button's functionality
  floating_contacts_button.onclick = () => {
    contacts_dropdown.dataset.show = "true"
  }
  contacts_dropdown_close.onclick = () => contacts_dropdown.dataset.show = "false"

  name_form_f.oninput = () => {
    submit_button_f.disabled = !(validateNumber(phone_form_f.value) && name_form_f.value.length > 0)
  }

  notification.onclick = () => notification.style.display = "none"

  phone_form_f.oninput = () => {
    const num = maskNumber(phone_form_f.value)
    phone_form_f.value = num
    submit_button_f.disabled = !(validateNumber(num) && name_form_f.value.length > 0)
  }

  name_form.oninput = () => submit_button.disabled = !(validateNumber(phone_form.value) && name_form.value.length > 0)

  phone_form.oninput = () => {
    const num = maskNumber(phone_form.value)
    phone_form.value = num
    submit_button.disabled = !(validateNumber(num) && name_form.value.length > 0)
  }

  nextButton.onclick = () => {
    currentIndex += (currentIndex < 7) ? 1 : (-7);
    container.innerHTML = imageDOM[currentIndex]
    const im = container.children.item(0)
    im.onclick = () => showImage(im)
    // container.appendChild(imageDOM[currentIndex])
  }

  prevButton.onclick = () => {
    currentIndex -= (currentIndex > 0) ? 1 : (-7);
    container.innerHTML = imageDOM[currentIndex]
    const im = container.children.item(0)
    im.onclick = () => showImage(im)
    // container.appendChild(imageDOM[currentIndex])
  }

  const blueprint_image = document.getElementById('blueprint_image')
  blueprint_image.onclick = () => showImage(blueprint_image)
  clickable_images.push(...document.querySelectorAll('#overflow img'))
  clickable_images.push(...document.querySelectorAll('#dvor img'))
  clickable_images.push(...document.querySelectorAll('#sec-6 .cont img'))
  clickable_images.push(...document.querySelectorAll('#sec-7-1 .build-card img'))
  for (let i of clickable_images) i.onclick = () => showImage(i)
  preview.onclick = hideImage
  preview_close.inclick = hideImage
  hideImage()
}
main()
