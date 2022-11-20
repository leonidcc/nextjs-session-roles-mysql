import {useState} from "react"

export function Input({name,readonly, value, type, label,required, placeholder }){
  let [input, setInput] = useState(value);
  function change(e) {
    setInput(e.target.value)
  }
  return (

        <div className="form-floating pb-2">
           <input onChange={change}
            className="shadow-sm form-control"
            type={type}
            readonly={readonly}
            name={name} value={input}  required={required}  placeholder={placeholder}
            />
           <label>{label}</label>
         </div>
  )
}
Input.defaultProps = {
  label: "Nexts.js app title",
  required: false,
  value: "",
  name: "name",
  type: "text",
  placeholder: "Nexts.js placeholder",
  readonly:false
}

export function Select({name,readonly, value,  label,required, placeholder, option }){

  return (
        <div class="form-floating  pb-2">
          <select   name={name}  required={required}  class="form-select shadow-sm" readonly={readonly} placeholder={placeholder}>
            {
              option.map((item, i) => {
                return (
                  <option selected={item.k==value} key={i} value={item.k}>
                    {item.v}
                  </option>
                )
              })
            }
         </select>
          <label for="floatingSelect">{label}</label>
        </div>
  )
}
Select.defaultProps = {
  label: "Nexts.js app title",
  required: false,
  value: "",
  name: "name",
  placeholder: "Nexts.js placeholder",
  readonly:false,
  option:[{k:"1",v:"Light"},{k:"2",v:"Dark"}],
}
