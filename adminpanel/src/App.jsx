import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/Layout/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store/store'

const App = () => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
        </Provider>
    );
};

export default App;
