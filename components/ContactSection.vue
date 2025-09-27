<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-header">
        <h2>Get Involved</h2>
        <p>Contact us to order, volunteer, or learn more</p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h4>Location</h4>
              <p>123 Community Center Drive<br>Anytown, ST 12345</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <div>
              <h4>Phone</h4>
              <p>(555) 123-4567</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
              <h4>Email</h4>
              <p>info@pizzaforacause.org</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-clock"></i>
            <div>
              <h4>Event Hours</h4>
              <p>Saturday, October 15th<br>11:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input v-model="formData.name" type="text" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <input v-model="formData.email" type="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
              <input v-model="formData.phone" type="tel" placeholder="Phone Number">
            </div>
            <div class="form-group">
              <textarea v-model="formData.message" placeholder="Special requests or questions..." rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const handleSubmit = () => {
  // Simple validation
  if (props.cart.length === 0) {
    alert('Please add at least one pizza to your order!')
    return
  }
  
  // Calculate total
  const total = props.cart.reduce((sum, item) => sum + item.price, 0)
  
  // Show confirmation
  alert(`Thank you ${formData.value.name}! Your order has been placed.\n\nOrder Summary:\n${props.cart.map(item => `${item.name} - $${item.price}`).join('\n')}\n\nTotal: $${total.toFixed(2)}\n\nWe'll contact you at ${formData.value.email} to confirm your order.`)
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
  
  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>