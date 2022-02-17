const page = document.getElementById('page')
const prevBtn = document.getElementById('previousPage')
const nextBtn = document.getElementById('nextPage')


if (page.innerHTML > 0) {
    prevBtn.onclick = () => {
        if (page.innerHTML > 1) {
            page.innerHTML = Number(page.innerHTML) - 1
            location.href = `/artworks?page=${page.innerHTML}`
        }
    }
    nextBtn.onclick = () => {
        if (page.innerHTML < 8) {
            page.innerHTML = Number(page.innerHTML) + 1
            location.href = `/artworks?page=${page.innerHTML}`
        }
    }
}