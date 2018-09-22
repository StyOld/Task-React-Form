import React from 'react';
import countries from "../../data/countries";

export default class Contacts extends React.Component {
    render() {
        const {email, mobile, country, city, errors, onChange, getOptionsItem, getCityList} = this.props;

        return (
            <div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email"
                        name='email'
                        value={email}
                        onChange={onChange}
                    />
                    {errors.email ? (
                        <div className='invalid-feedback'>{errors.email}</div>
                    ) : null}
                </div>
                <div className='form-group'>
                    <label>Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter mobile"
                        name='mobile'
                        value={mobile}
                        onChange={onChange}
                    />
                    {errors.mobile ? (
                        <div className='invalid-feedback'>{errors.mobile}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                        className="form-control"
                        id="country"
                        name='country'
                        value={country}
                        onChange={onChange}
                    >
                        {getOptionsItem(countries)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                        className="form-control"
                        id="city"
                        name='city'
                        value={city}
                        onChange={onChange}
                    >
                        {getOptionsItem(getCityList(country))}
                    </select>
                    {errors.city ? (
                        <div className='invalid-feedback'>{errors.city}</div>
                    ) : null}
                </div>
            </div>
        )
    }
}
