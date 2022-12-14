import { icon_complete } from '../images';

const CompleteForm = ({toggleForm, setToggleForm, initialstate, setFormData}) => {

  const onClick = () => {
    setToggleForm(false);
    setFormData(initialstate);
  }

  return (
    <div className={`flex flex-col flex-center items-center w-full max-w-[420px] tracking-xwidest ${toggleForm?'block':'hidden'}`}>
        <img src={icon_complete} alt='Complete' className='w-40 items-center mb-8' />
        <h1 className='text-black font-semibold  text-4xl desktop:text-5xl m-8'>THANK YOU!</h1>
        <p className='text-gray-400 font-normal text-[16px] desktop:text-[20px] mb-10'>We've added your card details</p>
        <button type="submit" className="w-full text-center text-lg bg-[#21092F] rounded-md p-3 text-gray-200 font-grotesk" onClick={onClick} >Continue</button>
    </div>
  )
}

export default CompleteForm