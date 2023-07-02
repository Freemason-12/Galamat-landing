function validateNumber(number) {
  return /\+[7]\d{10}/.test(number) && number.length < 13;
}

function maskNumber(number) {
  if (!/\+[7]\d+$/.test(number)) return "+7";
  else if (number.length > 12) return number.slice(0, 12)
  else return number
}

const phone_form = document.querySelector("#phone_num")
const submit_button = document.querySelector("#submit")

phone_form.addEventListener("input", () => {
  const num = phone_form.value
  phone_form.value = maskNumber(num)
  submit_button.disabled = !validateNumber(phone_form.value)
})

const prevButton = document.querySelector(".arrow-left")
const nextButton = document.querySelector(".arrow-right")
const currentImage = document.querySelector("#base-floor > img")
const container = document.querySelector("#base-floor")
const dir = "static/Images/blueprints/"

let currentIndex = 0
const images = ["Base floor.jpg", "1room-35,68.jpg", "1room-35,81.jpg",
                "1room-35,82.jpg","1room-42,55.jpg", "2room-50,8.jpg",
                "2room-55,51.jpg", "2room-55,65.jpg"]
const imageDOM = []
images.map((item) => {
  const el = document.createElement("img")
  el.src = `${dir}${item}`
  imageDOM.push(el)
})

nextButton.onclick = () => {
  currentIndex += (currentIndex < 7)? 1 : (-7);
  container.innerHTML = ""
  container.appendChild(imageDOM[currentIndex])
}

prevButton.onclick = () => {
  currentIndex -= (currentIndex > 0)? 1 : (-7);
  container.innerHTML = ""
  container.appendChild(imageDOM[currentIndex])
}
