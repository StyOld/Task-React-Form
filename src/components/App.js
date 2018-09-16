import React from "react";
import countries from '../data/countries';
import cities from '../data/cities';
import avatarDefault from "../images/default-avatar.png";

export default class App extends React.Component {
    constructor() {
        super()

        this.state  = {
            activeStep: 1,
            firstname: '',
            lastname: '',
            password: '',
            repeatPassword: '',
            gender: 'male',
            email: '',
            mobile: '',
            country: 1,
            city:'',
            avatar:'',

            steps: [
                {name: 'Basic', done: true},
                {name: 'Contacts', done: false},
                {name: 'Avatar', done: false},
                {name: 'Finish', done: false}
            ],

            errors: {
                firstname: false,
                lastname: false,
                password: false,
                repeatPassword: false,
                gender: 'male',
                email: false,
                mobile: false,
                city: false,
                avatar: false
            }
        }
    }

    goNextStep = () => {
        // let newArr = [];
        // let ids=5;
        //
        // if (Number(id) === cities[key].country) {for (let key in cities) {
        //     newArr.push({
        //         id: key,
        //         name: cities[key].name
        //     });
        // }}
        //
        //   let filterArr=newArr.filter(needCountry => needCountry.country===ids);
        //   console.log(newArr);

        const errors = {};

        switch(this.state.activeStep) {
            case 1:
                if (this.state.firstname.length < 5) {
                    errors.firstname = 'Must be 5 characters or more'
                };
                if (this.state.lastname.length < 5) {
                    errors.lastname = 'Must be 5 characters or more'
                };
                if (this.state.password.length < 6) {
                    errors.password = 'Must be 6 characters or more'
                };
                if (this.state.password !== this.state.repeatPassword) {
                    errors.repeatPassword = 'Must be equal password'
                };
                break;

            case 2:
                if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.state.email) === false) {
                    errors.email = 'Invalid email address'
                };
                if (/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(this.state.mobile) === false) {
                    errors.mobile = 'Invalid mobile'
                };
                if (this.state.city === '') {
                    errors.city = "Required";
                };
                break;

