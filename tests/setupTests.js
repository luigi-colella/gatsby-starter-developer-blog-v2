import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockReact from 'react';

// Enzyme adatapter
configure({ adapter: new Adapter() });

// Gatsby mocks
jest.mock('gatsby', () => ({
    graphql: jest.fn(),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(),
    Link: jest.fn().mockImplementation(
        ({
            // don't pass these props to an `a` tag because they are invalid
            activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace,
            to, ...rest
        }) =>
            mockReact.createElement("a", {
                href: to,
                ...rest
            })
        )
}));
