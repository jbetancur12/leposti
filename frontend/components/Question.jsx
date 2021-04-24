import React, { useState, useEffect } from 'react';
import styles from '../styles/Questions.module.css';

import Title from './Title';

import { Collapse } from 'antd';

const { Panel } = Collapse;

const Question = () => {
  const [pqrs, setPqrs] = useState([]);

  const getPqrs = async () => {
    const response = await fetch(`https://api.leposti.ml/pqrs`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const pqrResult = await response.json();
    setPqrs(pqrResult);
  };

  useEffect(() => {
    getPqrs();
  }, []);

  const PQR = () => {
    return (
      <Collapse defaultActiveKey={['1']}>
        {pqrs.map((_pqr) => (
          <Panel header={_pqr.question} key={_pqr.id}>
            <p>{_pqr.answer}</p>
          </Panel>
        ))}
      </Collapse>
    );
  };

  return (
    <div className={styles.container} id='questions'>
      <Title title='Preguntas' titleW='frecuentes' />
      <div className={styles.content}>
        <PQR />
      </div>
    </div>
  );
};

export default Question;
