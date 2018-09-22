import React from 'react';

export default class Basic extends React.Component {
    render() {
        const {firstname, lastname, password, repeatPassword, gender, errors, onChange} = this.props;

        return (
            <div>
                <div className='form-group'>
                    <label>Firstname</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter firstname"
                        name='firstname'
                        value={firstname}
                        onChange={onChange}
                    />
                    {errors.firstname ? (
                        <div className='invalid-feedback'>{errors.firstname}</div>
                    ) : null}
                </div>
                <div className='form-group'>
                    <label>Lastname</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter lastname"
                        name='lastname'
                        value={lastname}
                        onChange={onChange}
                    />
                    {errors.lastname ? (
                        <div className='invalid-feedback'>{errors.lastname}</div>
                    ) : null}
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                    {errors.password ? (
                        <div className='invalid-feedback'>{errors.password}</div>
                    ) : null}
                </div>
                <div className='form-group'>
                    <label>Repeat password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter repeat password"
                        name='repeatPassword'
                        value={repeatPassword}
                        onChange={onChange}
                    />
                    {errors.repeatPassword ? (
                        <div className='invalid-feedback'>{errors.repeatPassword}</div>
                    ) : null}
                </div>
                <fieldset className='form-group'>
                    <div>Gender</div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='radio'
                            id='male'
                            name='gender'
                            value='male'
                            checked={gender === 'male'}
                            onChange={onChange}
                        />
                        <label className='form-check-label' htmlFor='male'>
                            Male
                        </label>
                    </div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='radio'
                            id='female'
                            name='gender'
                            value='female'
                            checked={gender === 'female'}
                            onChange={onChange}
                        />
                        <label className='form-check-label' htmlFor='female'>
                            Female
                        </label>
                    </div>
                </fieldset>
            </div>
        );
    }
}