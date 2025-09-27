<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Delicious Pizza, <span>Amazing Cause</span></h1>
        <p>Join us in supporting Adventure Quest World Club while enjoying the best pizza in town! Every slice helps fund educational adventures for children worldwide.</p>
        <div class="hero-buttons">
          <a href="#menu" class="btn btn-primary" @click="scrollToSection('menu')">Order Now</a>
          <a href="#cause" class="btn btn-secondary" @click="scrollToSection('cause')">Learn More</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Delicious Pizza">
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 70,
      behavior: 'smooth'
    })
  }
}
</script>