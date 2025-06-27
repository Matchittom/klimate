(function () {
    let electricBill = document.getElementById('electricBill');
    let gasBill = document.getElementById('gasBill');
    let oilBill = document.getElementById('oilBill');
    let carMileage = document.getElementById('carMileage');
    let shortFlights = document.getElementById('shortFlights');
    let longFlights = document.getElementById('longFlights');
    const carbonForm = document.getElementById('carbonForm');
  
    let errors = [];
    const checkIsProperNumber = (val, variableName) => {
      if (typeof val !== 'number')
        errors.push(`Must provide a number for '${variableName}'`);
  
      if (isNaN(val)) errors.push(`Must provide a number for '${variableName}'`);
    };
  
    if (carbonForm) {
      carbonForm.addEventListener('submit', (event) => {
        errors = [];
        if (errorDiv) errorDiv.hidden = true;
  
        if (resultDiv) resultDiv.hidden = true;
  
        checkIsProperNumber(parseInt(electricBill.value), 'Electric Bill');
        checkIsProperNumber(parseInt(gasBill.value), 'Gas Bill');
        checkIsProperNumber(parseInt(oilBill.value), 'Oil Bill');
        checkIsProperNumber(parseInt(carMileage.value), 'Car Mileage');
        checkIsProperNumber(parseInt(shortFlights.value), 'Short Flights');
        checkIsProperNumber(parseInt(longFlights.value), 'Long Flights');
       
        if (errors.length > 0) {
          let myUL = document.createElement('ul');
  
          event.preventDefault();
          for (let i = 0; i < errors.length; i++) {
            let myLi = document.createElement('li');
            myLi.classList.add('error');
            myLi.innerHTML = errors[i];
            myUL.appendChild(myLi);
          }
          carbonForm.appendChild(myUL);
        }
      });
    }
  })();