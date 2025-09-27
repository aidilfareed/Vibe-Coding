<template>
  <div>
    <Header ref="headerComponent" />
    <HeroSection />
    <AboutSection />
    <MenuSection ref="menuComponent" />
    <CauseSection />
    <ContactSection :cart="cart" />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const headerComponent = ref(null)
const menuComponent = ref(null)
const cart = ref([])

// Sync cart from menu component
onMounted(() => {
  const updateCart = () => {
    if (menuComponent.value && menuComponent.value.cart) {
      cart.value = menuComponent.value.cart
    }
  }
  
  // Update cart initially
  updateCart()
  
  // Set up interval to keep cart synced (in a real app, you'd use a store)
  const cartInterval = setInterval(updateCart, 100)
  
  // Clean up interval on unmount
  onUnmounted(() => {
    clearInterval(cartInterval)
  })
})
</script>