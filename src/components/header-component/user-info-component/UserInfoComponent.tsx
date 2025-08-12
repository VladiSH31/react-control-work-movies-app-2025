import './UserInfoComponent.css'

const UserInfoComponent = () => {
    return (
        <div className="user-info-container">
            <div className="user-avatar">
                <span>U</span>
            </div>
            <span className="user-name">User Name</span>
        </div>
    );
};

export default UserInfoComponent;