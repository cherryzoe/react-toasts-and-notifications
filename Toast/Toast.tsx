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

  const onClose = (id) => {
    const updatedToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(updatedToasts);
  };

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
          index={idx}
          id={toast.id}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

const SingleToast = ({ title, position, icon, index, id, onClose }) => {
  const cn = (...classes: any[]) => classes.join(' ');
  const getPositionStyle = () => {
    let pos = positionOptions.find((el) => el.value === position);

    return {
      ...pos?.style,
      marginTop: pos.view === 'top' ? index * 60 + 'px' : '',
      marginBottom: pos.view === 'bottom' ? index * 60 + 'px' : '',
    };
  };

  return (
    <React.Fragment>
      <div className={styles.toastContainer} style={getPositionStyle()}>
        <div className={styles.iconContentContainer}>
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div>
          <button className={styles.close} onClick={() => onClose(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.closeIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
