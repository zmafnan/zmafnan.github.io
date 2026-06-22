document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // EMAILJS CONFIGURATION
  // ============================================
  // TODO: Ganti dengan credentials kamu dari https://www.emailjs.com
  const EMAILJS_PUBLIC_KEY = "U09Kw4G_1MfqXT8fi"    // Dari EmailJS Dashboard > Account > Public Key
  const EMAILJS_SERVICE_ID = "service_xgsrpm3"    // Dari EmailJS Dashboard > Email Services
  const EMAILJS_TEMPLATE_ID = "template_85jsque"  // Dari EmailJS Dashboard > Email Templates

  // Initialize EmailJS
  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }

  // ============================================
  // SET CURRENT YEAR
  // ============================================
  const yearEl = document.getElementById("year")
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById("scrollProgress")

  function updateScrollProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + "%"
    }
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector(".navbar")

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTopButton = document.getElementById("backToTop")

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  }

  if (backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // ============================================
  // COMBINED SCROLL HANDLER (performance)
  // ============================================
  let ticking = false
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress()
        handleNavScroll()
        handleBackToTop()
        updateActiveNavLink()
        ticking = false
      })
      ticking = true
    }
  })

  // Initial calls
  updateScrollProgress()
  handleNavScroll()
  handleBackToTop()

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================
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

        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // ============================================
  // MOBILE NAVBAR TOGGLE
  // ============================================
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      navbarCollapse.classList.toggle("show")
    })

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show")
      })
    })
  }

  // ============================================
  // TYPEWRITER EFFECT
  // ============================================
  const typewriterElement = document.getElementById("typewriter-text")
  const roles = [
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Data Scientist",
    "Android Developer",
    "Lean Manufacturing Professional"
  ]

  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 80

  function typeWriter() {
    const currentRole = roles[roleIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 40
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 80
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true
      typingSpeed = 2000
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      typingSpeed = 400
    }

    setTimeout(typeWriter, typingSpeed)
  }

  if (typewriterElement) {
    setTimeout(typeWriter, 800)
  }

  // ============================================
  // INTERSECTION OBSERVER — Reveal Animations
  // ============================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  )

  document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
    revealObserver.observe(el)
  })

  // Also handle the old .animate class elements
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The animation classes are already on the element, we just need opacity
          entry.target.style.animationPlayState = "running"
          animateObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll(".animate").forEach((el) => {
    animateObserver.observe(el)
  })

  // ============================================
  // SKILL BARS ANIMATION
  // ============================================
  const skillsSection = document.getElementById("skills")
  let skillsAnimated = false

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true
          const skillBars = document.querySelectorAll(".skill-progress")
          skillBars.forEach((bar) => {
            const targetWidth = bar.style.width
            bar.style.width = "0"
            setTimeout(() => {
              bar.style.width = targetWidth
            }, 200)
          })
          skillObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  if (skillsSection) {
    skillObserver.observe(skillsSection)
  }

  // ============================================
  // STATS COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll(".stat-number[data-target]")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseInt(el.getAttribute("data-target"), 10)
          animateCounter(el, target)
          counterObserver.unobserve(el)
        }
      })
    },
    { threshold: 0.5 }
  )

  statNumbers.forEach((el) => counterObserver.observe(el))

  function animateCounter(el, target) {
    const duration = 1500
    const startTime = performance.now()
    const startVal = 0

    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.round(startVal + (target - startVal) * eased)

      el.textContent = current + "+"

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        el.classList.add("count-pop")
        setTimeout(() => el.classList.remove("count-pop"), 300)
      }
    }

    requestAnimationFrame(update)
  }

  // ============================================
  // CURSOR GLOW EFFECT (Desktop only)
  // ============================================
  const cursorGlow = document.getElementById("cursorGlow")

  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    function updateCursorGlow() {
      // Smooth follow
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08

      cursorGlow.style.left = glowX + "px"
      cursorGlow.style.top = glowY + "px"

      requestAnimationFrame(updateCursorGlow)
    }

    updateCursorGlow()
  } else if (cursorGlow) {
    cursorGlow.style.display = "none"
  }

  // ============================================
  // CARD TILT EFFECT
  // ============================================
  const tiltCards = document.querySelectorAll(".exp-card, .github-card, .stat-item")

  if (window.matchMedia("(pointer: fine)").matches) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -3
        const rotateY = ((x - centerX) / centerX) * 3

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = ""
      })
    })
  }

  // ============================================
  // ACTIVE NAV LINK BASED ON SCROLL
  // ============================================
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  function updateActiveNavLink() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
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
  }

  updateActiveNavLink()

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  const toastContainer = document.getElementById("toastContainer")

  function showToast(message, type = "success") {
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`

    const iconSymbol = type === "success" ? "✓" : "✕"
    toast.innerHTML = `
      <span class="toast-icon">${iconSymbol}</span>
      <span>${message}</span>
    `

    toastContainer.appendChild(toast)

    // Auto-remove after 5s
    setTimeout(() => {
      toast.classList.add("toast-exit")
      setTimeout(() => toast.remove(), 400)
    }, 5000)
  }

  // ============================================
  // CONTACT FORM — EmailJS Submission
  // ============================================
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("contactSubmitBtn")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const name = document.getElementById("contactName").value.trim()
      const email = document.getElementById("contactEmail").value.trim()
      const subject = document.getElementById("contactSubject").value.trim()
      const message = document.getElementById("contactMessage").value.trim()

      // Basic validation
      if (!name || !email || !message) {
        showToast("Please fill in all required fields.", "error")
        return
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error")
        return
      }

      // Check if EmailJS is configured
      if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE") {
        // Fallback: open mailto link
        const mailtoSubject = encodeURIComponent(subject || "Message from Portfolio")
        const mailtoBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`
        )
        window.open(
          `mailto:zikriafnan.dev@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
          "_blank"
        )
        showToast("Opening your email client... EmailJS not configured yet.", "success")
        contactForm.reset()
        return
      }

      // Set loading state
      submitBtn.classList.add("btn-loading")

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          subject: subject || "No Subject",
          message: message,
          to_name: "Zikri Afnan",
        })

        showToast("Message sent successfully! I'll get back to you soon. 🚀", "success")
        contactForm.reset()
      } catch (error) {
        console.error("EmailJS Error:", error)
        showToast("Failed to send message. Please try again or email me directly.", "error")
      } finally {
        submitBtn.classList.remove("btn-loading")
      }
    })
  }
})
