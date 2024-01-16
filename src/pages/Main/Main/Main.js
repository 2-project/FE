import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import styles from './Main.module.css'; //

const Main = () => {
  return (
    <div>
      <Header /> {/* Header */}
      <main>{/*메인 */ <div className={styles.nsns}></div>}</main>
      <Footer />
    </div>
  );
};

export default Main;
