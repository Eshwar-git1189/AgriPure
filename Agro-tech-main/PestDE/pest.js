document.addEventListener('DOMContentLoaded', function() {
    // Get the product details from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productType = urlParams.get('type');

    // Fetch the product details
    fetchProductDetails(productId, productType)
        .then(product => {
            // Update the page with the product details
            document.getElementById('productImage').src = product.details.image_url;
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productDescription').textContent = `Quantity: ${product.details.quantity}`;
            document.getElementById('productPrice').textContent = `Price: ${product.details.cost_price || product.details.cost}`;

            // Add event listener to the Buy Now button
            document.getElementById('buyNowBtn').addEventListener('click', function() {
                const discountedPrice = calculateDiscountedPrice(product.details.cost_price || product.details.cost);
                const payUrl = `../pay/pay.html?id=${encodeURIComponent(productId)}&type=${encodeURIComponent(productType)}&price=${encodeURIComponent(discountedPrice)}`;
                window.location.href = payUrl;
            });
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
            // Display an error message to the user
            document.querySelector('.container').innerHTML = '<p>Error loading product details. Please try again later.</p>';
        });
});

function fetchProductDetails(productId, productType) {
    // Fetch the pesticides and fertilizers data
    return fetch('../Dashboard/pesti.json')
        .then(response => response.json())
        .then(data => {
            let product;
            data.crops.forEach(category => {
                category.crops.forEach(crop => {
                    const products = productType === 'pesticides' ? crop.pesticides : crop.fertilizers;
                    const foundProduct = products.find(p => (p.id === productId || p.name === productId));
                    if (foundProduct) {
                        product = foundProduct;
                    }
                });
            });
            if (product) {
                return product;
            } else {
                throw new Error('Product not found');
            }
        });
}

function calculateDiscountedPrice(originalPrice) {
    const price = parseFloat(originalPrice.replace(/[^\d.]/g, ''));
    const discountedPrice = price * 0.9; // 10% discount
    return `₹${discountedPrice.toFixed(2)}`;
}
