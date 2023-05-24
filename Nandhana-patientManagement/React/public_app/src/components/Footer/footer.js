import React from 'react';
import './index.css';

function Footer() {
  return (
    <div>
      {' '}
      <footer>
        <div class="column">
          <a class="footer_title">COMPANY_NAME</a>
          <a>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </a>
          <a href="#" title="Facebook">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#" title="Instagram">
            <i class="fa fa-instagram"></i>
          </a>
          <a href="#" title="Twitter">
            <i class="fa fa-twitter"></i>
          </a>
        </div>
        <div class="column">
          <a class="footer_title">OTHER LINKS</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Ticket</a>
          <a href="#">Contact Us</a>
        </div>
        <div class="column">
          <a class="footer_title">SHORT CUT</a>
          <a href="">Our Services</a>
          <a href="">Our Blog</a>
          <a href="">Our Projects</a>
          <a href="">About Us</a>
        </div>
        <div class="column">
          <a class="footer_title">LATEST NEWS</a>
          <a href="" title="Lorem ipsum dolor sit amet">
            <img src="https://source.unsplash.com/50x50/?green,trees" />
          </a>
          <a href="" title="Lorem ipsum dolor sit amet">
            <img src="https://source.unsplash.com/50x50/?green,tree" />
          </a>
          <a href="" title="Lorem ipsum dolor sit amet">
            <img src="https://source.unsplash.com/50x50/?green,plant" />
          </a>
          <a href="" title="Lorem ipsum dolor sit amet">
            <img src="https://source.unsplash.com/50x50/?green,forest" />
          </a>
          <a href="" title="Lorem ipsum dolor sit amet">
            <img src="https://source.unsplash.com/50x50/?green,afforestation" />
          </a>
        </div>
        <div class="column">
          <a class="footer_title">GET IN TOUCH</a>
          <a title="Address">
            <i class="fa fa-map-marker"></i> 007, street, province/state,
            country - zipcode
          </a>
          <a href="emailto:" title="Email">
            <i class="fa fa-envelope"></i> email@serviceprovider.domain
          </a>
          <a href="tel:" title="Contact">
            <i class="fa fa-phone"></i> +(x)-xxxx-xxxxx
          </a>
        </div>

        <div class="sub-footer">
          © CopyRights 2021 Company_name || All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default Footer;
