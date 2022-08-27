import {render , screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TransactionCreateStepTwo from './TransactionCreateStepTwo'
test('Testen of de knop werkt', async()=> {
    render(<TransactionCreateStepTwo sender={{id:"5"}} receiver={{id:"8"}}/>)

    //de i staat voor equal
    expect(await screen.findByRole('button',  {name: /pay/i })).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText(/amount/i),"50")
    userEvent.type(screen.getByPlaceholderText(/add a note/i),"dinner")

    expect(await screen.findByRole('button',  {name: /pay/i })).toBeEnabled();
})

/*
    voordat je straks gaat beginnen met het testen van de website,
    is het handig om eerst de belangrijkste dingen te testen van de website.

    je kan bepalen of een class belangrijk is als je eerst gaat kijken wat de handelingen kunnen zijn van een user
    Wat je hier ziet is meer een extratje en had eigenlijk niet per ce nodig geweest

    met deze tests is het het handigs dat je eerst een verhaal maakt van wat de user kan doen
    en dat je dat later na programmeert

    door middel van de "screen.debug()" krijg je een overzicht van de html die gerenderd wordt
*/