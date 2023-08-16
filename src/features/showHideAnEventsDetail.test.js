import { loadFeature, defineFeature } from 'jest-cucumber';
import {render,waitFor, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetail.feature');

defineFeature(feature, test => {
    test('When user access the app, the details are collapsed by default', ({ given, when, then }) => {
        given('user hasn’t opened any event details', () => {
        });
        
        let AppComponent;
        when('the user opens the app', () => {
            AppComponent = render (<App/>);
        });

        then('the user should not be able to see the event details', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see the details', ({ given, when, then }) => {
        let AppComponent;
        given('user can see the list of events', () => {
            AppComponent = render(<App/>);
            const AppDOM = AppComponent.container.firstChild;
            const eventList = AppDOM.querySelector('#event-list');
            expect(eventList).toBeInTheDocument();
        });

        let detailEvents;
        when('the user clicks the show detail button', async () => {
            const eventList = AppComponent.container.querySelector('#event-list');
            const eventComponentItem = within(eventList).queryAllByRole('listitem');
            const detailsButton = screen.queryByText('show details');
            await userEvent.click(detailsButton);
            detailEvents = eventComponentItem[0];
        });

        then('the user should be able to expand an event to see the details', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).toBeDefined();
        });
    });

    test('User can hide the event details', ({ given, when, then }) => {
        let AppComponent;
        let button;
        given('user can see the expanded event with details', async () => {
            AppComponent = render (<App/>);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });

            button = AppComponent.queryAllByText('show details')[0];
            await userEvent.click(button);

            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });

        when('the user clicks hide detail button', async () => {
            await userEvent.click(button);
        });

        then('the user should be able to collapse and hide the event details', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });
});