import React,{useEffect, useState} from 'react'
import '../App.css';
import CurrencySelect from './CurrencySelect';
const ConverterForm = () => {
const [amount,setAmount]=useState(1)
const [fromCurrency,setFromCurrency]=useState("USD")
const [toCurrency,setToCurrency]=useState("INR")
const [result, setResult]=useState()
const [loading, setLoading]=useState()
const handleSwapCurrencies=()=>{
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
}
const getExchangeValue=async()=>{
  const API_KEY="102aec804dfbbf5140d2f405";
  const API_URL=`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
  setLoading(true)
  try{
    const response=await fetch(API_URL);
    if(!response.ok) throw Error("something went wrong");
    const data=await response.json();
    const rate=(data.conversion_rate*amount).toFixed(2);
    setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`)
    console.log(data)
  }catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
}
const handlFormSubmit=(e)=>{
  e.preventDefault();
  getExchangeValue();
}
useEffect(()=>getExchangeValue,[])
  return (
    <form className="currency-converter-form" onSubmit={handlFormSubmit}>
        <div className="form-group">
          <label className='form-label'>Enter Amount</label>
          <input type="number" className="form-input" value={amount} onChange={e=>setAmount(e.target.value)} required />
        </div>
        <div className="form-group form-currency-group">
          <div className="form-section">
            <label className='form-label'>From</label>
           <CurrencySelect
           selectedCurrency={fromCurrency}
           handleCurrency={e=>setFromCurrency(e.target.value)}
           />
          </div>
          <div className="swap-icon" onClick={handleSwapCurrencies}>
            <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 
                .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 
                0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#FFF"
              />
            </svg>
          </div>
          <div className="form-section">
            <label className='form-label'>To</label>
            <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={e=>setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <button type='submit' className='submit-button'>Convert</button>
        <p className="calculated-value">{loading ? "Getting exchange value..." : result}</p>
      </form>
  )
}

export default ConverterForm