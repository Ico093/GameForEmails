import React from 'react';

const CompanyFooter = () => {
    return (
        <div className="footer">
            <div className="row valign-wrapper clearPosition fullHeight">
                <div className="col s6">
                    <div className="col s5">&copy;2017 Company</div>
                    <div className="col s7">All rights reserved</div>
                </div>
                <div className="col s6">
                    <div className="col s4">
                        <a href="http://www.Company.bg">Company.bg</a>
                    </div>
                    <div className="col s4">
                        <a href="http://www.Company.bg/karieri/careers.html">Careers</a>
                    </div>
                    <div className="col s4">
                        <a href="http://www.Company.bg/za-kontakti/contact-us.html">Contact us</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CompanyFooter;