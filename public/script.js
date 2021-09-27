const btns=document.querySelectorAll('.form-check-input');
const btnTrip=document.querySelector('.btnTrip')

const category=new Array();

btns.forEach((btn, i) => {
  btn.addEventListener("change",function(){

      if (btn.checked) {
category.push(btn.value)
console.log('Checked');

console.log(category);
        // do this
      } else {
        // do that
        console.log('Not checked');

const index = category.indexOf(btn.value);
if (index > -1) {
  category.splice(index, 1);
}
          console.log(category);  }

  });
  })

btnTrip.addEventListener("click", () => {
  fetch("/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
})
