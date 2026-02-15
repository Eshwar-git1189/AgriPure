document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');

  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('active');
  });

  // Get user selections from localStorage
  const selectedCategory = localStorage.getItem('selectedCategory');
  const selectedCrop = localStorage.getItem('selectedCrop');
  const selectedDistrict = localStorage.getItem('selectedDistrict');
  const selectedSoilType = localStorage.getItem('selectedSoilType');

  // Display user selections
  document.getElementById('selected-category').textContent = `Category: ${selectedCategory}`;
  document.getElementById('selected-crop').textContent = `Crop: ${selectedCrop}`;
  document.getElementById('selected-district').textContent = `District: ${selectedDistrict}`;
  document.getElementById('selected-soil-type').textContent = `Soil Type: ${selectedSoilType}`;

  // Fetch the pesticides and fertilizers data
  fetch('pesti.json')
    .then(response => response.json())
    .then(data => {
      const categoryData = data.crops.find(cat => cat.category === selectedCategory);
      if (categoryData) {
        const cropData = categoryData.crops.find(crop => crop.name === selectedCrop);
        if (cropData) {
          displayProducts('fertilizers', cropData.fertilizers);
          displayProducts('pesticides', cropData.pesticides);
        } else {
          console.error('Selected crop not found in the data');
        }
      } else {
        console.error('Selected category not found in the data');
      }
    })
    .catch(error => console.error('Error loading data:', error));

  function displayProducts(sectionId, products) {
    const section = document.getElementById(sectionId);
    const productGrid = section.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing content

    if (!products || products.length === 0) {
      productGrid.innerHTML = `<p>No recommended ${sectionId} for this crop.</p>`;
      return;
    }

    // Get the recent purchase information
    const recentPurchase = JSON.parse(localStorage.getItem('recentPurchase')) || {};

    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      const details = product.details || product;
      
      // Check if this product was recently purchased
      const isRecentPurchase = recentPurchase.productName === product.name && recentPurchase.productType === sectionId;
      
      if (isRecentPurchase) {
        productItem.classList.add('recent-purchase');
      }
      
      // Create a link element
      const link = document.createElement('a');
      link.href = `../PestDE/pest.html?id=${product.id || product.name}&type=${sectionId}`;
      
      link.innerHTML = `
        <img src="${details.image_url}" alt="${product.name}" width="100">
        <h3>${product.name}</h3>
        <p class="product-quantity">Quantity: ${details.quantity}</p>
        <p class="product-cost">Cost: ${details.cost_price || details.cost}</p>
      `;
      
      productItem.appendChild(link);
      productGrid.appendChild(productItem);
      
      console.log(`Created link: ../PestDE/pest.html?id=${product.id || product.name}&type=${sectionId}`);
    });

    // Clear the recent purchase information from localStorage
    localStorage.removeItem('recentPurchase');
  }
});
