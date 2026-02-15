document.addEventListener('DOMContentLoaded', function() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const input4 = document.getElementById('input4');
    const form = document.getElementById('detailsForm');
    const input2Group = document.querySelector('.input-group:nth-child(2)');
    const input3Group = document.querySelector('.input-group:nth-child(3)');
    const input4Group = document.querySelector('.input-group:nth-child(4)');

    let inputData;

    // Initially hide input2, input3, and input4
    input2Group.style.display = 'none';
    input3Group.style.display = 'none';
    input4Group.style.display = 'none';

    // Fetch the JSON data
    fetch('inputData.json')
        .then(response => response.json())
        .then(data => {
            inputData = data;
            populateSelect(input1, data.input1Values);
            populateSelect(input3, data.karnatakaDistricts);
        })
        .catch(error => console.error('Error loading input data:', error));

    function populateSelect(selectElement, values) {
        selectElement.innerHTML = '<option value="">Select an option</option>'; // Clear existing options
        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    }

    function validateInput(input) {
        return input.value !== "";
    }

    input1.addEventListener('change', function() {
        if (this.value) {
            input2Group.style.display = 'block';
            const input2Values = inputData.input2Values[this.value] || [];
            populateSelect(input2, input2Values);
            input2.value = ''; // Reset input2 value
            input3Group.style.display = 'none'; // Hide input3
            input3.value = ''; // Reset input3 value
        } else {
            input2Group.style.display = 'none';
            input3Group.style.display = 'none';
        }
    });

    input2.addEventListener('change', function() {
        if (this.value) {
            input3Group.style.display = 'block';
        } else {
            input3Group.style.display = 'none';
        }
    });

    input3.addEventListener('change', function() {
        if (this.value) {
            input4Group.style.display = 'block';
        } else {
            input4Group.style.display = 'none';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateInput(input1) && validateInput(input2) && validateInput(input3) && validateInput(input4)) {
            // Store selections in localStorage
            localStorage.setItem('selectedCategory', input1.value);
            localStorage.setItem('selectedCrop', input2.value);
            localStorage.setItem('selectedDistrict', input3.value);
            localStorage.setItem('selectedSoilType', input4.value);
            
            // Redirect to dashboard
            window.location.href = 'Dashboard/dash.html';
        } else {
            alert('Please fill all fields');
        }
    });
});
