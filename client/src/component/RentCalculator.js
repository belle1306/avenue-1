import React, { useState } from "react";

const RentCalculator = (props) => {
    // state to storage the values given by the user when filling the input fields
    const [userValues, setUserValues] = useState({
        amount: '',
        years: '',
    });

    // state to storage the results of the calculation
    const [results, setResults] = useState({
        bondPayment: '',
        monthlyRent: '',
        monthlyServiceFee: '',
        monthlyVAT: '',
        totalUpfront: '',
        totalMonthly: '',
        totalMonthlyOwner: '',
        totalPayment: '',
        isResult: false,
    });

    // state to storage error message
    const [error, setError] = useState('');

    // event handler to update state when the user enters values
    const handleInputChange = (event) =>
        setUserValues({ ...userValues, [event.target.name]: event.target.value });

    // Manage validations and error messages
    const isValid = () => {
        const { amount, years } = userValues;
        let actualError = '';
        // Validate if there are values
        if (!amount || !years) {
            actualError = 'All the values are required';
        }
        // Validate if the values are numbers
        if (isNaN(amount) || isNaN(years)) {
            actualError = 'All the values must be a valid number';
        }
        // Validate if the values are positive numbers
        if (Number(amount) <= 0 || Number(years) <= 0) {
            actualError = 'All the values must be a positive number';
        }
        if (actualError) {
            setError(actualError);
            return false;
        }
        return true;
    };

    // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
    const handleSubmitValues = (e) => {
        e.preventDefault();
        if (isValid()) {
            setError('');
            calculateResults(userValues);
        }
    };

    // Calculation
    const calculateResults = ({ amount, years }) => {
        const userAmount = Number(amount);
        const calculatedPayments = Number(years) * 12;
        const monthly = (userAmount * 4);

        if (isFinite(monthly)) {
            const bondPaymentCalculated = monthly.toFixed(2);
            const monthlyRentCalculated = monthly.toFixed(2);
            const monthlyServiceFeeCalculated = (monthly * 0.12).toFixed(2);
            const monthlyVATCalculated = (monthly * 0.2).toFixed(2);
            const totalUpfrontTenantCalculated = (monthly * 2).toFixed(2);
            const totalMonthlyCalculated = (monthly * (calculatedPayments - 2)).toFixed(2);
            const totalMonthlyOwnerCalculated = (((monthly * 0.12) + (monthly * 0.2)) * calculatedPayments).toFixed(2);
            const totalPaymentCalculated = ((monthly * 2) + (monthly * (calculatedPayments - 2)) + (((monthly * 0.12) + (monthly * 0.2)) * calculatedPayments)).toFixed(2);
            // Set up results to the state to be displayed to the user
            setResults({
                bondPayment: bondPaymentCalculated,
                monthlyRent: monthlyRentCalculated,
                monthlyServiceFee: monthlyServiceFeeCalculated,
                monthlyVAT: monthlyVATCalculated,
                totalUpfront: totalUpfrontTenantCalculated,
                totalMonthly: totalMonthlyCalculated,
                totalMonthlyOwner: totalMonthlyOwnerCalculated,
                totalPayment: totalPaymentCalculated,
                isResult: true,
            });
        }
        return;
    };

    // Clear input fields
    const clearFields = () => {
            setUserValues({
                amount: '',
                years: '',
            });

            setResults({
                bondPayment: '',
                monthlyRent: '',
                monthlyServiceFee: '',
                monthlyVAT: '',
                totalUpfront: '',
                totalMonthly: '',
                totalMonthlyOwner: '',
                totalPayment: '',
                isResult: false,
            });
    };

    return (
        <div className='calculator'>
            <div className='form'>
                {/* <h1>Rent Calculator</h1> */}
                {/* Display the error when it exists */}
                <p className='error'>{error}</p>
                <form onSubmit={handleSubmitValues}>
                    {/* ternary operator manages when the calculator and results will be displayed to the user */}
                    {!results.isResult ? (
                        //   Form to collect data from the user
                        <div className='form-items'>
                            <div>
                                <label id='label'>Weekly Rent $:</label>
                                <input
                                    type='text'
                                    name='amount'
                                    placeholder='Weekly rent amount'
                                    value={userValues.amount}
                                    // onChange method sets the values given by the user as input to the userValues state
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label id='label'>Year(s):</label>
                                <input
                                    type='text'
                                    name='years'
                                    placeholder='Tenure year(s)'
                                    value={userValues.years}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <input type='submit' className='btn btn-primary' />
                            <button className='btn btn-secondary' onClick={props.cancel}>Close</button>
                        </div>
                    ) : (
                            //   Form to display the results to the user
                            <div className='form-items'>
                                <h4>
                                    Weekly rent amount: ${userValues.amount} <br />Tenure year(s): {userValues.years} <br />Service Fee: 12% Monthly <br />VAT: 20% Monthly
                                </h4>
                                <div>
                                    <label id='label'>Bond Payment: <br />(Refundable as Final Month Rent Payment)</label>
                                    <input type='text' value={results.bondPayment} disabled />
                                </div>
                                <div>
                                    <label id='label'>Monthly Rent: </label>
                                    <input type='text' value={results.monthlyRent} disabled />
                                </div>
                                <div>
                                    <label id='label'>Monthly Service Fee:</label>
                                    <input type='text' value={results.monthlyServiceFee} disabled />
                                </div>
                                <div>
                                    <label id='label'>Monthly VAT:</label>
                                    <input type='text' value={results.monthlyVAT} disabled />
                                </div>
                                <div>
                                    <label id='label'>Total Upfront Payment (Tenant):</label>
                                    <input type='text' value={results.totalUpfront} disabled />
                                </div>
                                <div>
                                    <label id='label'>Total Monthly Rent (Tenant) ({userValues.years * 12 - 2} Months):</label>
                                    <input type='text' value={results.totalMonthly} disabled />
                                </div>
                                <div>
                                    <label id='label'>Total Monthly Service Fee & VAT (Owner) ({userValues.years * 12} Months):</label>
                                    <input type='text' value={results.totalMonthlyOwner} disabled />
                                </div>
                                <div>
                                    <label id='label'>Total Payment per Tenure (Tenant + Owner):</label>
                                    <input type='text' value={results.totalPayment} disabled />
                                </div>
                                {/* Button to clear fields */}
                                <input
                                    className='button'
                                    value='Calculate again'
                                    type='button'
                                    onClick={clearFields}
                                />
                            </div>
                        )}
                </form>
            </div>
        </div>
    );
}

export default RentCalculator;
