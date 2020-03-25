//  React
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//  Asset
import { ReactComponent as Logo_ND } from './assets/vex/Logo_ND-footer.svg';
import { ReactComponent as Social_fb } from './assets/vex/Social_fb.svg';
import { ReactComponent as Social_ig } from './assets/vex/Social_ig.svg';
import { ReactComponent as Social_yt } from './assets/vex/Social_yt.svg';
import { ReactComponent as Social_li } from './assets/vex/Social_li.svg';

const Footer = () => {
  return (
    <Fragment>
      <footer className='cont row bg-pnk2' id='footer'>
        <div className='col' id='footer-sect1'>
          <Logo_ND />
        </div>
        <div className='col foot-sect' id='footer-sect2'>
          <div className=''>Find Us On Social Media</div>
          <div className='row even' id='social-btns'>
            <Link to='/hello'>
              <Social_fb />
            </Link>
            <Link to='/hello'>
              <Social_ig />
            </Link>
            <Link to='/hello'>
              <Social_yt />
            </Link>
            <Link to='/hello'>
              <Social_yt />
            </Link>
          </div>
          <div className=''>Join Our Mailing List</div>
          <div className='form'>Email Form</div>
          <div className='btn'>Call to action</div>
        </div>{' '}
        <div className='col foot-sect' id='footer-sect4'>
          NEEDLE DROP CO. <br />
          416 NE 24TH AVE <br />
          PORTLAND, OR 97232 <br />
          HELLO@NEEDLEDROP.CO
        </div>
        <div className='col foot-sect' id='footer-sect3'>
          <ul className='stack'>
            <li>
              <Link to='/hello'>ABOUT US</Link>
            </li>
            <li>
              <Link to='/library'>BROWSE MUSIC</Link>
            </li>
            <li>
              <Link to='/playlists'>PLAYLISTS</Link>
            </li>
            <li>
              <Link to='/purchase'>CART</Link>
            </li>
            <li>CONTACT</li>
            <li>
              <Link to='/profile'>PROFILE</Link>
            </li>
            <li>FAQ</li>
            <li>
              <Link to='shh'>PRIVACY POLICY</Link>
            </li>
          </ul>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
