import './SwitchInput.scss'

const SwitchInput = ({ checked, onChange, name = 'switch'}) => {
    return (
        <div className='switch'>
            <input name={name} type='checkbox' checked={checked} onChange={onChange}/>
            <span className='slider round' />
        </div>
    );
}

export default SwitchInput;