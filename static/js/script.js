function validateNumber(number) {
  return /\+[7]\d{10}/.test(number) && number.length == 12;
}

function maskNumber(number) {
  if (!/\+[7]\d+$/.test(number)) return "+7";
  else if (number.length > 12) return number.slice(0, 12)
  else return number
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

const prevButton = qselect(".arrow-left")
const nextButton = qselect(".arrow-right")
const currentImage = qselect("#base-floor > img")
const container = qselect("#base-floor")
const dir = "static/Images/blueprints/"

function main() {
  let currentIndex = 0
  const images = ["Base floor.jpg", "%25R-0.webp", "%25R-1.webp", "%25R-2.webp", "%25R-3.webp", "%25R-4.webp", "%25R-5.webp", "%25R-6.webp"]
  const imageDOM = []
  images.map((item) => {
    const el = document.createElement("img")
    el.src = `${dir}${item}`
    imageDOM.push(el)
  })

  floating_contacts_button.onclick = () => {
    contacts_dropdown.dataset.show = "true"
  }
  contacts_dropdown_close.onclick = () => contacts_dropdown.dataset.show = "false"

  name_form_f.oninput = () => {
    submit_button_f.disabled = !(validateNumber(phone_form_f.value) && name_form_f.value.length > 0)
  }

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
    container.innerHTML = ""
    container.appendChild(imageDOM[currentIndex])
  }

  prevButton.onclick = () => {
    currentIndex -= (currentIndex > 0) ? 1 : (-7);
    container.innerHTML = ""
    container.appendChild(imageDOM[currentIndex])
  }
}
main()
