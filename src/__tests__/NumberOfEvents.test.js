// src/__tests__/NumberOfEvents.test.js
import NumberOfEvents from "../components/NumberOfEvents";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents/> component',() => {
    let NumEventsComponent;
    beforeEach( () => {
        NumEventsComponent = render (<NumberOfEvents/>);
    });

    test('NumberOfEvents contains a textbox element', () => {
        expect(NumEventsComponent.queryByRole('spinbutton')).toBeInTheDocument();
    });

    test('Default value of input field is 32', () => {
        const inputField = NumEventsComponent.queryByRole('spinbutton', { className: 'number-of-events'});
        expect(inputField).toHaveValue(32);
    });

    test('textbox value changes accordingly when a user types in it', async () => {
        const user = userEvent.setup();
        const inputField = screen.getByRole('spinbutton');
        await user.type(inputField, '{backspace}{backspace}10');
        await waitFor(() => {
                   expect(inputField).toHaveValue(10);
        }); 
    });
})