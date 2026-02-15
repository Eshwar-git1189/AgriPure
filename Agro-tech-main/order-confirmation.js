document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from URL parameters (sent from payment page)
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNumber');
    const productName = urlParams.get('productName');
    const quantity = urlParams.get('quantity');
    const totalAmount = urlParams.get('totalAmount');
    const address = urlParams.get('address');

    // Calculate estimated delivery date (5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    // Populate order details
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('product-name').textContent = productName;
    document.getElementById('quantity').textContent = quantity;
    document.getElementById('total-amount').textContent = totalAmount;

    // Populate delivery details
    document.getElementById('delivery-date').textContent = deliveryDate.toDateString();
    document.getElementById('delivery-address').textContent = address;

    // Set up "Continue Shopping" button
    document.getElementById('back-to-shop').addEventListener('click', function() {
        window.location.href = 'shop.html'; // Replace with your shop page URL
    });
});
