/**
 * Input date
 */

const DatePicker = ({type,action,dateInputRef}) => {
    
    return (
        <div>
            <input
                type={type}
                onChange={action}
                ref={dateInputRef}
            />
            </div>
        )
}

export default DatePicker;