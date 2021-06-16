import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldOptions, setFieldOptions] = useState("");

  const [formObject, setFormObject] = useState({});

  function addField() {
    if (fieldName && fieldType) {
      const newFormObject = { ...formObject };
      if (requireOptions()) {
        if (!fieldOptions) return;
        newFormObject[fieldName] = `${fieldType}:${fieldOptions}`;
      } else {
        newFormObject[fieldName] = fieldType;
      }
      setFormObject(newFormObject);
      setFieldName("");
      setFieldOptions("");
    }
  }

  const requireOptions = () => fieldType === "radio" || fieldType === "select";

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
        <pre>{JSON.stringify(formObject, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
