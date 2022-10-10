import { bg_card_back } from "./images"
import { useState,useEffect } from "react";
import CardForm from "./components/CardForm";
import CompleteForm from "./components/CompleteForm";


const normalizeCardNumber = (value) => {
  if(!(new RegExp(/[0-9]|\d+/g).test(value[value.length-1]))){
    return value.replace(value[value.length-1], '');
  }
  return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
}

const App = () => {

  const initialstate = {
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

  const [toggleForm, setToggleForm] = useState(false)
  const [formData, setFormData] = useState(initialstate)

  useEffect(()=> {
   updateFormData({
    formValid: formData.cardnamevalid && formData.cardnumbervalid && formData.expMvalid && formData.expYvalid && formData.cvcvalid,
   })

  }, [formData.cardnamevalid, formData.cardnumbervalid, formData.expMvalid, formData.expYvalid, formData.cvcvalid])

  const updateFormData = (updatedData) => setFormData({
    ...formData,
    ...updatedData
  })

  // useEffect(()=> {
  //   setFormData(initialstate)},[toggleForm===false])  ;
  
 

  return (
    // left part cards
    <div className="desktop:flex ">
      <div className="relative mob:h-60 mob:bg-[url('./images/bg_main_mobile.png')] desktop:w-1/3 desktop:bg-[url('./images/bg_main_desktop.png')] desktop:h-screen bg-cover bg-center">
        <div className="absolute card__back z-0 desktop:right-[-35%] desktop:top-[460px] mob:right-4 top-8 ">
          <img src={bg_card_back} alt="bgcardb" className="h-40 desktop:h-60 z-0 object-cover" />
          <span className="absolute text-gray-200 font-grotesk font-semibold text-xs tracking-wider top-[71px] right-10 desktop:top-[108px] desktop:right-14 desktop:text-sm">{formData.cvc!==""?formData.cvc:"000"}</span>
        </div>
        <div className="card__front absolute z-0 mob:h-40 desktop:h-60 text-gray-200 font-grotesk font-normal top-[123px] mob:bg-[url('./images/bg_card_front.png')] bg-contain bg-no-repeat mob:max-w-[292px] desktop:min-w-[438px] ml-4 flex flex-row flex-wrap desktop:-right-32 desktop:top-44" >
          {/* <img src={bg_card_front} alt="bgcardf" className="h-60 desktop:inline-block mob:hidden z-0 ml-4  " />  */}
          <div className="flex-col ">
            <div className="absolute rounded-full bg-white p-4 desktop:p-6 ml-4 mt-4 desktop:ml-6 desktop:mt-6"/>
            <div className="rounded-full border-gray-200 border p-[6px] desktop:p-[10px]  ml-14 desktop:ml-20 mt-6 desktop:mt-[36px]" />
          </div>
          
          <div className="flex flex-col w-full p-4 mt-6 desktop:mt-8 desktop:ml-4">
            <small className="flex w-full text-[18px] desktop:text-[26px] tracking-xwidest" id="spanCardNumber">{formData.cardnumber!==""?normalizeCardNumber(formData.cardnumber):"0000 0000 0000 0000"}</small>
            <div className="flex flex-row justify-between text-[10px] desktop:text-[14px] mt-4 tracking-xwidest desktop:mt-6">
                <span className="uppercase">{formData.cardname!==""?formData.cardname:"Jane Appleseed"}</span>
                <div className="inline-flex ">
                  <span className="" id="expMoth">{formData.expM!==""?formData.expM:"00"}</span>
                  <span className="">/</span>
                  <span className="" id="expYear">{formData.expY!==""?formData.expY:"00"}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* right part form */}
      <div className="px-6 mob:mt-20 py-2 font-grotesk desktop:ml-80 desktop:mt-60">
        <CardForm formData={formData} updateFormData={updateFormData} toggleForm={toggleForm} setToggleForm={setToggleForm} />
        <CompleteForm toggleForm={toggleForm} setToggleForm={setToggleForm} initialstate={initialstate} setFormData={setFormData} />
      </div>
    </div>
  )
}

export default App