import { Routes, Route, Navigate } from 'react-router-dom';

const MySwitch = (props) => {
    const { routes, redirect } = props;

    return (
        <Routes>
            {routes && routes.map(item => (
                <Route
                    key={item.to}
                    exact
                    path={item.to}
                    element={<item.component />}
                >
                </Route>))}

            <Route path="/" element={<Navigate replace to={redirect} />} />

        </Routes>
    );
};

export default MySwitch;

