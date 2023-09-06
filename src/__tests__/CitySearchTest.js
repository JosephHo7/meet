// src/__tests__/CitySearchTest

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch 
            allLocations={[]} 
            setCurrentCity={()=>[]}
            setInfoAlert={()=>[]}
            />);
    });

    test('renders text input', () => {
        const CityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(CityTextBox).toBeInTheDocument();
        expect(CityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city text box gains focus', async () => {
        const user = userEvent.setup();
        const CityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(CityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch 
            allLocations={allLocations} 
            setInfoAlert={()=>[]} />);

        // user types 'Berlin' in city textbox 
        const CityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(CityTextBox, "Berlin");

        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(CityTextBox.value.toUpperCase()) > -1;
        }): [];

        // get all <li> elements inside the suggestion list 
        const suggestionListItem = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItem).toHaveLength(suggestions.length + 1);
        for (let i=0; i < suggestions.length; i +=1) {
            expect(suggestionListItem[i].textContent).toBe (suggestions[i]);
        }
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents(); 
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch 
            allLocations={allLocations} 
            setCurrentCity={()=>{}} 
            setInfoAlert={()=>[]}/>);
    
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
    
        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    
        await user.click(BerlinGermanySuggestion);
    
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
      });
})

describe('<CitySearch/> integration', () => {
    test('renders suggestion list when app is rendered', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App/>);
        const AppDOM = AppComponent.container.firstChild;
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox= within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);
            const allEvents= await getEvents();
            const allLocations=extractLocations(allEvents);
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
})