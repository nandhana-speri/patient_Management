import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app';
import Home from '../components/Home/home';
import Contact from '../components/contactUs/contact';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      // {
      //     path: '/route/list',
      //     element: (
      //       <PrivateRouting>
      //         <RouteListing />,
      //       </PrivateRouting>
      //     ),
      //   },
    ],
  },
]);

export default router;
