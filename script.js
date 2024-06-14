document.addEventListener('DOMContentLoaded', function() {
    const carValueInput = document.getElementById('car-value');
    const downPaymentInput = document.getElementById('down-payment');
    const leasePeriodInput = document.getElementById('lease-period');
    const carValueSlider = document.getElementById('car-value-slider');
    const downPaymentSlider = document.getElementById('down-payment-slider');

    carValueSlider.addEventListener('input', () => {
        carValueInput.value = carValueSlider.value;
        calculateLeasingDetails();
        updateSliderBackground(carValueSlider);
    });

    downPaymentSlider.addEventListener('input', () => {
        downPaymentInput.value = downPaymentSlider.value;
        calculateLeasingDetails();
        updateSliderBackground(downPaymentSlider);
    });

    carValueInput.addEventListener('input', () => {
        carValueSlider.value = carValueInput.value;
        calculateLeasingDetails();
        updateSliderBackground(carValueSlider);
    });

    downPaymentInput.addEventListener('input', () => {
        downPaymentSlider.value = downPaymentInput.value;
        calculateLeasingDetails();
        updateSliderBackground(downPaymentSlider);
    });

    leasePeriodInput.addEventListener('input', () => {
        calculateLeasingDetails();
    });

    function calculateLeasingDetails() {
        const carValue = parseFloat(carValueInput.value);
        const downPaymentPercentage = parseFloat(downPaymentInput.value);
        const leasePeriod = parseFloat(leasePeriodInput.value);
        const downPaymentAmount = carValue * (downPaymentPercentage / 100);
        let car_type = document.getElementById('car-type').value
        let interestRate = 0;
        
        if(car_type == "brand-new"){
            interestRate = 2.99 / 100
            document.getElementById('interest-rate').innerText = `2.99%`;
        } else {
            interestRate = 3.7 / 100
            document.getElementById('interest-rate').innerText = `3.7%`;
        }
        
        let principalAmount = carValue - downPaymentAmount
        let monthlyRate = interestRate / 12;
        
        const monthlyInstallment = principalAmount * monthlyRate * Math.pow(1 + monthlyRate, leasePeriod) / (Math.pow(1 + monthlyRate, leasePeriod) - 1);
        const totalLeasingCost = monthlyInstallment * leasePeriod + downPaymentAmount;

        document.getElementById('total-cost').innerText = `€${totalLeasingCost.toFixed(2)}`;
        document.getElementById('down-payment-amount').innerText = `€${downPaymentAmount.toFixed(2)}`;
        document.getElementById('monthly-installment').innerText = `€${monthlyInstallment.toFixed(2)}`;
    }

    function updateSliderBackground(slider) {
        const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #0e46ff ${percentage}%, #ddd ${percentage}%)`;
    }

    calculateLeasingDetails();
    updateSliderBackground(carValueSlider);
    updateSliderBackground(downPaymentSlider);
});
