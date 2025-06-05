// Authentication Pages JavaScript (Login & Signup)

document.addEventListener("DOMContentLoaded", () => {
  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const passwordField = this.previousElementSibling

        // Toggle password visibility
        if (passwordField.type === "password") {
          passwordField.type = "text"
          this.classList.remove("fa-eye")
          this.classList.add("fa-eye-slash")
        } else {
          passwordField.type = "password"
          this.classList.remove("fa-eye-slash")
          this.classList.add("fa-eye")
        }
      })
    })
  }

  // Login Form Validation and Submission
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value.trim()

      // Reset error messages
      document.getElementById("emailError").textContent = ""
      document.getElementById("passwordError").textContent = ""

      // Validate email
      if (!email) {
        document.getElementById("emailError").textContent = "Email is required"
        return
      } else if (!isValidEmail(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address"
        return
      }

      // Validate password
      if (!password) {
        document.getElementById("passwordError").textContent = "Password is required"
        return
      }

      // Check if user exists in local storage
      const users = JSON.parse(localStorage.getItem("users")) || []
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store logged in user
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: user.fullName,
            email: user.email,
            loggedIn: true,
          }),
        )

        // Show success message
        showNotification("Login successful! Redirecting...", "success")

        // Redirect to homepage after 1.5 seconds
        setTimeout(() => {
          window.location.href = "index.html"
        }, 1500)
      } else {
        showNotification("Invalid email or password", "error")
      }
    })
  }

  // Signup Form Validation and Submission
  const signupForm = document.getElementById("signupForm")

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const fullName = document.getElementById("fullName").value.trim()
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value.trim()
      const confirmPassword = document.getElementById("confirmPassword").value.trim()
      const termsChecked = document.getElementById("terms").checked

      // Reset error messages
      document.getElementById("nameError").textContent = ""
      document.getElementById("emailError").textContent = ""
      document.getElementById("passwordError").textContent = ""
      document.getElementById("confirmPasswordError").textContent = ""

      // Validate full name
      if (!fullName) {
        document.getElementById("nameError").textContent = "Full name is required"
        return
      }

      // Validate email
      if (!email) {
        document.getElementById("emailError").textContent = "Email is required"
        return
      } else if (!isValidEmail(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address"
        return
      }

      // Validate password
      if (!password) {
        document.getElementById("passwordError").textContent = "Password is required"
        return
      } else if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters"
        return
      }

      // Validate confirm password
      if (!confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Please confirm your password"
        return
      } else if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match"
        return
      }

      // Validate terms
      if (!termsChecked) {
        showNotification("Please agree to the Terms & Conditions", "error")
        return
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("users")) || []
      if (users.some((user) => user.email === email)) {
        document.getElementById("emailError").textContent = "Email already exists"
        return
      }

      // Add new user
      users.push({
        fullName,
        email,
        password,
      })

      // Save to local storage
      localStorage.setItem("users", JSON.stringify(users))

      // Show success message
      showNotification("Account created successfully! Redirecting to login...", "success")

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    })
  }

  // Check if user is logged in
  function checkLoggedInUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    if (currentUser && currentUser.loggedIn) {
      // Update navbar to show user is logged in
      const navLinks = document.querySelector(".nav-links")

      if (navLinks) {
        // Find the login and signup links
        const loginLink = Array.from(navLinks.querySelectorAll("a")).find((link) => link.textContent === "Login")
        const signupLink = Array.from(navLinks.querySelectorAll("a")).find((link) => link.textContent === "Signup")

        if (loginLink && signupLink) {
          // Replace login link with user name
          const loginLi = loginLink.parentElement
          loginLi.innerHTML = `<a href="#" class="user-profile"><i class="fas fa-user"></i> ${currentUser.name}</a>`

          // Replace signup link with logout
          const signupLi = signupLink.parentElement
          signupLi.innerHTML = `<a href="#" id="logoutBtn">Logout</a>`

          // Add logout functionality
          document.getElementById("logoutBtn").addEventListener("click", (e) => {
            e.preventDefault()

            // Remove current user from local storage
            localStorage.removeItem("currentUser")

            // Show logout message
            showNotification("Logged out successfully!", "success")

            // Reload page after 1.5 seconds
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
      }
    }
  }

  // Check if user is logged in on page load
  checkLoggedInUser()

  // Helper Functions

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Show notification
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`

    // Set icon based on notification type
    let icon = "fa-info-circle"
    if (type === "success") icon = "fa-check-circle"
    if (type === "error") icon = "fa-exclamation-circle"

    notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <p>${message}</p>
        `

    // Add to document
    document.body.appendChild(notification)

    // Style notification
    notification.style.position = "fixed"
    notification.style.top = "20px"
    notification.style.right = "20px"
    notification.style.padding = "15px 20px"
    notification.style.borderRadius = "var(--border-radius-md)"
    notification.style.display = "flex"
    notification.style.alignItems = "center"
    notification.style.gap = "10px"
    notification.style.zIndex = "1000"
    notification.style.transform = "translateX(100%)"
    notification.style.opacity = "0"
    notification.style.transition = "all 0.3s ease"

    // Set colors based on type
    if (type === "success") {
      notification.style.backgroundColor = "var(--success-color)"
      notification.style.color = "white"
    } else if (type === "error") {
      notification.style.backgroundColor = "var(--error-color)"
      notification.style.color = "white"
    } else {
      notification.style.backgroundColor = "var(--info-color)"
      notification.style.color = "white"
    }

    // Show notification with animation
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
      notification.style.opacity = "1"
    }, 10)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      notification.style.opacity = "0"

      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Floating flowers animation
  const flowers = document.querySelectorAll(".flower")
  if (flowers.length > 0) {
    flowers.forEach((flower) => {
      // Random initial position
      const randomX = Math.random() * 20 - 10 // -10 to 10
      const randomY = Math.random() * 20 - 10 // -10 to 10

      flower.style.transform = `translate(${randomX}px, ${randomY}px)`
    })
  }
})
