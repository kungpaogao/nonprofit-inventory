import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [fieldName, setFieldName] = useState(null);
  const [fieldType, setFieldType] = useState(null);

  const [formObject, setFormObject] = useState({});

  function addField() {
    if (fieldName && fieldType) {
      const newFormObject = { ...formObject };
      newFormObject[fieldName] = fieldType;
      setFormObject(newFormObject);
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.addField}>
        <h2>Add element</h2>
        <div className={styles.formField}>
          <label>
            Field name
            <br />
            <input onChange={(e) => setFieldName(e.target.value)} />
          </label>
        </div>
        <div className={styles.formField}>
          <label>
            Field type
            <br />
            <select onChange={(e) => setFieldType(e.target.value)}>
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="date">date</option>
              <option value="select">select</option>
            </select>
          </label>
        </div>
        <div className={styles.formField}>
          <label></label>
        </div>
        <div>
          {fieldName}: {fieldType}
        </div>
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
