import React, {Component} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.banner}>
          <h1 className={styles.bannerTitle}>Welcome to Macy's CMS</h1>
          <h3 className={styles.bannerDesc}>Store your projects....</h3>
          <div className={styles.tryButton}>
            <Link to="/users">
              <RaisedButton secondary label="Users" className={styles.RaisedButton}/>
            </Link>
            <Link to="/projects">
              <RaisedButton secondary label="Projects" className={styles.RaisedButton}/>
            </Link>
            <Link to="/graphql">
              <RaisedButton secondary label="Graphql Browse" className={styles.RaisedButton}/>
            </Link>
            <Link to="/datatypes">
              <RaisedButton secondary label="Datatypes" className={styles.RaisedButton}/>
            </Link>
            <Link to="/fields">
              <RaisedButton secondary label="Fields" className={styles.RaisedButton}/>
            </Link>
            <Link to="/categories">
              <RaisedButton secondary label="Categories" className={styles.RaisedButton}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