            case 3:
                if (this.state.avatar === '') {
                    errors.avatar = "Required";
                }
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors: errors
            })
        } else {
            if (this.state.activeStep < 4) {
                let arrSteps = [...this.state.steps];
                arrSteps[this.state.activeStep-1].done = true;

                this.setState({
                    activeStep: this.state.activeStep + 1,
                    steps: arrSteps,
                    errors: {}
                })
            };
        }
    };

    goPrevStep= () => {
        if (this.state.activeStep > 1) {
            let arrSteps = [...this.state.steps];
            arrSteps[this.state.activeStep-2].done = false;

            this.setState({
                activeStep: this.state.activeStep - 1,
                steps: arrSteps,
            })
        }
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // onChangeEmail = (event) => {
    //     this.setState({
    //         email: event.target.value
    //     })
    // };

    getOptionsItem = items => {
        return items.map(item => (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        ));
    };

    getCityList = country => {
        const cityList = [{id: 0, name: 'Select city'}];

        for (let key in cities) {
            if (cities[key].country === Number(country)) {
                cityList.push({
                    id: key,
                    name: cities[key].name
                });
            }
        }
        return cityList;
    };

    onChangeAvatar = event => {
        const reader = new FileReader();
        reader.onload = event => {
            this.setState({
                avatar: event.target.result
                // name: "avatar",
                // value: event.target.result
            })
        };
        reader.readAsDataURL(event.target.files[0])
    };

    render() {
        return (
            <div className="form-container card">
                <div className='container d-flex justify-content-center'>
                    <div className='row mt-4'>
                        {/*<div className={*/}
                            {/*this.state.steps[0].done === true ? ('circle-noactive') : 'circle-active'}*/}
                        {/*>*/}
                            {/*1*/}
                        {/*</div>*/}
                        {/*<div className={*/}
                            {/*this.state.steps[1].done === true ? ('circle-noactive') : 'circle-active'}*/}
                        {/*>*/}
                            {/*2*/}
                        {/*</div>*/}
                        {/*<div className={*/}
                            {/*this.state.steps[2].done === true ? ('circle-noactive') : 'circle-active'}*/}
                        {/*>*/}
                            {/*3*/}
                        {/*</div>*/}
                        {/*<div className={*/}
                            {/*this.state.steps[3].done ? ('circle-noactive') : 'circle-active'}*/}
                        {/*>*/}
                            {/*4*/}
                        {/*</div>*/}
                        {this.state.steps.map((step, index) => (
                            <div key={step.name} className={
                                step.done === true ? ('circle-noactive') : 'circle-active'}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <form className="form card-body">
                    {this.state.activeStep === 1 ? (
                        <div>
                            <div className='form-group'>
                                <label>Firstname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter firstname"
                                    name='firstname'
                                    value={this.state.firstname}
                                    onChange={this.onChange}
                                />
                                {this.state.errors.firstname ? (
                                    <div className='invalid-feedback'>{this.state.errors.firstname}</div>
                                ) : null}
                            </div>
                            <div className='form-group'>
                                <label>Lastname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter lastname"
                                    name='lastname'
                                    value={this.state.lastname}
                                    onChange={this.onChange}
                                />
                                {this.state.errors.lastname ? (
                                    <div className='invalid-feedback'>{this.state.errors.lastname}</div>
                                ) : null}
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                {this.state.errors.password ? (
                                    <div className='invalid-feedback'>{this.state.errors.password}</div>
                                ) : null}
                            </div>
                            <div className='form-group'>
                                <label>Repeat password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter repeat password"
                                    name='repeatPassword'
                                    value={this.state.repeatPassword}
                                    onChange={this.onChange}
                                />
                                {this.state.errors.repeatPassword ? (
                                    <div className='invalid-feedback'>{this.state.errors.repeatPassword}</div>
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
                                        checked={this.state.gender === 'male'}
                                        onChange={this.onChange}
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
                                        checked={this.state.gender === 'female'}
                                        onChange={this.onChange}
                                    />
                                    <label className='form-check-label' htmlFor='female'>
                                        Female
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    ) : null}

                    {this.state.activeStep === 2 ? (
                        <div>
                            <div className='form-group'>
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                {this.state.errors.email ? (
                                    <div className='invalid-feedback'>{this.state.errors.email}</div>
                                ) : null}
                            </div>
                            <div className='form-group'>
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter mobile"
                                    name='mobile'
                                    value={this.state.mobile}
                                    onChange={this.onChange}
                                />
                                {this.state.errors.mobile ? (
                                    <div className='invalid-feedback'>{this.state.errors.mobile}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <select
                                    className="form-control"
                                    id="country"
                                    name='country'
                                    value={this.state.country}
                                    onChange={this.onChange}
                                >
                                    {this.getOptionsItem(countries)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <select
                                    className="form-control"
                                    id="city"
                                    name='city'
                                    value={this.state.city}
                                    onChange={this.onChange}
                                >
                                    {this.getOptionsItem(this.getCityList(this.state.country))}
                                </select>
                                {this.state.errors.city ? (
                                    <div className='invalid-feedback'>{this.state.errors.city}</div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                    {this.state.activeStep === 3 ? (
                        <div>
                            <img
                                className='mb-2'
                                width="100%"
                                // src={this.state.avatar ? this.state.avatar : avatarDefault}
                                src={this.state.avatar === '' ? (avatarDefault) : this.state.avatar}
                            />
                            <div className="input-group mb-2">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="avatar"
                                        name='avatar'
                                        // value={this.state.avatar}
                                        onChange={this.onChangeAvatar}
                                    />
                                    <label className="custom-file-label" htmlFor="avatar">Choose avatar</label>
                                </div>
                                {this.state.errors.avatar ? (
                                    <div className='invalid-feedback'>{this.state.errors.avatar}</div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                    {this.state.activeStep === 4 ? (
                        <div>
                            <div className='container'>
                                <div className='row mb-2'>
                                    <div className='col-4'>
                                        <img
                                            width="100%"
                                            src={this.state.avatar}
                                        />
                                    </div>
                                    <div className='col-8 d-flex align-items-center'>
                                        <h4>{this.state.firstname} {this.state.lastname}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-2'><strong>Email: </strong>{this.state.email}</div>
                            <div className='mb-2'><strong>Mobile: </strong>{this.state.mobile}</div>
                            <div className='mb-2'>
                                <strong>Location: </strong>
                                {countries.find(object => object.id === Number(this.state.country)).name},
                                {cities[this.state.city].name}
                            </div>
                        </div>
                    ) : null}
                    {this.state.activeStep < 4 ? (
                            <div className="d-flex justify-content-center">
                                <button
                                    type='button'
                                    className='btn btn-light mr-2'
                                    onClick={this.goPrevStep}
                                >
                                    Previous
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-dark'
                                    onClick={this.goNextStep}
                                >
                                    Next
                                </button>
                            </div>
                        ) :
                        <div className="d-flex justify-content-center">
                            <button
                                type='button'
                                className='btn btn-dark'
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Reset
                            </button>
                        </div>}
                </form>
            </div>
        );
    }
}
