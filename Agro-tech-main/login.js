function sendOTp() {
    const mobile = document.getElementById("mobile").value;
    const otpverify = document.getElementById("otpverify");
    const otp_val = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Show loading indicator
    document.getElementById("send-otp").textContent = "Sending...";

    // Simulate sending OTP (replace this with actual SMS sending logic)
    setTimeout(() => {
        // Hide loading indicator
        document.getElementById("send-otp").textContent = "Send OTP";

        alert(`Your OTP is: ${otp_val}`);
        otpverify.style.display = "flex";
        const otp_inp = document.getElementById("otp_inp");
        const otp_btn = document.getElementById("verify-otp");

        // Set up OTP verification
        otp_btn.addEventListener('click', () => {
            if (otp_inp.value == otp_val) {
                alert("OTP verified successfully!");
                // Redirect to form.html after successful verification
                window.location.href = 'form.html';
            } else {
                alert("Incorrect OTP. Please try again.");
            }
        });

        // Set up OTP expiration timer
        let timeLeft = 300; // 5 minutes in seconds
        const timerDisplay = document.getElementById("timer");
        const timerId = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerDisplay.textContent = "OTP expired. Please request a new one.";
                otp_btn.disabled = true;
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                timeLeft--;
            }
        }, 1000);
    }, 1000); // Simulating a 1-second delay for OTP sending
}
