import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

const feature = loadFeature('./src/features/specifyNOE.feature');

defineFeature(feature, test => {
    test('When user access the app, 32 events are displayed by default', ({ given, when, then }) => {
        given('user has not opened the app', () => {
        });

        let AppComponent;
        when('the user first opens the app', () => {
            AppComponent = render(<App/>);
        });
        
        
        then('there should be 32 events displayed', async () => {
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const EventList = within(AppDOM).queryAllByRole('listitem');
                expect(EventList.length).toBe(32);
            });
        });
    });

    test('When user changes the number of events displayed, the number of events matches', ({ given, when, then }) => {
        let AppComponent;
        let EventList;
        given('user has default 32 events displayed', async () => {
            AppComponent = render(<App/>);
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                EventList = within(AppDOM).queryAllByRole('listitem');
                expect(EventList.length).toBe(32);
            });
        });

        let NOEInput;
        when('the user changes number of events in the input', async () => {
            const NOEDOM = AppComponent.container.firstChild;
            NOEInput = NOEDOM.querySelector('.number-of-events');

            await userEvent.type(NOEInput, '{backspace}{backspace}10');
        }); 

        then('the nubmer of events should change to match the number in the input', () => {
            const AppDOM = AppComponent.container.firstChild;
            const newEventList = within(AppDOM).queryAllByRole('listitem');
            expect(newEventList.length).toEqual(parseInt(NOEInput.value));
        });
    });
})