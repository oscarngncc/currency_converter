import moment from 'moment';
import React, {  useEffect, useState } from 'react'
import styles from './styles.module.css'


//Example of currencies prop
const exampleCurrenciesProps = {
  primary: "usd",
  list: {
    usd: { value: 1, sign: "$", name: "United States Dollar" },
    gbp: { value: 0.7188, sign: "£", name: "British Pound"  },
    hkd: { value: 7.7771, sign: "$", name: "Hong Kong Dollar" },
  }
}

//Example of text props
const exampleTextProps = {
  switch: "switch",
  equals: "equal",
  time: moment().toDate().toDateString(),
  placeholder: "enter a number"
}


const exampleClassesProps = {
  body: "",
  inputText: "",
  outputText: "",
  clock: "",
  input: "",
  options: "",
  button: "",
  formula: "",
}



export const CurrencyConverter = ( props ) => {
  //Props property
  const currencies = props.currencies ?? exampleCurrenciesProps;
  const customClasses = props.customClasses ?? exampleClassesProps;
  const texts = props.texts ?? exampleTextProps;
  const decimal = props.decimal ?? 4;

  const superCurrency = currencies.primary ?? "usd";
  const timeformat = texts.timeformat ?? null;


  //useState properties
  const [ quantity, setQuantity ] = useState(1);
  const [ currencyLHS, setCurrencyLHS ] = useState( superCurrency );
  const [ currencyRHS, setCurrencyRHS ] = useState( superCurrency );
  const [ time, setTime ] = useState( (timeformat) ?  moment().format(timeformat): null  );
  
  const list = currencies.list ?? {};
  const lhs = list[currencyLHS] ?? {};
  const rhs = list[currencyRHS] ?? {};
  const oneSuperCurrencyToLHS = lhs.value ?? 1;
  const oneSuperCurrencyToRHS = rhs.value ?? 1; 
  const currencyLHSName = lhs.name ?? currencyLHS;
  const currencyRHSName = rhs.name ?? currencyRHS;


  const convertValue = oneSuperCurrencyToRHS / oneSuperCurrencyToLHS;
  const totalValue = convertValue * quantity;

  const rounding = (value) => {
    const round = Math.pow(10, decimal );
    return Math.round(value * round) / round; 
  }

  //switch currency
  const switchCurrencies = () => {
    const temp = currencyRHS;
    setCurrencyRHS(currencyLHS);
    setCurrencyLHS(temp);
  }


  //get all options
  const getOptions = () => {
    return Object.keys(list).map((key, index) => {
      return <option value={key} key={key}   >{ list[key].name ?? key }</option>
    });
  }

  
  useEffect(() => {
    if (timeformat) {
      setTimeout( () => {
        setTime(  moment().format(timeformat)  )
      } ,1000);
    }
  })
  

  return (
    <div className={ `${styles.currencyConverter} ${customClasses.body}`  }    >
      <p className={` ${styles.inputHeader}  ${customClasses.inputText}`  }   >{`${quantity} ${ currencyLHSName } ${texts.equals ?? exampleTextProps.equals} ` }</p>
      <p className={ `${styles.convertedResult} ${customClasses.outputText}` }  > {`${ rounding(totalValue) }  ${ currencyRHSName }`} </p>    
      <p className={ `${styles.clock} ${customClasses.clock}` }  >{ time ?? exampleTextProps.time }</p>

      <input className={ `${styles.currencyInput} ${customClasses.input}` }  
      placeholder={texts.placeholder ?? exampleTextProps.placeholder }
      type="number" onChange={ (event) => setQuantity(event.target.value)  }  ></input>
      <select className={ `${styles.currencyOptions} ${customClasses.option}`  }  value={currencyLHS}  onChange={(event)=>setCurrencyLHS( event.target.value )}>
        { getOptions() }
      </select>
      <select className={ `${styles.currencyOptions} ${customClasses.option}` }  value={currencyRHS} onChange={(event)=>setCurrencyRHS( event.target.value )}>
        { getOptions() }
      </select>
        
      <button className={`${styles.currencySwitch} ${customClasses.switch}`}  onClick={() => switchCurrencies() } > {texts.switch} </button>
      <p className={ `${styles.currencyFormula} ${customClasses.formula}`} >{`1 ${currencyLHSName} = ${ rounding(convertValue) } ${currencyRHSName}`}</p>

    </div>
  );
}