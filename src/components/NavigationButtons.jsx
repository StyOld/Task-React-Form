import React from 'react';

export default class NavigationButtons extends React.Component {
    render () {
        const {activeStep, goPrevStep, goNextStep}=this.props;
        return (
            <div>
                {activeStep < 4 ? (
                        <div className="d-flex justify-content-center">
                            <button
                                type='button'
                                className='btn btn-light mr-2'
                                onClick={goPrevStep}
                            >
                                Previous
                            </button>
                            <button
                                type='button'
                                className='btn btn-dark'
                                onClick={goNextStep}
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
                    </div>
                }
            </div>
        )
    }
}