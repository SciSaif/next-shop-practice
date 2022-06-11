import React from "react";

function Input({type, required, value, onChange}) {
	return <input type={type} required={required} className="border border-gray-400 rounded px-3 py-1 w-80 shadow-sm " value={value} onChange={onChange} />;
}

export default Input;
