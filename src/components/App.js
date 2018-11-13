import React from "react";
import countries from '../data/countries';
import cities from '../data/cities';
// import avatarDefault from "../images/default-avatar.png";
import Basic from "./Steps/Basic";
import Contacts from "./Steps/Contacts";
import Avatar from "./Steps/Avatar";

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
                {name: 'Basic', isDone: true},
                {name: 'Contacts', isDone: false},
                {name: 'Avatar', isDone: false},
                {name: 'Finish', isDone: false}
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
                arrSteps[this.state.activeStep-1].isDone = true;

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
            arrSteps[this.state.activeStep-2].isDone = false;

            this.setState({
                activeStep: this.state.activeStep - 1,
                steps: arrSteps,
            })
        }
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

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
            })
        };
        reader.readAsDataURL(event.target.files[0])
    };

    render() {
        const {firstname, lastname, password, repeatPassword, gender, email, mobile, country, city, errors, avatar} = this.state;

        return (
            <div className="form-container card">
                <div className='container d-flex justify-content-center'>
                    <div className='row mt-4'>
                        {this.state.steps.map((step, index) => (
                            <div key={step.name} className=
                                {step.isDone === true ? ('circle-noactive') : 'circle-active'}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <form className="form card-body">
                    {this.state.activeStep === 1 ? (
                            <Basic
                                firstname={firstname}
                                lastname={lastname}
                                password={password}
                                repeatPassword={repeatPassword}
                                gender={gender}
                                errors={errors}
                                onChange={this.onChange}
                            />
                    ) : null}

                    {this.state.activeStep === 2 ? (
                            <Contacts
                                email={email}
                                mobile={mobile}
                                country={country}
                                city={city}
                                errors={errors}
                                onChange={this.onChange}
                                getOptionsItem={this.getOptionsItem}
                                getCityList={this.getCityList}
                            />
                    ) : null}
                    {this.state.activeStep === 3 ? (
                        <Avatar
                            avatar={avatar}
                            onChangeAvatar={this.onChangeAvatar}
                            errors={errors}
                        />
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
