import React from "react";
import cities from '../data/cities';
import Basic from "./Steps/Basic";
import Contacts from "./Steps/Contacts";
import Avatar from "./Steps/Avatar";
import Finish from "./Steps/Finish";
import NavigationButtons from "./NavigationButtons";

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
                if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email) === false) {
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
            }
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
        const {firstname, lastname, password, repeatPassword, gender, email, mobile, country, city, errors, avatar, activeStep} = this.state;

        return (
            <div className="form-container card">
                <div>
                    <h6><strong><div className='row container d-flex justify-content-center'>
                        {this.state.steps.map((step, index) => (
                            <div key={step.name} >
                                <div className={step.isDone === true ? ('circle-noactive') : 'circle-active'}>
                                    {index + 1}
                                </div>
                                <div className='d-flex justify-content-center'>
                                    {step.name}
                                </div>
                            </div>
                        ))}
                    </div></strong></h6>
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
                            errors={errors}
                            onChangeAvatar={this.onChangeAvatar}
                        />
                    ) : null}

                    {this.state.activeStep === 4 ? (
                        <Finish
                            firstname={firstname}
                            lastname={lastname}
                            avatar={avatar}
                            email={email}
                            mobile={mobile}
                            country={country}
                            city={city}
                        />
                    ) : null}

                        <NavigationButtons
                            activeStep={activeStep}
                            goPrevStep={this.goPrevStep}
                            goNextStep={this.goNextStep}
                        />
                </form>
            </div>
        );
    }
}
