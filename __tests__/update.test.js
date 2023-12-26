import React from "react";
import renderer from 'react-test-renderer';
import DeleteUser from "../Components/CrudOperation/Delete";
import moxios from 'moxios';
import UpdateUser from "../Components/CrudOperation/UpdateUser";

const mockedResponse = {
    "id": "1",
    "firstName": "Terry",
    "lastName": "Owais",
    "email": "atuny0@sohu.com",
    "phone": "+63 791 675 8914",
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
        const Component = renderer.create(<UpdateUser{...props}
        />).getInstance();
        Component.state.firstName = 'Terry'

        moxios.stubRequest('https://dummyjson.com/users/1', {
            status: 200,
            response: mockedResponse  // Mocked response data
        })
        Component. handleUpdateUser()
        setTimeout(() => {
            // Check if the fetched products are rendered in the component
            expect(Component.state. Apiresponse).toEqual(mockedResponse.firstName);
           // expect(moxios.requests.mostRecent().url).toBe('https://dummyjson.com/users/1');
          //  expect(moxios.requests.mostRecent().config.method).toBe('delete');
            done();
        }, 500)
    });
})
