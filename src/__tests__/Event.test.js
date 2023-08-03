// src/__tests__/Event.test.js

import {render, screen } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';

describe('<Event /> component',() => {
    let EventComponent;
    const event = mockData[0];
    beforeEach(() => {
        EventComponent = render(<Event event={mockData[0]} />);
    });

    test('Event title is showing', () => {
        const eventTitle = screen.queryByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('Event start time is showing', () => {
        const eventStartTime = screen.queryByText(event.created);
        expect(eventStartTime).toBeInTheDocument();
    });

    test('The event location is showing', () => {
        expect(screen.queryByText(event.location)).toBeInTheDocument();
    });

    test('The show details button is showing', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });

    test('The event details should be hidden by default', () => {
        const eventDescription = EventComponent.queryByText(event.description);
        expect(eventDescription).not.toBeInTheDocument();
    });

    test('toggles between show details and hide details when the user clicks on the details button', 
    async () => {
        const user = userEvent.setup();
        const detailButton = EventComponent.queryByText('show details');
        // show details 
        await user.click(detailButton);
            const descriptionElement = screen.getByText(/Have you wondered how you can ask Google/);
            expect(descriptionElement).toBeInTheDocument();
        // hide details 
        await user.click(detailButton);
            expect (descriptionElement).not.toBeInTheDocument();

    });

})