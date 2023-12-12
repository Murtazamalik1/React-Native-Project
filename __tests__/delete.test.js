import React from "react";
import renderer from 'react-test-renderer';
import DeleteUser from "../Components/CrudOperation/Delete";
import moxios from 'moxios';

const mockedResponse = {
    "id": 1,
    "firstName": "Terry",
    "lastName": "Medhurst",
    "maidenName": "Smitham",
    "age": 50,
    "gender": "male",
};
const createTestProps = props => ({
    navigation: {
        navigate: jest.fn(),
        state: jest.fn()
    },
    ...props,
});

describe('Add Page', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    props = createTestProps({});

    it('should fetch data successfully', (done) => {
        const Component = renderer.create(<DeleteUser{...props}
        />).getInstance();

        moxios.stubRequest('https://dummyjson.com/users/1', {
            status: 200,
            response: mockedResponse  // Mocked response data
        })
        Component.handleDeleteUser()
        setTimeout(() => {
            // Check if the fetched products are rendered in the component
            expect(Component.state.ApiResponse).toEqual(mockedResponse);
          //  expect(moxios.requests.mostRecent().url).toBe('https://dummyjson.com/users/1');
            expect(moxios.requests.mostRecent().config.method).toBe('delete');
            done();
        }, 1000)
    });
})
