// src/__tests__/NumberOfEvents.test.js
import React from "react";
import NumberOfEvents from "../components/NumberOfEvents";
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";

// unit test 

describe('<NumberOfEvents/> component',() => {
    let NumEventsComponent;
    beforeEach( () => {
        NumEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}}/>);
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
});

// integratiion test 

describe('<NumberOfEvents/> integration', () => {
    let NumEventsComponent;
    beforeEach( () => {
        NumEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}}/>);
    });

    test('Number of events rendered matches number NOE input by user', async () =>{
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NOEDOM = AppDOM.querySelector('#number-of-events');
        const NOEInput = within(NOEDOM).queryByRole('spinbutton');
        
        await userEvent.type(NOEInput, '{backspace}{backspace}10');

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem'); 

        expect(allRenderedEventItems.length).toBe(10);
    });
});