<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Global styles */
body {
  overflow-x: hidden;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-primary {
  background: #e74c3c;
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.btn-primary:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.btn-secondary:hover {
  background: #e74c3c;
  color: white;
  transform: translateY(-2px);
}

.btn-small {
  padding: 8px 16px;
  font-size: 0.9rem;
}
</style>