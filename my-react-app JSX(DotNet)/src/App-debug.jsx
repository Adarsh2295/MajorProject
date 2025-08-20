import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
// core styles are required for all packages
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import Store from './Store';

const theme = createTheme({
    focusRing: "never",
    fontFamily: "Poppins, sans-serif",
    primaryColor: 'bright-sun',
    primaryShade: 4,
    colors: {
        'bright-sun': ['#fffbeb', '#fff3c6', '#ffe588', '#ffd149', '#ffbd20', '#f99b07', '#dd7302', '#b75006', '#943c0c', '#7a330d', '#461902'],
        'mine-shaft': ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#2d2d2d']
    },
});

function App() {
    try {
        return (
            <Provider store={Store}>
                <MantineProvider theme={theme}>
                    <div style={{ padding: '20px' }}>
                        <h1>Debug App</h1>
                        <p>If you can see this, the basic app structure works!</p>
                    </div>
                </MantineProvider>
            </Provider>
        );
    } catch (error) {
        console.error('Error in App component:', error);
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h1>Error!</h1>
                <p>Error in App component: {error.message}</p>
            </div>
        );
    }
}

export default App;
