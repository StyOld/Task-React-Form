import React from 'react';
import avatarDefault from "../../images/default-avatar.png";

export default class Avatar extends React.Component {
    render () {
        const {avatar, onChangeAvatar, errors}=this.props;
        return (
            <div>
                <img
                    className='mb-2'
                    width="100%"
                    src={avatar === '' ? (avatarDefault) : avatar}
                    alt=""
                />
                <div className="input-group mb-2">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="avatar"
                            name='avatar'
                            onChange={onChangeAvatar}
                        />
                        <label className="custom-file-label" htmlFor="avatar">Choose avatar</label>
                    </div>
                    {errors.avatar ? (
                        <div className='invalid-feedback'>{errors.avatar}</div>
                    ) : null}
                </div>
            </div>
            )
    }
}