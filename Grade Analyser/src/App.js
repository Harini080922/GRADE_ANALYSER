import user from './record.json';
import { useEffect, useState } from 'react';
import "./App.css";
import { BarChart } from 'reaviz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faInfoCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const gradeMapping = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C":5,
  "RA": 0,
  "SA": 0,
  "W": 0
};


function App() {
  const [keysToFilter, setKeysToFilter] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState([]);
  const [chartData, setChartData] = useState([]);

 
  function generateChartData(data) {
    return data.map((item, index) => ({
      key: `Data ${index + 1}`, 
      data: gradeMapping[item.grade],
    }));
  }

  useEffect(() => {
    const keys = Object.keys(user[0]).filter(key => key !== "grade");
    setKeysToFilter(keys);
    setResult(user);
  }, []);

  useEffect(() => {
    if (result.length > 0 && selectedOption) {
      setChartData(generateChartData(result, selectedOption));
    }
  }, [result, selectedOption]);

  function changeText(e) {
    setSelectedOption(e.target.value);
    const filterValues = [...new Set(user.map(item => item[e.target.value]))];
    setOptions(filterValues);
    setSelectedFilter(""); 
  }

  function changeRadio(e) {
    setSelectedFilter(e.target.value);
  }

  function filterData() {
    let filtered;
    if (selectedOption === "semester" || selectedOption === "credits" || selectedOption === "register_number") {
      filtered = user.filter((e) => {
        return e[selectedOption] === parseInt(selectedFilter.replace("semester", ""));
      });
    } else {
      filtered = user.filter((e) => {
        return e[selectedOption] === selectedFilter;
      });
    }
    setResult(filtered);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="menu-bar">
            <ul>
              <li><FontAwesomeIcon icon={faUser} /> User</li>
              <li><FontAwesomeIcon icon={faChartBar} /> Dashboard</li>
              <li><FontAwesomeIcon icon={faInfoCircle} /> About Us</li>
              <li><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <header className="header">
            <h1 className="title">Grade Analyser</h1>
          </header>
          <div style={{ margin: '55px', textAlign: 'center' }}>
            {chartData.length > 0 && (
              <BarChart id='bar' style={{ marginLeft: "500px" }} width={600} height={300} horizontal={true} data={chartData} />
            )}
          </div>
          <select onChange={(e) => changeText(e)} className="select-container">
            <option value="">Select</option>
            {keysToFilter.map((e) => (
              <option value={e} key={e} className="option-item">{e}</option>
            ))}
          </select>

          {selectedOption &&
            <>
              <div className="radio-container">
                {options.map((option, index) => (
                  <div key={index}>
                    <input type='radio' name={selectedOption} value={option} onChange={(e) => changeRadio(e)} />
                    <label>{selectedOption === "semester" ? `Semester ${option}` : option}</label>
                  </div>
                ))}
              </div>
              <button onClick={filterData} style={{ margin: '10px', padding: '8px 16px', backgroundColor: '#FF69B4', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Apply</button>
            </>
          }
          <table className="table">
            <thead>
              <tr>
                <th>Register_number</th>
                <th>Grade</th>
                <th>Semester</th>
                <th>Credits</th>
                <th>Course Code</th>
              </tr>
            </thead>
            <tbody>
              {result.map((e, index) => (
                <tr key={index}>
                  <td>{e.register_number}</td>
                  <td>{e.grade}</td>
                  <td>{e.semester}</td>
                  <td>{e.credits}</td>
                  <td>{e.course_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
