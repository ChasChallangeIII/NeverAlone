
import { ThemeProvider } from "../context/ThemeContext"
import { UserProvider } from "../context/UserContext"
import { AuthProvider } from "../context/AuthContext"
import LoginScreen from "../screens/LoginScreen"

import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { expect, it, jest } from '@jest/globals'

import { AccessibilityInfo } from 'react-native';

const mockNavigate = jest.fn()
jest.mock(
    "react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo",
    () => ({
        announceForAccessibility: jest.fn(),
    })
);

jest.useFakeTimers();
const renderWithProviders = () => {
    return render(
        <ThemeProvider>
            <UserProvider>
                <AuthProvider>
                    <LoginScreen navigation={{ navigate: mockNavigate }} />
                </AuthProvider>
            </UserProvider>
        </ThemeProvider>
    )
}

describe('Testing the login screen', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render ui components', async () => {
        const { findByTestId } = renderWithProviders()

        expect(await findByTestId("usernameInput")).toBeTruthy()
        expect(await findByTestId("passwordInput")).toBeTruthy()
        expect(await findByTestId("logInButton")).toBeTruthy()
    })

    it('should show error message when user tries to log in without giving all credentials', async () => {
        const { findByTestId } = renderWithProviders()
        fireEvent(await findByTestId('usernameInput'), 'changeText', 'Sara')

        fireEvent(await findByTestId('logInButton'), 'press')

        expect(await findByTestId('errorMessage')).toBeTruthy()
    })

    //Haven't figured out how to test this announceForAccessibility yet 😫 Leaving it for later
    // it('should announce errorMessage for screenreader when user tries to log in without giving all credentials ', async () => {

    //     const { findByTestId } = renderWithProviders()
    //     fireEvent(await findByTestId('usernameInput'), 'changeText', 'Sara')

    //     fireEvent(await findByTestId('logInButton'), 'press')
    //     jest.runAllTimers();
    //     expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith('Du har inte fyllt i både fälten')
    // })

    it('should stop rendering error message when user starts typing again', async () => {
        const { findByTestId, queryByTestId, debug } = renderWithProviders()
        fireEvent(await findByTestId('usernameInput'), 'changeText', 'Sara')

        fireEvent(await findByTestId('logInButton'), 'press')

        fireEvent(await findByTestId('usernameInput'), 'changeText', 'sa')

        expect(queryByTestId('errorMessage')).toBeNull()
    })

    //Don't have the knowledge to complete this test yet...
    it('should log in when given valid credentials', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    token: 'fake-token',
                    profile: { username: 'sara' }
                })
            }))
        const { findByTestId } = renderWithProviders()
        fireEvent(await findByTestId('usernameInput'), 'changeText', 'Sara')

        fireEvent(await findByTestId('passwordInput'), 'changeText', 'password123')

        fireEvent(await findByTestId('logInButton'), 'press')

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://neveralone.onrender.com/auth/signin?admin=false',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: 'Sara',
                        password: 'password123'
                    })
                })
            )
        })

    })

    // not this one either... 💔
    // it('should render error message when given unvalid credentials', async () => {
    //     global.fetch = jest.fn(() =>
    //         Promise.resolve({
    //             ok: false,
    //             status: 400
    //         }))
    //     const { findByTestId } = renderWithProviders()
    //     fireEvent(await findByTestId('usernameInput'), 'changeText', 'Sara')

    //     fireEvent(await findByTestId('passwordInput'), 'changeText', 'wrongPassword')

    //     fireEvent(await findByTestId('logInButton'), 'press')


    //     // await waitFor(() => {
    //     //     expect(global.fetch).toHaveBeenCalledWith('https://neveralone.onrender.com/auth/signin?admin=false',
    //     //         expect.objectContaining({
    //     //             method: 'POST',
    //     //             headers: {
    //     //                 'Content-Type': 'application/json'
    //     //             },
    //     //             body: JSON.stringify({
    //     //                 username: 'Sara',
    //     //                 password: 'wrongPassword'
    //     //             })
    //     //         })
    //     //     )
    //     // })
    //     // jest.runAllTimers();
        
    //     expect(await findByTestId('errorMessage')).toBeTruthy()
    // })



})

