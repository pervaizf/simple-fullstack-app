const likeIt = document.querySelectorAll('#like')
const deleteIt = document.querySelectorAll('#delete')

Array.from(likeIt).forEach((element) => {
  element.addEventListener('click', addLike)
})

Array.from(deleteIt).forEach((element) => {
  element.addEventListener('click', deleteQuote)
})

async function addLike() {
  const quote = this.parentNode.childNodes[1].innerText
  const author = this.parentNode.childNodes[3].innerText
  const category = this.parentNode.childNodes[5].innerText
  const likes = Number(this.parentNode.childNodes[7].innerText)
  try {
    console.log(likes)
    const res = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteS: quote,
        authorS: author,
        categoryS: category,
        likesS: likes,
      }),
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function deleteQuote() {
  const quote = this.parentNode.childNodes[1].innerText
  const author = this.parentNode.childNodes[3].innerText
  const category = this.parentNode.childNodes[5].innerText
  try {
    const response = await fetch('deleteQuote', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quote: quote,
        author: author,
        category: category,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}
