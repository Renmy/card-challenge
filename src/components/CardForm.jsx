import React, { useState,Component } from "react";

class CardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardname:'',
            cardnumber:'',
            expM:'',
            expY:'',
            cvc:'',
            formErrors: {cardname:'',cardnumber:'',expdate:'',cvc:''},
            cardnamevalid:false,
            cardnumbervalid:false,
            expMvalid:false,
            expYvalid:false,
            expdatevalid:false,
            cvcvalid:false,
            formValid:false
        }
    }

    normalizeCardNumber = (card) => {
        // if(!(new RegExp(/[0-9]|\d+/g).test(card[card.length-1]))){
        //   return card.replace(card[card.length-1], '');
        // }
        return card.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
      }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = name==='cardnumber'?e.target.value.replace(/\s/g, ""):e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
    //(/^([a-z0-9]{5,})$/.test('abc1'))
    validateField = (fieldname, value) => {
        let cardnamevalid = this.state.cardnamevalid;
        let cardnumbervalid = this.state.cardnumbervalid;
        let cvcvalid = this.state.cvcvalid;
        let formErrorField = this.state.formErrors;
        let expMvalid = this.state.expMvalid;
        let expYvalid = this.state.expYvalid;

        switch (fieldname) {
            case("cardname"): {
                cardnamevalid = (/^([a-zA-Z\s]{5,})$/).test(value)
                formErrorField.cardname = cardnamevalid?'':'Only letters and more than 5 chars.';
                break;
            } 

            case('cardnumber'): {
                cardnumbervalid = ((/^([0-9]{16})$/).test(value));
                formErrorField.cardnumber = cardnumbervalid?'':'Wrong format, only numbers and must be 16.';
                break;
            }

            case('expM'): {
                if (value.length===0){
                    formErrorField.expdate = 'Can`t be blank';
                    break; 
                }
                expMvalid = value<13
                formErrorField.expdate = (expMvalid && expYvalid)?'':'Wrong date format';
                break;
            }

            case('expY'): {
                if (value.length===0){
                    formErrorField.expdate = 'Can`t be blank';
                    break; 
                }
                expYvalid = value>22
                formErrorField.expdate = (expMvalid && expYvalid)?'':'Wrong date format';
                break;
            }

            case('cvc'): {
                cvcvalid = ((/^([0-9]{3})$/).test(value));
                formErrorField.cvc = cvcvalid?'':'Wrong format, 3 digits number. '
                break;
            }

            // default: {
            //     if(value.length===0){
            //         formErrorField.expdate = 'Can`t be blank';
            //         expdatevalid = false;
            //     }
            //     if(fieldname=='expM' && value>12) {
            //         formErrorField.expdate = 'Wrong date format.';
            //         expMvalid = false;
            //     }
            //     else if(fieldname==='expY' && value<22){
            //         formErrorField.expdate = 'Wrong date format.';
            //         expYvalid = false;
            //     } 
            //     if(expYvalid && expMvalid) {
            //         formErrorField.expdate = '';
            //         expdatevalid = true;
            //     }
            //     console.log(expMvalid)
                // formErrorField = value.length!==0?'':'Can`t be blank';
                // break;
                // formErrorField = 0<value<12?'':'Wrong date format.'
                
            }
        
        this.setState({ formErrors: formErrorField,  
                        cardnamevalid: cardnamevalid, 
                        cardnumbervalid: cardnumbervalid,
                        expMvalid: expMvalid,
                        expYvalid: expYvalid,
                        cvcvalid: cvcvalid
                        }, this.validateForm)

    }

    validateForm() {
        this.setState({formValid: this.state.cardnamevalid && this.state.cardnumbervalid && this.state.expMvalid && this.state.expYvalid && this.state.cvcvalid });
      }

    render () {
        return (
            <form class="w-full max-w-[420px]">
                <div class="flex flex-wrap -mx-3 mb-6 tracking-widest">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                        <label className="block uppercase text-gray-700 text-xs  mb-2" for="cardname">
                        cardholder name
                        </label>
                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:activeib focus:bg-white" name="cardname" type="text" placeholder="e.g. Jane Appleseed" value={this.state.cardname} onChange={this.handleUserInput} maxLength={20}/>
                        <small className="text-red-400 text-[11px]">{this.state.formErrors['cardname']}</small>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase text-gray-700 text-xs mb-2" for="cardnumber" >
                        card number
                        </label>
                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:bg-white" name="cardnumber"
                        type="tel" placeholder="e.g. 1234 5678 9123 0000" maxLength={19} inputMode="numeric" autoComplete="cc-number" value={this.normalizeCardNumber(this.state.cardnumber)}
                        onChange={this.handleUserInput} />
                        <small className="text-red-400 text-[11px]">{this.state.formErrors['cardnumber']}</small>
                    </div>
                </div>
                
                <div className="flex flex-row flex-wrap -mx-3 mb-2 tracking-widest">
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase text-gray-700 text-xs mb-2" for="exp-date">
                            exp. date (mm/YY)
                        </label>
                        <div className="inline-flex" name="exp-date">
                            <input className="appearance-none block w-1/2  text-gray-700 border border-gray-200 rounded py-2 px-4  focus:outline-none focus:bg-white focus:border-gray-500 mr-2" type="text" name='expM' placeholder="MM" maxLength={2} value={this.state.expM} onChange={this.handleUserInput} />
                            <input className="appearance-none block w-1/2 text-gray-700 border border-gray-200 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" name='expY' placeholder="YY" maxLength={2} value={this.state.expY} onChange={this.handleUserInput}/>
                        </div>
                        <small className="text-red-400 text-[11px]">{this.state.formErrors['expdate']}</small>
                    </div>
                    <div className="w-1/2 pr-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs mb-2" for="cvc ">cvc</label>
                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" name="cvc" type="text" placeholder="e.g 123" maxLength={3} value={this.state.cvc} onChange={this.handleUserInput}/>
                        <small className="text-red-400 text-[11px]">{this.state.formErrors['cvc']}</small>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full text-center text-lg bg-[#21092F] rounded-md p-3 text-gray-200 font-grotesk disabled:cursor-not-allowed " disabled={!this.state.formValid}  >Confirm</button>
                </div>
            </form>
        )
    }
}

export default CardForm