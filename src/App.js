import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import styles from "./App.module.css";

function App() {
  // add field
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldOptions, setFieldOptions] = useState("");

  // results
  const [formElements, setFormElements] = useState([]);

  // validation
  const requireOptions = () => fieldType === "radio" || fieldType === "select";

  function addField() {
    if (fieldName && fieldType) {
      const newFormElement = {
        id: fieldName,
        type: fieldType,
      };
      if (requireOptions()) {
        if (!fieldOptions) return;
        newFormElement["options"] = fieldOptions;
      }
      setFormElements((prevFormElements) => [
        ...prevFormElements,
        newFormElement,
      ]);
      setFieldName("");
      setFieldOptions("");
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.addField}>
        <h2>Add field</h2>
        <label>
          Field name
          <br />
          <input
            onChange={(e) => setFieldName(e.target.value)}
            value={fieldName}
          />
        </label>
        <label>
          Field type
          <br />
          <select
            onChange={(e) => setFieldType(e.target.value)}
            value={fieldType}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="text">Text</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="number">Number</option>
            <option value="textarea">Textarea</option>
            <option value="email">Email</option>
            <option value="tel">Tel</option>
            <option value="url">URL</option>
            <option value="time">Time</option>
            <option value="datetime">Datetime</option>
          </select>
        </label>
        {requireOptions() && (
          <label>
            Options
            <br />
            <input
              onChange={(e) => setFieldOptions(e.target.value)}
              value={fieldOptions}
              placeholder="Enter options separate by ;"
            />
          </label>
        )}
        <button onClick={addField}>Add field</button>
      </div>
      <div className={styles.results}>
        <h2>Results</h2>
        <ReactSortable
          handle={`.${styles.handle}`}
          animation={150}
          list={formElements}
          setList={setFormElements}
        >
          {formElements.map(({ id, type, options, chosen }) => (
            <FormElement
              id={id}
              type={type}
              options={options}
              chosen={chosen}
            />
          ))}
        </ReactSortable>
        <pre>{JSON.stringify(formElements, null, 2)}</pre>
      </div>
    </div>
  );
}

function FormElement({ id, type, options, chosen }) {
  return (
    <div className={styles.formElement}>
      <div className={styles.handle} style={{ cursor: chosen && "grabbing" }}>
        ::
      </div>
      <div className={styles.info}>
        <h2 className={styles.id}>{id}</h2>
        <p className={styles.type}>
          <b>
            {type}
            {options && ":"}
          </b>{" "}
          {options && options.split(";").join(", ")}
        </p>
      </div>
      <div className={styles.actions}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default App;
