document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  // Back to top button click event
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      if (this.getAttribute("href") === "#") return

      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        })

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Fix mobile navbar toggle
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      navbarCollapse.classList.toggle("show")
    })

    // Close navbar when a nav item is clicked
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show")
      })
    })
  }

  // Typewriter effect
  const typewriterElement = document.getElementById("typewriter-text")
  const roles = ["Machine Learning Engineer", "Full Stack Developer", "Data Scientist", "Android Developer"]

  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeWriter() {
    const currentRole = roles[roleIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true
      typingSpeed = 1500 // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      typingSpeed = 500 // Pause before typing next word
    }

    setTimeout(typeWriter, typingSpeed)
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000)

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".animate")

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        const animationClass = element.classList.contains("fadeInUp")
          ? "fadeInUp"
          : element.classList.contains("fadeInDown")
            ? "fadeInDown"
            : element.classList.contains("fadeInLeft")
              ? "fadeInLeft"
              : element.classList.contains("fadeInRight")
                ? "fadeInRight"
                : element.classList.contains("zoomIn")
                  ? "zoomIn"
                  : element.classList.contains("bounceIn")
                    ? "bounceIn"
                    : "fadeIn"

        element.classList.add(animationClass)
      }
    })
  }

  // Run on page load
  checkIfInView()

  // Run on scroll
  window.addEventListener("scroll", checkIfInView)

  // Skill bars animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      // Get the width from the style attribute
      const targetWidth = bar.style.width

      // Reset width to 0
      bar.style.width = "0"

      // Set a timeout to animate to the target width
      setTimeout(() => {
        bar.style.width = targetWidth
      }, 300)
    })
  }

  // Initialize skill bars animation when skills section is in view
  const skillsSection = document.getElementById("skills")

  function checkSkillsInView() {
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight - 100) {
        animateSkillBars()
        // Remove the event listener after animation is triggered
        window.removeEventListener("scroll", checkSkillsInView)
      }
    }
  }

  // Check on page load
  checkSkillsInView()

  // Check on scroll
  window.addEventListener("scroll", checkSkillsInView)

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would normally send the form data to a server
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
})
