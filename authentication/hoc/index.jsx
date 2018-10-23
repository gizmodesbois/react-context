import React from 'react';
import { AuthenticationConsumer } from '../provider';

const withAuthentication = (WrappedComponent) => {
    return props => (
        <AuthenticationConsumer>
            {context => <WrappedComponent {...props} {...context} />}
        </AuthenticationConsumer>
    );
};

export default withAuthentication;
