import React, { useState } from 'react';
import '../style.css';
import * as styles from './Toast.module.css';
import { positionOptions, iconOptions } from '../constants';

export default function Toast() {
  const [position, setPosition] = useState(positionOptions[2].value);
  const [icon, setIcon] = useState(iconOptions[2].value);
  const [input, setInput] = useState('Start put your title');
  const [toasts, setToasts] = useState([]);

  const addAndShowToasts = () => {
    let config = {
      title: input,
      position: position,
      icon: icon,
    };

    setToasts((currentToasts) => [
      ...currentToasts,
      { id: Math.random().toString(36).substring(2, 9), ...config },
    ]);

    console.log(toasts);
  };

  // const SingleToast = () => {
  //   return (
  //     <div>
  //       <div>
  //         <span>icon</span>
  //         <span>title</span>
  //       </div>
  //       <div>
  //         <button className={styles.close}>x</button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={styles.container}>
      <p className={styles.header}>Click on to show toast!</p>
      <div className={styles.mainContent}>
        <p>Configuration</p>
        <div className={styles.configContainer}>
          <label className={styles.label}>Toast Title</label>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>

          <label>Position</label>
          <select
            className={styles.select}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            {positionOptions.map((option) => (
              <option>{option.name}</option>
            ))}
          </select>

          <label className={styles.label}>Icon</label>
          <select
            className={styles.select}
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          >
            {iconOptions.map((icon) => (
              <option>{icon.value}</option>
            ))}
          </select>
        </div>
        <button className={styles.btn} onClick={addAndShowToasts}>
          Show Toast
        </button>
      </div>
      {toasts.map((toast, idx) => (
        <SingleToast
          title={toast.title}
          icon={toast.icon}
          position={toast.position}
          idx={idx}
          id={toast.id}
        />
      ))}
    </div>
  );
}

const SingleToast = ({ title, position, icon, idx, id }) => {
  return (
    <React.Fragment>
      <div>
        <div>
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div>
          <button className={styles.close}>x</button>
        </div>
      </div>
    </React.Fragment>
  );
};
