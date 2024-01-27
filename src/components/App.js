import SignUp from './SignUp';
import SignIn from './SignIn';
import { Routes, Route } from 'react-router';
import Dashboard from './Dashboard';
import Protected from './Protected';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Protected Component={Dashboard} />}></Route>
        <Route path="/*" element={<SignUp />}></Route>
      </Routes>
    </>
  );
};

export default App;
