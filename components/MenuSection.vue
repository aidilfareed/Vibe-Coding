<template>
  <section id="menu" class="menu">
    <div class="container">
      <div class="section-header">
        <h2>Our Pizza Menu</h2>
        <p>Every pizza supports Adventure Quest World Club</p>
      </div>
      <div class="menu-grid">
        <div 
          v-for="pizza in pizzas" 
          :key="pizza.id"
          class="menu-item"
        >
          <div class="menu-image">
            <img :src="pizza.image" :alt="pizza.name">
          </div>
          <div class="menu-info">
            <h3>{{ pizza.name }}</h3>
            <p>{{ pizza.description }}</p>
            <div class="menu-price">${{ pizza.price }}</div>
            <button 
              class="btn btn-small add-to-cart" 
              @click="addToCart(pizza)"
              :disabled="pizza.added"
            >
              {{ pizza.added ? 'Added! 🎉' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pizzas = ref([
  {
    id: 1,
    name: 'Margherita Classic',
    description: 'Fresh mozzarella, tomato sauce, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    added: false
  },
  {
    id: 2,
    name: 'Pepperoni Passion',
    description: 'Spicy pepperoni with extra cheese and tomato sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    added: false
  },
  {
    id: 3,
    name: 'Garden Fresh Veggie',
    description: 'Bell peppers, mushrooms, onions, olives, and tomatoes',
    price: 13.99,
    image: 'https://www.mexicangoldenchicken.com/wp-content/uploads/2023/11/mushroom-pizza-1-1024x1024.webp',
    added: false
  },
  {
    id: 4,
    name: 'BBQ Chicken Delight',
    description: 'Grilled chicken, red onions, and tangy BBQ sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    added: false
  }
])

const cart = ref([])

const addToCart = (pizza) => {
  cart.value.push({ ...pizza })
  pizza.added = true
  
  // Reset button text after 2 seconds
  setTimeout(() => {
    pizza.added = false
  }, 2000)
  
  console.log(`Added ${pizza.name} to cart. Total items: ${cart.value.length}`)
}

// Provide cart to parent component
defineExpose({
  cart
})
</script>