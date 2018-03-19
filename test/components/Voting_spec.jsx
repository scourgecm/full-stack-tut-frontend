import React from "react";
import ReactDOM from "react-dom";

import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
}
    from "react-dom/test-utils";
import Voting from '../../src/components/Voting';
import { expect } from "chai";
import { List } from "immutable";

const pair = ["Trainspotting", "28 Days Later"];

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={pair} vote={vote} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Trainspotting');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} winner={'Trainspotting'} />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} hasVoted="Trainspotting" />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={pair} hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders a pure component', () => {
        const immutable_pair = List.of(...pair);

        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={immutable_pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        const new_pair = immutable_pair.set(0, 'Sunshine');
        component = ReactDOM.render(
            <Voting pair={new_pair} />,
            container
        );

        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Sunshine');
    });
});