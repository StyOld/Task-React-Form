import React from 'react';
import countries from "../../data/countries";
import cities from "../../data/cities";

export default class Finish extends React.Component {
    render () {
        const {firstname, lastname, avatar, email, mobile, country, city}=this.props;
        return (
            <div className='container-fluid'>
                <div className='row mb-4'>
                    <div className='col-4'>
                        <img
                            width="100%"
                            src={avatar}
                            alt=""
                        />
                    </div>
                    <div className='col-8 d-flex align-items-center'>
                        <h4>{firstname} {lastname}</h4>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <p><strong>Email: </strong>{email}</p>
                        <p><strong>Mobile: </strong>{mobile}</p>
                        <p>
                            <strong>Location: </strong>
                            {countries.find(object => object.id === Number(country)).name},
                            {cities[city].name}
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}
