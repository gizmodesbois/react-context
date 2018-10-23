import React from 'react';
import PropTypes from 'prop-types';

const AuthenticationContext = React.createContext({
    authenticated: false,
    token: null,
    userId: null,
    authenticate: () => {},
    logOut: () => {},
});

const AuthenticationConsumer = AuthenticationContext.Consumer;

class AuthenticationProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: !!localStorage.getItem('token'),
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
        };

        this.authenticate = this.authenticate.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    authenticate({ token, userId }) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        this.setState({
            authenticated: true,
            token,
            userId,
        });
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.setState({
            authenticated: false,
            token: null,
            userId: null,
        });
    }

    render() {
        const { authenticate, logOut } = this;
        const { authenticated, token, userId } = this.state;
        const { children } = this.props;

        const providerValues = {
            authenticate,
            logOut,
            authenticated,
            token,
            userId,
        };

        return (
            <AuthenticationContext.Provider value={providerValues}>
                {children}
            </AuthenticationContext.Provider>
        );
    }
}

AuthenticationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthenticationConsumer };

export default AuthenticationProvider;
