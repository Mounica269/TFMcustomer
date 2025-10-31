import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from "public/frontend/css/Maintenance.module.css"

const Maintenance = () => {
  return (
    <div className={styles.container}>

      <h1>Site Under Maintenance.</h1>
      <h1>We’ll be back soon!</h1>
      <p>Sorry for the inconvenience but we’re performing some maintenance at the moment.</p>
      <p>We’ll be back online shortly! Thank you for your patience!</p>
        <div className={styles.logoContainer}>
        <Image src="/frontend/images/logo.png" alt="logo" className={styles.logo} width={200} height={50} /> 
        </div>
        </div>
  );
};

export default Maintenance;
