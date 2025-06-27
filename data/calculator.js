

export function calculateCarbonFootprint(data) {
    const {
        electricBill,
        gasBill,
        oilBill,
        carMileage,
        shortFlights,
        longFlights,
        recycleNewspaper,
        recycleMetal
    } = data;
    console.log(typeof electricBill, typeof gasBill, typeof oilBill, typeof carMileage, typeof shortFlights, typeof longFlights, typeof recycleNewspaper, typeof recycleMetal);

    if (typeof electricBill !== 'number' || typeof gasBill !== 'number' || typeof oilBill !== 'number' || typeof carMileage !== 'number' || typeof shortFlights !== 'number' || typeof longFlights !== 'number' || typeof recycleNewspaper !== 'boolean' || typeof recycleMetal !== 'boolean') {
    throw new Error('Please check input values');
}

    const carbonFootprint =
        electricBill * 105 +
        gasBill * 105 +
        oilBill * 113 +
        carMileage * 0.79 +
        shortFlights * 1100 +
        longFlights * 4400 +
        (recycleNewspaper ? 0 : 184) +
        (recycleMetal ? 0 : 166);

    return carbonFootprint;
}

// const testData = {
//     electricBill: 100,
//     gasBill: 50,
//     oilBill: 20,
//     carMileage: 5000,
//     shortFlights: 2,
//     longFlights: 1,
//     recycleNewspaper: false,
//     recycleMetal: true
// };

// const result = calculateCarbonFootprint(testData);

// console.log(result);
