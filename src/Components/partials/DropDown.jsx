
const DropDown = ({title, otpions, func}) => {
    return (
        <div className="select">
                <select defaultValue="0" onChange={func} name="format" id="format">
                    <option value="0" disabled>
                        {title}
                    </option>
                    {otpions.map((option, i)=>{
                        return(
                            <option key={i} value={option}>
                                {option.toUpperCase()}
                            </option>
                        )
                    })}
                </select>
         </div>
    );
};

export default DropDown;