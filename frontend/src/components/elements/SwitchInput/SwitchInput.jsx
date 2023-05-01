import './SwitchInput.scss'

const SwitchInput = ({ checked, onChange }) => {
    return (
        <div className='switch'>
            <input type='checkbox' checked={checked} onChange={onChange}/>
            <span className='slider round' />
        </div>
    );
}

export default SwitchInput;