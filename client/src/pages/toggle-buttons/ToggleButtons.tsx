import React, {useId} from 'react'
import HiddenNavbar from '../../components/HiddenNavbar'
import './ToggleButtons.css'

function ToggleButtons() {
    return (
        <div className="toggleButtons">
            <h1>Toggle Buttons</h1>
            <div className='toggle-btns-grid-wrapper'>
                <ButtonSet type="simple" name="Simple"/>
                <ButtonSet type="mobile" name="Mobile"/>
                <ButtonSet type="line" name="Line" higher={true}/>
                <ButtonSet type="cartoon" name="Cartoon" higher={true}/>
            </div>
        </div>
    )
}

interface buttonSetProps {
    higher?: Boolean,
    type: String,
    name: String
}
function ButtonSet({higher = false, type, name}: buttonSetProps) {
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()
    const id4 = useId()
    const id5 = useId()
    const id6 = useId()

    return (
        <section className={`${higher ? 'higher' : ''}`}>
            <h1>{name}</h1>
            <div>
                <input type="checkbox" id={id1} className={`toggle-btn ${type}`} disabled />
                <label htmlFor={id1}></label>

                <input type="checkbox" id={id2} className={`toggle-btn ${type}`} />
                <label htmlFor={id2}></label>

                <input type="checkbox" id={id3} className={`toggle-btn ${type}`} defaultChecked={true} />
                <label htmlFor={id3}></label>
            </div>

            <div>
                <input type="checkbox" id={id4} className={`toggle-btn ${type}`} disabled />
                <label htmlFor={id4}></label>

                <input type="checkbox" id={id5} className={`toggle-btn ${type}`} />
                <label htmlFor={id5}></label>

                <input type="checkbox" id={id6} className={`toggle-btn ${type}`} defaultChecked={true} />
                <label htmlFor={id6}></label>
            </div>
        </section>
    )
}

export default ToggleButtons
