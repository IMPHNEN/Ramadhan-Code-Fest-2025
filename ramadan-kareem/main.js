function createStars() {
    const starsContainer = document.querySelector(".stars-container")
    const starCount = Math.floor(window.innerWidth / 3)

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div")
        star.classList.add("star")

        const x = Math.random() * 100
        const y = Math.random() * 100

        const size = Math.random() * 0.3 + 0.1

        const delay = Math.random() * 5

        star.style.cssText = `
      position: absolute;
      top: ${y}%;
      left: ${x}%;
      width: ${size}vh;
      height: ${size}vh;
      background-color: #fff;
      border-radius: 50%;
      opacity: ${Math.random() * 0.5 + 0.3};
      animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${delay}s;
    `

        starsContainer.appendChild(star)
    }
}

function animateBackground() {
    const container = document.querySelector(".container")
    let hue = 220

    setInterval(() => {
        hue = (hue + 0.1) % 240
        const color1 = `hsl(${hue}, 60%, 12%)`
        const color2 = `hsl(${hue + 10}, 50%, 25%)`

        container.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
    }, 100)
}

function handleResize() {
    const starsContainer = document.querySelector(".stars-container")
    starsContainer.innerHTML = ""
    createStars()
}

document.addEventListener("DOMContentLoaded", () => {
    createStars()
    animateBackground()

    window.addEventListener("resize", handleResize)
})

