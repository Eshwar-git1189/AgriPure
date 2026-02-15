document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productType = urlParams.get('type');
    const discountedPrice = urlParams.get('price');

    fetchProductDetails(productId, productType)
        .then(product => {
            if (product) {
                const productImage = document.getElementById('productImage');
                if (productImage) productImage.src = product.details.image_url;

                const productName = document.getElementById('productName');
                if (productName) productName.textContent = product.name;

                const productQuantity = document.getElementById('productQuantity');
                if (productQuantity) productQuantity.textContent = `Quantity: ${product.details.quantity}`;

                const productPrice = document.getElementById('productPrice');
                if (productPrice) productPrice.textContent = `Original Price: ${product.details.cost_price || product.details.cost}`;

                const discountedPriceElement = document.getElementById('discountedPrice');
                if (discountedPriceElement) discountedPriceElement.textContent = `Discounted Price (10% off): ${discountedPrice}`;

                const paymentForm = document.getElementById('paymentForm');
                if (paymentForm) {
                    paymentForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const email = document.getElementById('email').value;
                        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
                        
                        // Create order data
                        const orderData = {
                            orderNumber: 'ORD' + Math.floor(100000 + Math.random() * 900000),
                            productName: document.getElementById('productName').textContent,
                            quantity: document.getElementById('productQuantity').textContent.split(': ')[1],
                            totalAmount: discountedPrice,
                            email: email,
                            paymentMethod: paymentMethod
                        };

                        // Redirect to order confirmation page with order data
                        const params = new URLSearchParams(orderData);
                        window.location.href = `../orderConfirm/order.html?${params.toString()}`;
                    });
                }
            } else {
                throw new Error('Product not found');
            }
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
            const container = document.querySelector('.container');
            if (container) {
                container.innerHTML = '<p>Error loading product details. Please try again later.</p>';
            }
        });
});

function fetchProductDetails(productId, productType) {
    return fetch('../../Dashboard/pesti.json')
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
            return product;
        });
}
