<template>
  <div class="products-container">
    <div class="basket-container">
      <img :src="getImagePath('cesta.jpg')" alt="Basket Image" class="basket-image" @click="openBasketModal" />
    </div>
    <div class="product-grid">
      <div class="product" v-for="product in products" :key="product.id">
        <img :src="getImagePath(product.image)" alt="Product Image" class="product-image" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
        <div class="rating">
          <i v-for="star in 5" :key="star" class="pi" :class="star <= product.rating ? 'pi-star-fill' : 'pi-star'"></i>
        </div>
      </div>
    </div>
    <div v-if="showBasketModal" class="basket-modal">
      <div class="modal-content">
        <h2>Select your products</h2>
        <div v-for="product in products" :key="product.id" class="modal-product">
          <input type="checkbox" :id="`product-${product.id}`" @change="toggleProductSelection(product)">
          <label :for="`product-${product.id}`">{{ product.name }} - {{ product.price }}</label>
        </div>
        <p>Total: {{ totalPrice }}</p>
        <button @click="confirmPurchase" class="pay-button">Pay</button>
        <button @click="closeBasketModal" class="close-button">Close</button>
      </div>
    </div>
    <div v-if="showSuccessMessage" class="success-message">
      <div class="success-content">
        <h2>Payment made successfully</h2>
        <button @click="closeSuccessMessage" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import enRecommendedProducts from '../../locales/en.products.json';
import esRecommendedProducts from '../../locales/es.products.json';
import { Product } from '@/components/Products/products.entity.js'; // Importar la entidad Product

export default {
  data() {
    return {
      products: [],
      showBasketModal: false,
      showSuccessMessage: false,
      selectedProducts: [],
      totalPrice: 0,
    };
  },
  created() {
    this.loadRecommendedProducts();
  },
  methods: {
    loadRecommendedProducts() {
      const currentLocale = this.$i18n.locale;
      const productData = currentLocale === 'en' ? enRecommendedProducts : esRecommendedProducts;

      // Convertir cada producto en una instancia de Product
      this.products = productData.map(product => new Product(product));
    },
    getImagePath(imageName) {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    },
    openBasketModal() {
      this.showBasketModal = true;
    },
    closeBasketModal() {
      this.showBasketModal = false;
    },
    toggleProductSelection(product) {
      const index = this.selectedProducts.findIndex(p => p.id === product.id);
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
      } else {
        this.selectedProducts.push(product);
      }
      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      this.totalPrice = this.selectedProducts.reduce((total, product) => {
        // Eliminamos el símbolo de dólar y convertimos a número
        const cleanPrice = parseFloat(product.price.replace('$', ''));
        return total + cleanPrice;
      }, 0).toFixed(2);
    },
    confirmPurchase() {
      this.showBasketModal = false;
      this.showSuccessMessage = true;
    },
    closeSuccessMessage() {
      this.showSuccessMessage = false;
    }
  },
  watch: {
    '$i18n.locale'(newLocale) {
      this.loadRecommendedProducts();
    }
  }
}
</script>

<style scoped>
.products-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.basket-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.basket-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  border: 2px solid #007BFF;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 60%;
}

.product {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;
}

.product:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10%;
  margin-bottom: 10px;
  object-fit: cover;
}

.product-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.product-description {
  font-size: 1em;
  color: #777;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #007BFF;
  margin-bottom: 10px;
}

.rating {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pi-star, .pi-star-fill {
  font-size: 1.5em;
  color: gold;
}

.basket-modal,
.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius: 8px;
  width: 300px;
  border: 2px solid green;
  color: black;
}

.modal-content,
.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-product,
.success-content {
  margin: 5px 0;
}

.pay-button {
  background-color: #28a745; /* Verde */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.close-button {
  background-color: #dc3545; /* Rojo */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.success-message {
  border: 2px solid #28a745;
}

h2 {
  color: #28a745; /* Verde */
}

</style>
