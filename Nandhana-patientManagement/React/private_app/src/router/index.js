import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app';
import Register from '../components/Registration/registration';
import Login from '../components/Login/login';
import Consultation from '../components/Consultation/consultaion';
import Profile from '../components/Profile/profile';
import Vaccination from '../components/Vaccination/vaccination';
import ChangePassword from '../components/ChangePassword/changepassword';
import VaccinationList from '../components/Vaccination/vaccinationList';
import ConsultationList from '../components/Consultation/consultationList';
import DashboardCounter from '../components/Dashboard/DashboardCounter';
import PrivateRouting from '../components/PrivateRoute';
import PatientListing from '../components/patient/PatientListing';
import ContactListing from '../components/Contact/ContactListing';
import PaymentListing from '../components/Payment/PaymentListing';
import ConsultationCertificate from '../components/Certificate/consultationCertificate';
import VaccinationCertificate from '../components/Certificate/vaccinationCertificate';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/registration',
        element: <Register />,
      },
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/consultation/add',
        element: (
          <PrivateRouting>
            <Consultation />,
          </PrivateRouting>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRouting>
            <Profile />,
          </PrivateRouting>
        ),
      },
      {
        path: '/vaccination/add',
        element: (
          <PrivateRouting>
            <Vaccination />,
          </PrivateRouting>
        ),
      },
      {
        path: '/vaccination',
        element: (
          <PrivateRouting>
            <VaccinationList />,
          </PrivateRouting>
        ),
      },
      {
        path: '/changepassword',
        element: (
          <PrivateRouting>
            <ChangePassword />,
          </PrivateRouting>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRouting>
            <DashboardCounter />,
          </PrivateRouting>
        ),
      },
      {
        path: '/consultation',
        element: (
          <PrivateRouting>
            <ConsultationList />,
          </PrivateRouting>
        ),
      },
      {
        path: '/certificateConsultation',
        element: (
          <PrivateRouting>
            <ConsultationCertificate />,
          </PrivateRouting>
        ),
      },
      {
        path: '/certificateVaccination',
        element: (
          <PrivateRouting>
            <VaccinationCertificate />,
          </PrivateRouting>
        ),
      },
      {
        path: '/contact',
        element: (
          <PrivateRouting>
            <ContactListing />,
          </PrivateRouting>
        ),
      },
      {
        path: '/patient',
        element: (
          <PrivateRouting>
            <PatientListing />,
          </PrivateRouting>
        ),
      },
      {
        path: '/payment',
        element: (
          <PrivateRouting>
            <PaymentListing />,
          </PrivateRouting>
        ),
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
