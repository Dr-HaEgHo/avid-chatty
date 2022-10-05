import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { GlobalProvider } from './store/context';
const root = createRoot(document.getElementById('root'));

root.render(
    <GlobalProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </GlobalProvider>
)

