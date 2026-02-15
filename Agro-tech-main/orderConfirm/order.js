document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNumber');
    const productName = urlParams.get('productName');
    const quantity = urlParams.get('quantity');
    const totalAmount = urlParams.get('totalAmount');
    const email = urlParams.get('email');
    const paymentMethod = urlParams.get('paymentMethod');

    // Calculate estimated delivery date (5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    // Populate order details
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('product-name').textContent = productName;
    document.getElementById('quantity').textContent = quantity;
    document.getElementById('total-amount').textContent = totalAmount;
    document.getElementById('payment-method').textContent = paymentMethod;

    // Populate delivery details
    document.getElementById('delivery-date').textContent = deliveryDate.toDateString();
    document.getElementById('email').textContent = email;

    // Store the purchased product information in localStorage
    localStorage.setItem('recentPurchase', JSON.stringify({
        productName: productName,
        productType: paymentMethod.toLowerCase().includes('cod') ? 'pesticides' : 'fertilizers' // Assuming COD is for pesticides, otherwise fertilizers
    }));

    // Set up "Continue Shopping" button
    document.getElementById('back-to-shop').addEventListener('click', function() {
        window.location.href = '../../Dashboard/dash.html'; // Adjust this path as needed
    });
});
