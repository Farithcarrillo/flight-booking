import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="copyright-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="co-text">
                <p>
                  &copy;
                  <script>
                    {`document.write(new Date().getFullYear());`}
                  </script>{" "}
                  Wilson Farith Carrillo León

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
