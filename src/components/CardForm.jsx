


const CardForm = ({formData, updateFormData, toggleForm, setToggleForm}) => {

    const normalizeCardNumber = (card) => {
        // if(!(new RegExp(/[0-9]|\d+/g).test(card[card.length-1]))){
        //   return card.replace(card[card.length-1], '');
        // }
        return card.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
    }
    
    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = name==='cardnumber'?e.target.value.replace(/\s/g, ""):e.target.value;
        const validationObj = validateField(name, value)
        updateFormData({
            [name]: value,
            ...validationObj,
        })
    }

    const validateField = (fieldname, value) => {
        let isValidValue = formData[`${fieldname}valid`] || ''
        const formErrorField = formData.formErrors;
        let expMvalid = formData.expMvalid   
        let expYvalid = formData.expYvalid

        switch ( fieldname) {
            case 'cardname':
                isValidValue = (/^([a-zA-Z\s]{5,})$/).test(value)
                formErrorField.cardname = isValidValue?'':'Only letters and more than 5 chars.';
                break;
            case('cardnumber'): {
                isValidValue = ((/^([0-9]{16})$/).test(value));
                formErrorField.cardnumber = isValidValue?'':'Wrong format, only numbers and must be 16.';
                break;
            }
            case('expM'): {
                if (value.length===0){
                    formErrorField.expdate = 'Can`t be blank';
                    isValidValue = false
                    break; 
                }
                expMvalid = value < 13
                isValidValue = expMvalid
                formErrorField.expdate = (expMvalid && expYvalid)?'':'Wrong date format';
                break;
            }

            case('expY'): {
                if (value.length===0){
                    formErrorField.expdate = 'Can`t be blank';
                    isValidValue = false
                    break; 
                }
                expYvalid = value > 22
                isValidValue = expYvalid
                formErrorField.expdate = (expMvalid && expYvalid)?'':'Wrong date format';
                break;
            }

            case('cvc'): {
                isValidValue = ((/^([0-9]{3})$/).test(value));
                formErrorField.cvc = isValidValue?'':'Wrong format, 3 digits number. '
                break;
            }
        
            default:
                break;
        }

        return {
            formErrors: formErrorField,
            [`${fieldname}valid`]: isValidValue,            
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
        setToggleForm(true);
        console.log(toggleForm);
      }
    

    return (
        <form class={`w-full max-w-[420px] ${!toggleForm?'block':'hidden'}`} onSubmit={onSubmit}>
            <div class="flex flex-wrap -mx-3 mb-6 tracking-widest">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                    <label className="block uppercase text-gray-700 text-xs  mb-2" for="cardname">
                    cardholder name
                    </label>
                    <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:activeib focus:bg-white" name="cardname" type="text" placeholder="e.g. Jane Appleseed" value={formData.cardname} onChange={handleUserInput} maxLength={20}/>
                    <small className="text-red-400 text-[11px]">{formData.formErrors['cardname']}</small>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase text-gray-700 text-xs mb-2" for="cardnumber" >
                    card number
                    </label>
                    <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:bg-white" name="cardnumber"
                    type="tel" placeholder="e.g. 1234 5678 9123 0000" maxLength={19} inputMode="numeric" autoComplete="cc-number" value={normalizeCardNumber(formData.cardnumber)}
                    onChange={handleUserInput} />
                    <small className="text-red-400 text-[11px]">{formData.formErrors['cardnumber']}</small>
                </div>
            </div>
            
            <div className="flex flex-row flex-wrap -mx-3 mb-2 tracking-widest">
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase text-gray-700 text-xs mb-2" for="exp-date">
                        exp. date (mm/YY)
                    </label>
                    <div className="inline-flex" name="exp-date">
                        <input className="appearance-none block w-1/2  text-gray-700 border border-gray-200 rounded py-2 px-4  focus:outline-none focus:bg-white focus:border-gray-500 mr-2" type="text" name='expM' placeholder="MM" maxLength={2} value={formData.expM} onChange={handleUserInput} />
                        <input className="appearance-none block w-1/2 text-gray-700 border border-gray-200 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" name='expY' placeholder="YY" maxLength={2} value={formData.expY} onChange={handleUserInput}/>
                    </div>
                    <small className="text-red-400 text-[11px]">{formData.formErrors['expdate']}</small>
                </div>
                <div className="w-1/2 pr-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs mb-2" for="cvc ">cvc</label>
                    <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" name="cvc" type="text" placeholder="e.g 123" maxLength={3} value={formData.cvc} onChange={handleUserInput}/>
                    <small className="text-red-400 text-[11px]">{formData.formErrors['cvc']}</small>
                </div>
            </div>
            <div>
                <button type="submit" className="w-full text-center text-lg bg-[#21092F] rounded-md p-3 text-gray-200 font-grotesk disabled:cursor-not-allowed disabled:bg-gray-600 " disabled={!formData.formValid} >Confirm</button>
            </div>
        </form>
    )
}

export default CardForm