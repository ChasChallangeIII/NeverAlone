import { ThemeProvider } from "../context/ThemeContext";
import { FakeCallProvider } from "../context/FakeCallContext";
import { fireEvent, render } from "@testing-library/react-native";
import CallMeButton from "../components/CallMeButton";
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn()
const renderWithProviders = () => {
    return render(

        <NavigationContainer>
            <ThemeProvider>
                <FakeCallProvider>
                    <CallMeButton />
                </FakeCallProvider>
            </ThemeProvider>
        </NavigationContainer>
    )
}

describe('Testing the give me a fake call button', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('should render the button on the first place', async () => {
        const { findByTestId } = renderWithProviders()
        expect(findByTestId('callMeButton')).toBeTruthy()
    })
    it('should render a toast message when pressing it', async () => {
        const { findByTestId } = renderWithProviders()
        fireEvent(findByTestId('callMeButton'), 'press')
        expect(findByTestId('feedback')).toBeTruthy()
    })
})