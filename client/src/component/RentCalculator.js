import React, { useState } from "react";
import NumberFormat from "react-number-format";

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
    // const [error, setError] = useState('');

    // event handler to update state when the user enters values
    const handleInputChange = (event) =>
        setUserValues({ ...userValues, [event.target.name]: event.target.value });

    // Manage validations and error messages
    // const isValid = () => {
    //     const { amount, years } = userValues;
    //     let actualError = '';
    //     // Validate if there are values
    //     // if (!amount || !years) {
    //     //     actualError = 'All the values are required';
    //     // }
    //     // Validate if the values are numbers
    //     // if (isNaN(amount) || isNaN(years)) {
    //     //     actualError = 'All the values must be a valid number';
    //     // }
    //     // Validate if the values are positive numbers
    //     // if (Number(amount) <= 0 || Number(years) <= 0) {
    //     //     actualError = 'All the values must be a positive number';
    //     // }
    //     if (actualError) {
    //         setError(actualError);
    //         return false;
    //     }
    //     return true;
    // };

    // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the rent
    const handleSubmitValues = (e) => {
        e.preventDefault();
        calculateResults(userValues);
    };

    // Reset calculator input value
    const resetInput = (e) => {
        e.preventDefault();
        clearFields();
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
        <div className='container'>
            <div className='row'>
                <div className='col mx-auto calculate-form'>
                    <div id='rent-calculator' className='card border-primary card-body text-center'>
                        <h1 className='heading display-5'>Rent Calculator</h1>
                            {/* Display the error when it exists */}
                            {/* <p className='error'>{error}</p> */}
                            <form id='rent-form' autocomplete='off' onSubmit={handleSubmitValues}>
                                {/* ternary operator manages when the calculator and results will be displayed to the user */}
                                {!results.isResult ? (
                                    //   Form to collect data from the user
                                <div className='form'>
                                    <div className='form-group'>
                                        <div className='input-group'>
                                            <div className='input-group-prepend'>
                                                <span className='input-group-text'>$</span>
                                            </div>
                                            <input
                                                required
                                                type='number'
                                                min = '1'
                                                name='amount'
                                                className='form-control'
                                                placeholder='Weekly rent amount'
                                                value={userValues.amount}
                                                // onChange method sets the values given by the user as input to the userValues state
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className='form-group'>
                                        <div className='input-group'>
                                            <div className='input-group-prepend'>
                                                <span className='input-group-text'>#</span>
                                            </div>
                                            <input
                                                required
                                                type='number'
                                                min = '0.1'
                                                step = '.00000001'
                                                name='years'
                                                className='form-control'
                                                placeholder='Tenure year(s)'
                                                value={userValues.years}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div><br/>
                                    <input type='submit' className='btn btn-primary' />
                                    <button className='btn btn-danger' onClick={resetInput}>Reset</button>
                                    <button className='btn btn-secondary' onClick={props.cancel}>Close</button>
                                </div>
                            ) : (
                                    //   Form to display the results to the user
                                    <div className='form-results'>
                                        <h4>Weekly rent amount: ${userValues.amount} <br />Tenure year(s): {userValues.years}</h4>
                                        <h6>Service Fee (SF): 12% Monthly <br />Value Added Tax (VAT): 20% Monthly</h6>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Bond</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.bondPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Monthly Rent</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.monthlyRent} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Monthly SF</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.monthlyServiceFee} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Monthly VAT</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.monthlyVAT} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Upfront (T)</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.totalUpfront} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Total Monthly Rent (T)</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.totalMonthly} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Total Monthly SF + VAT (O)</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.totalMonthlyOwner} displayType={'text'} thousandSeparator={true} prefix={'$'} disabled />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <span className='input-group-text'>Total Collection per Tenure (T+O)</span>
                                                </div>
                                                <NumberFormat className='form-control' value={results.totalPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            </div>
                                        </div>
                                        <p>(T): Tenant | (O): Owner</p>
                                        {/* Button to clear fields */}
                                        <input
                                            className='btn btn-primary'
                                            value='Calculate again'
                                            type='button'
                                            onClick={clearFields}
                                        />
                                    </div>
                                )}
                            </form>
                    </div>
                </div>        
            </div>            
        </div>
    );
}

export default RentCalculator;
