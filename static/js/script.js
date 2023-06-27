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
console.log(phone_form, submit_button)

phone_form.addEventListener("input", () => {
  const num = phone_form.value
  phone_form.value = maskNumber(num)
  submit_button.disabled = !validateNumber(phone_form.value)
})
