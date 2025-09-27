<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <i class="fas fa-pizza-slice"></i>
        <span>Pizza for a Cause</span>
      </div>
      <nav class="nav">
        <ul>
          <li><a href="#home" @click="scrollToSection('home')">Home</a></li>
          <li><a href="#about" @click="scrollToSection('about')">About</a></li>
          <li><a href="#menu" @click="scrollToSection('menu')">Menu</a></li>
          <li><a href="#cause" @click="scrollToSection('cause')">Our Cause</a></li>
          <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
        </ul>
      </nav>
      <div class="mobile-menu-btn" @click="toggleMobileMenu">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 70,
      behavior: 'smooth'
    })
  }
  // Close mobile menu after clicking
  if (window.innerWidth <= 768) {
    isMobileMenuOpen.value = false
  }
}

// Watch for window resize to handle mobile menu
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      isMobileMenuOpen.value = false
    }
  }
  window.addEventListener('resize', handleResize)
  
  // Apply initial mobile menu state
  if (window.innerWidth <= 768) {
    document.querySelector('.nav').style.display = 'none'
  }
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

watch(isMobileMenuOpen, (newVal) => {
  const nav = document.querySelector('.nav')
  if (nav) {
    nav.style.display = newVal ? 'flex' : 'none'
  }
})
</script>

<style scoped>
.nav {
  display: flex;
}
</style>